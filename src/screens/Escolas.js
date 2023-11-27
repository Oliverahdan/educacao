import React, { useState, useEffect } from 'react';

const Escolas = ({ municipio }) => {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Adicione a lógica para buscar as escolas com base no município
    fetch(`https://inepdata.inep.gov.br/analytics/saw.dll?Dashboard&nqUser=publico&nqPassword=publico&path=${municipio}`)
      .then(response => response.json())
      .then(escolasData => {
        setEscolas(escolasData);
        setLoading(false);
      })
      .catch(error => console.error('Erro ao buscar escolas:', error));
  }, [municipio]);

  if (loading) {
    return <p>Carregando escolas...</p>;
  }

  return (
    <div>
      <h1>Escolas em {municipio}</h1>
      {/* Exiba as escolas conforme necessário */}
      <ul>
        {escolas.map((escola, index) => (
          <li key={index}>{escola.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Escolas;
