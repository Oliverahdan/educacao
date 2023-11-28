import React, { useState, useEffect } from 'react';
import Escolas from './Escolas';

const Pesquisa = ({ data, onSelect }) => {
  const [municipiosUnicos, setMunicipiosUnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (data.length > 0) {
      const idsMunicipios = data.map(item => item.id_municipio);
      buscarNomesMunicipios(idsMunicipios);
    }
  }, [data]);

  const buscarNomesMunicipios = (idsMunicipios) => {
    Promise.all(
      idsMunicipios.map(idMunicipio =>
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idMunicipio}`)
          .then(response => response.json())
      )
    )
      .then(municipiosData => {
        const nomesUnicos = [...new Set(municipiosData.map(municipioData => municipioData.nome))];
        setMunicipiosUnicos(nomesUnicos);
        setLoading(false);
      })
      .catch(error => console.error('Erro ao buscar nomes dos municípios:', error));
  };

  const handleSelect = (selectedMunicipio) => {
    setSelectedMunicipio(selectedMunicipio);
    onSelect(selectedMunicipio);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (selectedMunicipio) {
    return <Escolas municipio={selectedMunicipio} />;
  }

  return (
    <div>
      <h1>Aplicação React</h1>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Selecione um Município</option>
        {municipiosUnicos.map((municipio, index) => (
          <option key={index} value={municipio}>
            {municipio}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pesquisa;
