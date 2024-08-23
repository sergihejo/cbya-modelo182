// src/components/FileUploadForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './FileUploadForm.module.css';

const FileUploadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    cif: '',
    repr: '',
    tel: '',
    poc: '',
    ded_and: '',
    ded_ar: '',
    ded_ast: '',
    ded_balears: '',
    ded_canarias: '',
    ded_cant: '',
    ded_clm: '',
    ded_cyl: '',
    ded_cat: '',
    ded_ext: '',
    ded_gal: '',
    ded_mad: '',
    ded_mur: '',
    ded_rioja: '',
    ded_val: '',
  });

  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      Swal.fire('Error', 'Selecciona un archivo.', 'error');
      return;
    }

    const data = new FormData();
    data.append('file', file);

    // Append other form data to FormData object
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    try {
      const response = await axios.post('http://localhost:3001/conversor', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

	  const file_response = await axios.get(`http://localhost:3001${response.data.downloadUrl}`);

      const blob = new Blob([file_response.data], { type: file_response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show warnings if there are any
      if (response.data.warnings && response.data.warnings.length > 0) {
        Swal.fire({
          title: 'Advertencias!',
          html: response.data.warnings.join('<br />'),
		  footer: 'El fichero se ha procesado correctamente, pero debes revisar las advertencias y corregirlas. Se indica el número de línea dentro del txt generado.',
          icon: 'warning',
          confirmButtonText: 'Cerrar',
        });
      }
    } catch (error : any) {
	Swal.fire({
		title: 'Error!',
		text: error.response.data.message || error.message,
		footer: 'Asegúrate de que el archivo subido es un archivo Excel o CSV válido y contiene una hoja llamada "Worksheet" con los datos.',
		icon: 'error',
		timer: 10000,
		timerProgressBar: true,
		showConfirmButton: false
	})
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label htmlFor="cif">CIF:</label>
          <input type="number" id="cif" name="cif" value={formData.cif} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="repr">Representante:</label>
          <input type="text" id="repr" name="repr" value={formData.repr} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tel">Teléfono:</label>
          <input type="number" id="tel" name="tel" value={formData.tel} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="poc">Punto de contacto:</label>
          <input type="text" id="poc" name="poc" value={formData.poc} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_and">Deducción Andalucía:</label>
          <input type="number" id="ded_and" name="ded_and" value={formData.ded_and} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_ar">Deducción Aragón:</label>
          <input type="number" id="ded_ar" name="ded_ar" value={formData.ded_ar} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_ast">Deducción Asturias:</label>
          <input type="number" id="ded_ast" name="ded_ast" value={formData.ded_ast} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_balears">Deducción Baleares:</label>
          <input type="number" id="ded_balears" name="ded_balears" value={formData.ded_balears} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_canarias">Deducción Canarias:</label>
          <input type="number" id="ded_canarias" name="ded_canarias" value={formData.ded_canarias} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_cant">Deducción Cantabria:</label>
          <input type="number" id="ded_cant" name="ded_cant" value={formData.ded_cant} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_clm">Deducción Castilla-La Mancha:</label>
          <input type="number" id="ded_clm" name="ded_clm" value={formData.ded_clm} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_cyl">Deducción Castilla y León:</label>
          <input type="number" id="ded_cyl" name="ded_cyl" value={formData.ded_cyl} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_cat">Deducción Cataluña:</label>
          <input type="number" id="ded_cat" name="ded_cat" value={formData.ded_cat} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_ext">Deducción Extremadura:</label>
          <input type="number" id="ded_ext" name="ded_ext" value={formData.ded_ext} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_gal">Deducción Galicia:</label>
          <input type="number" id="ded_gal" name="ded_gal" value={formData.ded_gal} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_mad">Deducción Madrid:</label>
          <input type="number" id="ded_mad" name="ded_mad" value={formData.ded_mad} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_mur">Deducción Murcia:</label>
          <input type="number" id="ded_mur" name="ded_mur" value={formData.ded_mur} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_rioja">Deducción La Rioja:</label>
          <input type="number" id="ded_rioja" name="ded_rioja" value={formData.ded_rioja} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ded_val">Deducción Comunidad Valenciana:</label>
          <input type="number" id="ded_val" name="ded_val" value={formData.ded_val} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="file">File:</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
        </div>

        <div className={styles.formGroup}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default FileUploadForm;
