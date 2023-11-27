import React, { useState, useEffect } from 'react';

const Pesquisa = ({ data, onSelect }) => {
  const [municipio, setMunicipio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (data.length > 0) {
      const idMunicipio = data[0].id_municipio;
      buscarNomeMunicipio(idMunicipio);
    }
  }, [data]);

  const buscarNomeMunicipio = (idMunicipio) => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idMunicipio}`)
      .then(response => response.json())
      .then(municipioData => {
        setMunicipio(municipioData.nome);
        setLoading(false);
      })
      .catch(error => console.error('Erro ao buscar nome do município:', error));
  };

  const handleSelect = (selectedId) => {
    buscarNomeMunicipio(selectedId);
    onSelect(selectedId);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Aplicação React</h1>
      <p>Município Selecionado: {municipio}</p>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Selecione um Município</option>
        {data.map((item, index) => (
          <option key={index} value={item.id_municipio}>
            {municipio}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pesquisa;
