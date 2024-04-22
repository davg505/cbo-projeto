import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExcelReader from './config/ExcelReader';
import PesquisaTabela from './PesquisaTabela';

function App() {
  const [jsonData, setJsonData] = useState(null);

  const handleFileProcessed = (data) => {
    setJsonData(data);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ExcelReader onFileProcessed={handleFileProcessed} />}
        />
        {jsonData && (
          <Route
            path="/pesquisa-tabela"
            element={<PesquisaTabela jsonData={jsonData} />}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
