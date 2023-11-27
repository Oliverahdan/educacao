import React, { useState, useEffect } from 'react';
import Pesquisa from './screens/Pesquisa';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Carregar dados do arquivo JSON
    fetch('/dataset.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Erro ao carregar dados:', error));
  }, []);

  const handleSelect = (selectedId) => {
    // Implemente a lógica para lidar com a seleção do ID
    console.log('ID selecionado:', selectedId);
  };

  return (
    <div>
      {/* ... */}
      <Pesquisa data={data} onSelect={handleSelect} />
    </div>
  );
};

export default App;
