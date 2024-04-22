import React, { useState } from 'react';
import ExcelReader from './config/ExcelReader';
import { Link, useNavigate } from 'react-router-dom';
import './CarregarArquivo.css';

function CarregarArquivo() {
  const [excelData, setExcelData] = useState(null);

  const handleExcelData = (jsonData) => {
    setExcelData(jsonData);
    localStorage.setItem('excelData', JSON.stringify(jsonData)); 
  };

  return (
    <div className="container"> {/* Adicione a classe container aqui */}
      <h1>Carregar Arquivo</h1>
      <ExcelReader onFileProcessed={handleExcelData} />
      {excelData && <Link to={{ pathname: '/pesquisa-tabela', state: { excelData } }}>Ir para Pesquisa Tabela</Link>}
    </div>
  );
}

export default CarregarArquivo;
