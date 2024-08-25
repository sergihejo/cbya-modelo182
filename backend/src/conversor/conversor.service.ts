import { Body, HttpException, Injectable, UploadedFile } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Decimal } from 'decimal.js';
import { join } from 'path';
import * as fs from 'fs';

const MODEL = 182;

@Injectable()
export class ConversorService {
  comm_data = require('./poblaciones.json');

  cif: string;

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

  totalDonations: number = 0;
  numberOfDonations: number = 0;

  warnings: string[] = [];

  createFirstLine(content: string, repr: string, tel: string, poc: string) {
    content = `1${MODEL}${new Date().getFullYear() - 1}${this.cif}${repr}`;
    content = content.padEnd(57);
    content += `T${tel}${poc}`;
    content = content.padEnd(107);
    content += `${MODEL}0000000000`;
    content += '  0000000000000'; // Campos 121-135
    content += this.numberOfDonations.toString().padStart(9, '0'); // Campo 136
    content += this.computeDecimals(this.totalDonations.toString(), 13, 2);
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

    // console.log(townName, ' no encontrado');
    this.warnings.push(
      '- ' + townName + ' no encontrado. Línea ' + (this.numberOfDonations + 1).toString(),
    );
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
    this.numberOfDonations++;
    var content = `2182${new Date().getFullYear() - 1}${this.cif}${row['N.I.F. / C.I.F.']}`;
    content = content.padEnd(35);
    if (row['Donante'].trim().length > 40) {
      // console.log('Donante demasiado largo:', row['Donante']);
      this.warnings.push(
        '- Donante demasiado largo: ' +
          row['Donante'].trim() +
          ' Línea ' +
          (this.numberOfDonations + 1).toString(),
      );
    }
    content += row['Donante'].trim().slice(0, 40);
    content = content.padEnd(75);
    content += row['Cód. provincia'];
    content += 'A';

    var donation = row['en ESPECIE'] ? row['en ESPECIE'] : row['DINERARIA'];
    let totalDonations = new Decimal(this.totalDonations);
    let donationAmount = new Decimal(donation);
    totalDonations = totalDonations.plus(donationAmount);
    this.totalDonations = totalDonations.toNumber();

    if (row['N.I.F. / C.I.F.'].charAt(0) === 'A' || row['N.I.F. / C.I.F.'].charAt(0) === 'B') {
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

    var content = '';

    this.readDedductions(body);

    this.cif = body.cif;

    data.forEach((row) => {
      if (!row['N.I.F. / C.I.F.']) {
        return;
      }
      content += this.addDonation(row);
      content += '\n';

      if (row['DINERARIA'] && row['en ESPECIE']) {
        row['en ESPECIE'] = null;
        content += this.addDonation(row);
        content += '\n';
      }
    });

    content = this.createFirstLine(content, body.repr, body.tel, body.poc) + content;

    this.totalDonations = 0;
    this.numberOfDonations = 0;

    try {
      // Simulate file processing and save the result
      const fileName = `${this.cif}.${MODEL}.txt`;
      const filePath = join(__dirname, fileName); // Store in a 'downloads' folder
      fs.writeFileSync(filePath, content);

      const warnings = this.warnings;
      return { filePath, fileName, warnings };
    } catch (error) {
      throw new Error(`Error processing file: ${error.message}`);
    }

    // Write the file to disk
    // writeFileSync(filePath, content);
    // console.log('File written to disk:', filePath);

    // Return the file path or a URL that the client can use to download the file
    // return { filePath, fileName, warnings };

    return {
      message: 'File uploaded successfully!',
      content, // Returning the parsed data for demonstration
    };
  }
}
