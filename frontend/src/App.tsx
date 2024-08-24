import React from 'react';
import './App.css';
import FileUploadForm from './components/FileUploadForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <FileUploadForm />
      <Footer />
    </div>
  );
};

export default App;