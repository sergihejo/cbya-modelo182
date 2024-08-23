import React from 'react';
import './App.css';
import FileUploadForm from './components/FileUploadForm';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


const App: React.FC = () => {
  return (
    <div>
      <h1>Upload File</h1>
      <FileUploadForm />
    </div>
  );
};

export default App;