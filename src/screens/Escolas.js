import React, { useEffect, useState } from 'react';

const Escolas = ({ idEscola, data }) => {
  const [escolaData, setEscolaData] = useState(null);
  const [selectedIdEscola, setSelectedIdEscola] = useState(null);

  // Atualizar o estado quando o idEscola ou os dados mudarem
  useEffect(() => {
    console.log('idEscola:', idEscola);
    console.log('data:', data);
  
    if (idEscola) {
      // Filtrar os dados com base no id_escola
      const escolaDataFiltrada = data.find(item => item.id_escola === idEscola);
      console.log('escolaDataFiltrada:', escolaDataFiltrada);
  
      // Atualizar o estado com os dados filtrados
      setEscolaData(() => escolaDataFiltrada);
    }
  }, [idEscola, data]);

  // Atualizar o estado quando o id_escola selecionado no menu suspenso mudar
  const handleIdEscolaChange = (event) => {
    const selectedId = event.target.value;
    setSelectedIdEscola(selectedId);
    setEscolaData(null); // Limpar os dados exibidos
  };

  // Verificar se há dados da escola para exibir
  if (!escolaData) {
    return (
      <div>
        <h2>Escolha uma escola</h2>
        <select value={selectedIdEscola} onChange={handleIdEscolaChange}>
          <option value="" disabled>
            Selecione uma escola
          </option>
          {data.map(item => (
            <option key={item.id_escola} value={item.id_escola}>
              {item.id_escola}
            </option>
          ))}
        </select>
        <div>Selecione uma escola para exibir os detalhes.</div>
      </div>
    );
  }

  // Renderizar os detalhes da escola
  return (
    <div>
      <h2>Dados da Escola</h2>
      <ul>
        <li>Ano: {escolaData.ano}</li>
        <li>Sigla UF: {escolaData.sigla_uf}</li>
        <li>ID Município: {escolaData.id_municipio}</li>
        <li>ID Escola: {escolaData.id_escola}</li>
        <li>Rede: {escolaData.rede}</li>
        <li>Ensino: {escolaData.ensino}</li>
        <li>Anos Escolares: {escolaData.anos_escolares}</li>
        <li>Taxa de Aprovação: {escolaData.taxa_aprovacao}</li>
        <li>Indicador de Rendimento: {escolaData.indicador_rendimento}</li>
        <li>Nota Saeb Matemática: {escolaData.nota_saeb_matematica}</li>
        <li>Nota Saeb Língua Portuguesa: {escolaData.nota_saeb_lingua_portuguesa}</li>
        <li>Nota Saeb Média Padronizada: {escolaData.nota_saeb_media_padronizada}</li>
        <li>IDEB: {escolaData.ideb}</li>
        <li>Projeção: {escolaData.projecao}</li>
      </ul>
    </div>
  );
};

export default Escolas;
