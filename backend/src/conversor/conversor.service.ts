import { Body, HttpException, Injectable, UploadedFile } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const MODEL = 182;

@Injectable()
export class ConversorService {
  comm_data = require('./poblaciones.json');

  nif: number;

  communities = {
    and: '01',
    ar: '02',
    ast: '03',
    balears: '04',
    canarias: '05',
    cant: '06',
    clm: '07',
    cyl: '08',
    cat: '09',
    ext: '10',
    gal: '11',
    mad: '12',
    mur: '13',
    rioja: '16',
    val: '17',
  };

  dedductions = {};

  index() {
    return `
      <form method="post" action="http://localhost:3000/conversor" enctype="multipart/form-data">
        <label for="cif">CIF:</label>
        <input type="num" id="cif" name="cif"><br><br>
        <label for="repr">Representante:</label>
        <input type="text" id="repr" name="repr"><br><br>
        <label for="tel">Teléfono:</label>
        <input type="num" id="tel" name="tel"><br><br>
        <label for="poc">Punto de contacto:</label>
        <input type="text" id="poc" name="poc"><br><br>
        <label for="ded_and">Deducción Andalucía:</label>
        <input type="num" id="ded_and" name="ded_and"><br><br>
        <label for="ded_ar">Deducción Aragón:</label>
        <input type="num" id="ded_ar" name="ded_ar"><br><br>
        <label for="ded_ast">Deducción Asturias:</label>
        <input type="num" id="ded_ast" name="ded_ast"><br><br>
        <label for="ded_balears">Deducción Baleares:</label>
        <input type="num" id="ded_balears" name="ded_balears"><br><br>
        <label for="ded_canarias">Deducción Canarias:</label>
        <input type="num" id="ded_canarias" name="ded_canarias"><br><br>
        <label for="ded_cant">Deducción Cantabria:</label>
        <input type="num" id="ded_cant" name="ded_cant"><br><br>
        <label for="ded_clm">Deducción Castilla-La Mancha:</label>
        <input type="num" id="ded_clm" name="ded_clm"><br><br>
        <label for="ded_cyl">Deducción Castilla y León:</label>
        <input type="num" id="ded_cyl" name="ded_cyl"><br><br>
        <label for="ded_cat">Deducción Cataluña:</label>
        <input type="num" id="ded_cat" name="ded_cat"><br><br>
        <label for="ded_ext">Deducción Extremadura:</label>
        <input type="num" id="ded_ext" name="ded_ext"><br><br>
        <label for="ded_gal">Deducción Galicia:</label>
        <input type="num" id="ded_gal" name="ded_gal"><br><br>
        <label for="ded_mad">Deducción Madrid:</label>
        <input type="num" id="ded_mad" name="ded_mad"><br><br>
        <label for="ded_mur">Deducción Murcia:</label>
        <input type="num" id="ded_mur" name="ded_mur"><br><br>
        <label for="ded_rioja">Deducción La Rioja:</label>
        <input type="num" id="ded_rioja" name="ded_rioja"><br><br>
        <label for="ded_val">Deducción Comunidad Valenciana:</label>
        <input type="num" id="ded_val" name="ded_val"><br><br>
        <label for="file">File:</label>
        <input type="file" id="file" name="file"><br><br>
        <input type="submit" value="Submit">
      </form>
    `;
  }

  createFirstLine(body: any, content: string) {
    this.nif = body.cif;
    content = `1${MODEL}${new Date().getFullYear() - 1}${this.nif}${body.repr}`;
    content = content.padEnd(57);
    content += `T${body.tel}${body.poc}`;
    content = content.padEnd(107);
    content += `${MODEL}0000000000`;
    content += '  0000000000000'; // Campos 121-135
    content += '000000903'; //TODO: Calcular donaciones. Campos 136-144
    content += '000000040403107'; //TODO: Cacular donaciones totales. Campos 145-159
    content += '1'; // Campo 160
    content = content.padEnd(250);
    content += '\n';
    return content;
  }

  findCommunityLabel(townName: string) {
    if (!townName) {
      console.log('townName vacío');
      return null;
    }

    for (const community of this.comm_data) {
      for (const province of community.provinces) {
        for (const town of province.towns) {
          if (town.label.toUpperCase() === townName.toUpperCase().trim()) {
            return community.label;
          }
        }
      }
    }

    console.log(townName, ' no encontrado');
    return null;
  }

  /**
   * Función para convertir un valor a un formato concreto.
   * Por ejemplo, si se quiere convertir 12.3 a 0001230, se llamaría a computeDecimals('12.3', 5, 2)
   * @param value Valor a convertir
   * @param int Número de caracteres correspondientes a la parte entera
   * @param decimals Número de caracteres correspondientes a la parte decimal
   * @returns El valor con el formato adecuado
   */
  computeDecimals(value: string, int: number, decimals: number) {
    const parts = value.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? parts[1] : '';

    const filledIntegerPart = integerPart.padStart(int, '0');

    const filledDecimalPart = decimalPart.padEnd(decimals, '0');

    return filledIntegerPart + filledDecimalPart;
  }

  addDonation(row: any) {
    var content = `2182${new Date().getFullYear() - 1}${this.nif}${row['N.I.F. / C.I.F.']}`;
    content = content.padEnd(35);
    if (row['Donante'].trim().length > 40) {
      console.log('Donante demasiado largo:', row['Donante']);
    }
    content += row['Donante'].trim().slice(0, 40);
    content = content.padEnd(75);
    content += row['Cód. provincia'];
    content += 'A';
    var donation = row['DINERARIA'] ? row['DINERARIA'] : row['en ESPECIE'];
    if (
      row['N.I.F. / C.I.F.'].charAt(0) === 'A' ||
      row['N.I.F. / C.I.F.'].charAt(0) === 'B'
    ) {
      content += '04000';
    } else {
      donation <= 250 ? (content += '08000') : (content += '04000');
    }
    content = content.padEnd(13 - donation.length, '0');
    donation = this.computeDecimals(donation.toString(), 11, 2);
    content += donation;
    if (row['en ESPECIE']) content += 'X';
    else content += ' ';
    if (
      row['N.I.F. / C.I.F.'].charAt(0) !== 'A' &&
      row['N.I.F. / C.I.F.'].charAt(0) !== 'B' &&
      row['N.I.F. / C.I.F.'].charAt(0) !== 'E'
    ) {
      if (row['Población'].includes('(')) {
        row['Población'] = row['Población'].split('(')[0].trim();
      }
      if (row['Población'].toUpperCase().includes('VALLADOLID')) {
        row['Población'] = 'Valladolid';
      }
      const community = this.findCommunityLabel(row['Población']);
      content += this.communities[community] || '00';
      if (this.dedductions[community]) {
        content += this.computeDecimals(this.dedductions[community], 3, 2);
      } else {
        content += '00000';
      }
      content += 'F';
    } else {
      content += '0000000';
    }

    if (row['N.I.F. / C.I.F.'].charAt(0) === 'E') {
      content += 'E';
    } else if (
      row['N.I.F. / C.I.F.'].charAt(0) === 'A' ||
      row['N.I.F. / C.I.F.'].charAt(0) === 'B'
    ) {
      content += 'J';
    }

    content = content.padEnd(106);
    content = content.padEnd(110, '0');
    content = content.padEnd(131);
    content += '2';
    content = content.padEnd(250);

    return content;
  }

  readDedductions(body: any) {
    for (const key in body) {
      if (key.startsWith('ded_')) {
        const community = key.slice(4);
        this.dedductions[community] = body[key];
      }
    }
  }

  create(@UploadedFile() file: Express.Multer.File, @Body() body) {
    // Read the uploaded file
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames.find((name) => name === 'Worksheet');
    if (!sheetName) {
      throw new HttpException('No se encontró la hoja "Worksheet"', 400);
    }
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    const fileName = 'output.txt';

    var content = this.createFirstLine(body, content);

    this.readDedductions(body);

    data.forEach((row) => {
      if (!row['N.I.F. / C.I.F.']) {
        return;
      }
      content += this.addDonation(row);
      content += '\n';
    });
    // console.log(content);

    // Define the path where the file will be temporarily saved
    const filePath = path.join(__dirname, fileName);

    // Write the content to the .txt file
    fs.writeFileSync(filePath, content);

    // Set headers to trigger a file download in the browser
    // res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    // res.setHeader('Content-Type', 'text/plain');

    // // Send the file as a response
    // res.sendFile(filePath, (err) => {
    // if (err) {
    // console.error('Error sending file:', err);
    // res.status(500).send('Error downloading file');
    // } else {
    // // Delete the file after sending it
    // fs.unlinkSync(filePath);
    // }
    // });

    return {
      message: 'File uploaded successfully!',
      content, // Returning the parsed data for demonstration
    };
  }
}
