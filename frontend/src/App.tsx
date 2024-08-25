import React from 'react';
import './App.css';
import FileUploadForm from './components/FileUploadForm';
import Footer from './components/Footer';
import './components/Footer.module.css';
import './components/FileUploadForm.module.css';

const App: React.FC = () => {
  return (
    <div>
      <FileUploadForm />
      <Footer />
    </div>
  );
};

export default App;