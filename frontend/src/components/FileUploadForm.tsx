// src/components/FileUploadForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './FileUploadForm.module.css';

type FormData = {
  cif: string;
  repr: string;
  tel: string;
  poc: string;
  [key: string]: string; // Para permitir llaves dinámicas como ded_
};

const initialFormData: FormData = {
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
};

const FileUploadForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   cif: '',
  //   repr: '',
  //   tel: '',
  //   poc: '',
  //   ded_and: '',
  //   ded_ar: '',
  //   ded_ast: '',
  //   ded_balears: '',
  //   ded_canarias: '',
  //   ded_cant: '',
  //   ded_clm: '',
  //   ded_cyl: '',
  //   ded_cat: '',
  //   ded_ext: '',
  //   ded_gal: '',
  //   ded_mad: '',
  //   ded_mur: '',
  //   ded_rioja: '',
  //   ded_val: '',
  // });
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateCIF = (cif: string): boolean => {
    const cifRegex = /^[A-Z][0-9]{8}$/;
    return cifRegex.test(cif);
  };

  const validatePhoneNumber = (tel: string): boolean => {
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(tel);
  };

  const validateNameFormat = (name: string): boolean => {
    const nameRegex = /^[A-Z]+(\s[A-Z]+)*,(\s[A-Z]+)*$/;
    return nameRegex.test(name);
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};

    // Validar CIF
    if (!validateCIF(formData.cif)) {
      errors.cif = 'El CIF debe comenzar por una letra y tener 8 dígitos numéricos.';
    }

    // Validar teléfono
    if (!validatePhoneNumber(formData.tel)) {
      errors.tel = 'El teléfono debe tener 9 dígitos numéricos.';
    }

    // Validar formato de nombres (repr y poc)
    if (!validateNameFormat(formData.repr)) {
      errors.repr = 'El formato debe ser "APELLIDOS, NOMBRE".';
    }

    if (!validateNameFormat(formData.poc)) {
      errors.poc = 'El formato debe ser "APELLIDOS, NOMBRE".';
    }

    // Validar campos ded_
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('ded_')) {
        if (parseInt(formData[key]) < 0 || parseInt(formData[key]) > 100 || isNaN(parseInt(formData[key]))) {
          errors[key] = 'Este campo debe ser un número entre 0 y 100.';
        }
      }
    });

    return errors;
  };

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
    const validationErrors = validate();
    setErrors(validationErrors);

    if (!file) {
      Swal.fire('Error', 'Selecciona un archivo.', 'error');
      return;
    }

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    const data = new FormData();
    data.append('file', file);

    // Append other form data to FormData object
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    try {
      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/conversor`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const file_response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${response.data.downloadUrl}`);

      const blob = new Blob([file_response.data], { type: file_response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (response.data.warnings && response.data.warnings.length > 0) {
        Swal.fire({
          title: 'Advertencias!',
          html: response.data.warnings.join('<br />'),
          footer: 'El fichero se ha procesado correctamente, pero debes revisar las advertencias y corregirlas. Se indica el número de línea correspondiente al fichero output.txt.',
          icon: 'warning',
          confirmButtonText: 'Descargar fichero de advertencias',
          showCancelButton: true,
          cancelButtonText: 'Cerrar',
        }).then(result => {
          if (result.isConfirmed) {
            const blob = new Blob([response.data.warnings.join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'warnings.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        });
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message || error.message,
        footer: 'Asegúrate de que el archivo subido es un archivo Excel o CSV válido y contiene una hoja llamada "Worksheet" con los datos.',
        icon: 'error',
        timer: 10000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    } finally {
      setFormData({
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
      const fileInput = document.getElementById('file') as HTMLInputElement;
      fileInput.value = '';
      setFile(null);

      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {loading &&
        <div className={styles.loadingScreen}>
          <p>Loading...</p>
        </div>
      }

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>Información de Contacto del Declarante:</h3>
        <div className={styles.contactInfoGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="cif">CIF:</label>
            <input type="text" id="cif" name="cif" value={formData.cif} onChange={handleInputChange} />
            {errors.cif && <span className={styles.error}>{errors.cif}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tel">Teléfono:</label>
            <input type="number" id="tel" name="tel" value={formData.tel} onChange={handleInputChange} />
            {errors.tel && <span className={styles.error}>{errors.tel}</span>}
          </div>
        </div>

        <div className={styles.contactInfoGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="repr">Representante:</label>
            <input type="text" id="repr" name="repr" value={formData.repr} onChange={handleInputChange} />
            {errors.repr && <span className={styles.error}>{errors.repr}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="poc">Punto de contacto:</label>
            <input type="text" id="poc" name="poc" value={formData.poc} onChange={handleInputChange} />
            {errors.poc && <span className={styles.error}>{errors.poc}</span>}
          </div>
        </div>

        <h3>Deducciones por Comunidad Autónoma:</h3>
        <div className={styles.deductionGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="ded_and">Andalucía:</label>
            <input type="number" id="ded_and" name="ded_and" value={formData.ded_and} onChange={handleInputChange} />
            {errors.ded_and && <span className={styles.error}>{errors.ded_and}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_ar">Aragón:</label>
            <input type="number" id="ded_ar" name="ded_ar" value={formData.ded_ar} onChange={handleInputChange} />
            {errors.ded_ar && <span className={styles.error}>{errors.ded_ar}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_ast">Asturias:</label>
            <input type="number" id="ded_ast" name="ded_ast" value={formData.ded_ast} onChange={handleInputChange} />
            {errors.ded_ast && <span className={styles.error}>{errors.ded_ast}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_balears">Baleares:</label>
            <input type="number" id="ded_balears" name="ded_balears" value={formData.ded_balears} onChange={handleInputChange} />
            {errors.ded_balears && <span className={styles.error}>{errors.ded_balears}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_canarias">Canarias:</label>
            <input type="number" id="ded_canarias" name="ded_canarias" value={formData.ded_canarias} onChange={handleInputChange} />
            {errors.ded_canarias && <span className={styles.error}>{errors.ded_canarias}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_cant">Cantabria:</label>
            <input type="number" id="ded_cant" name="ded_cant" value={formData.ded_cant} onChange={handleInputChange} />
            {errors.ded_cant && <span className={styles.error}>{errors.ded_cant}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_clm">Castilla-La Mancha:</label>
            <input type="number" id="ded_clm" name="ded_clm" value={formData.ded_clm} onChange={handleInputChange} />
            {errors.ded_clm && <span className={styles.error}>{errors.ded_clm}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_cyl">Castilla y León:</label>
            <input type="number" id="ded_cyl" name="ded_cyl" value={formData.ded_cyl} onChange={handleInputChange} />
            {errors.ded_cyl && <span className={styles.error}>{errors.ded_cyl}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_cat">Cataluña:</label>
            <input type="number" id="ded_cat" name="ded_cat" value={formData.ded_cat} onChange={handleInputChange} />
            {errors.ded_cat && <span className={styles.error}>{errors.ded_cat}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_ext">Extremadura:</label>
            <input type="number" id="ded_ext" name="ded_ext" value={formData.ded_ext} onChange={handleInputChange} />
            {errors.ded_ext && <span className={styles.error}>{errors.ded_ext}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_gal">Galicia:</label>
            <input type="number" id="ded_gal" name="ded_gal" value={formData.ded_gal} onChange={handleInputChange} />
            {errors.ded_gal && <span className={styles.error}>{errors.ded_gal}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_mad">Madrid:</label>
            <input type="number" id="ded_mad" name="ded_mad" value={formData.ded_mad} onChange={handleInputChange} />
            {errors.ded_mad && <span className={styles.error}>{errors.ded_mad}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_mur">Murcia:</label>
            <input type="number" id="ded_mur" name="ded_mur" value={formData.ded_mur} onChange={handleInputChange} />
            {errors.ded_mur && <span className={styles.error}>{errors.ded_mur}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_rioja">La Rioja:</label>
            <input type="number" id="ded_rioja" name="ded_rioja" value={formData.ded_rioja} onChange={handleInputChange} />
            {errors.ded_rioja && <span className={styles.error}>{errors.ded_rioja}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ded_val">Comunidad Valenciana:</label>
            <input type="number" id="ded_val" name="ded_val" value={formData.ded_val} onChange={handleInputChange} />
            {errors.ded_val && <span className={styles.error}>{errors.ded_val}</span>}
          </div>
        </div>

        <h3>Fichero Excel o CSV a Procesar:</h3>

        <div className={styles.formGroup}>
          <label htmlFor="file">Fichero:</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
        </div>

        <div className={styles.formGroup}>
          <input type="submit" value="Procesar" />
        </div>
      </form>
    </div>
  );
};

export default FileUploadForm;
