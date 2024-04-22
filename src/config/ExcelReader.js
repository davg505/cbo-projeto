import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

function ExcelReader({ onFileProcessed }) {
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setJsonData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const processFile = () => {
    console.log('JSON carregado:', jsonData);
    onFileProcessed(jsonData);
    console.log('Chamando onFileProcessed');
    navigate('/pesquisa-tabela');
    console.log('Navegando para /pesquisa-tabela');
  };

  return (
    <div>
      <h2>Adicionar arquivo</h2>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          <button onClick={processFile}>Processar Arquivo</button>
          <table>
            <thead>
              <tr>
                {jsonData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExcelReader;
