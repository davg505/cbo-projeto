import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Alteração na importação aqui
import './PesquisaTabela.css';

function PesquisaTabela({ jsonData }) {
  const [funcao, setFuncao] = useState('');
  const [codigoCbo, setCodigoCbo] = useState('');
  const [resultados, setResultados] = useState([]);

  const salvarExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(resultados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
    XLSX.writeFile(wb, 'resultados.xlsx');
  };

  useEffect(() => {
    if (jsonData) {
      const resultadosFiltrados = jsonData.filter(item => {
        const funcaoLowerCase = funcao ? funcao.toLowerCase() : '';
        const codigoCboLowerCase = codigoCbo ? codigoCbo.toLowerCase() : '';

        const funcaoMatch = typeof item[0] === 'string' && item[0]?.toLowerCase().includes(funcaoLowerCase);
        const codigoCboMatch = typeof item[1] === 'string' && item[1]?.toLowerCase().includes(codigoCboLowerCase);

        if (funcao && codigoCbo) {
          return funcaoMatch && codigoCboMatch;
        } else if (funcao) {
          return funcaoMatch;
        } else if (codigoCbo) {
          return codigoCboMatch;
        } else {
          return true;
        }
      });

      setResultados(resultadosFiltrados);
    }
  }, [jsonData, funcao, codigoCbo]);

  return (
    <div>
      <h1>Pesquisa Tabela</h1>
      <div>
        <label htmlFor="funcao">Código CBO:</label>
        <input
          type="text"
          id="funcao"
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
          placeholder="Digite o código CBO..."
        />
      </div>
      <div>
        <label htmlFor="codigoCbo">Função:</label>
        <input
          type="text"
          id="codigoCbo"
          value={codigoCbo}
          onChange={(e) => setCodigoCbo(e.target.value)}
          placeholder="Digite a função..."
        />
      </div>
      <button onClick={salvarExcel}>Salvar em Excel</button>
      <h2>Resultados da Pesquisa</h2>
      <ul>
        {resultados.map((resultado, index) => (
          <li key={index}>{resultado[0]} - {resultado[1]}</li>
        ))}
      </ul>
    </div>
  );
}

export default PesquisaTabela;
