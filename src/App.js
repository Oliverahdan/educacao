import React, { useState, useEffect } from 'react';
import Pesquisa from './screens/Pesquisa';
import Escolas from './screens/Escolas';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    // Carregar dados do arquivo JSON
    fetch('/dataset.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Erro ao carregar dados:', error));

    // Configurar um ouvinte de eventos para mudanças na URL
    const handleRouteChange = () => setCurrentRoute(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);

    // Remover o ouvinte de eventos ao desmontar o componente
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleSelect = (selectedMunicipio) => {
    setSelectedMunicipio(selectedMunicipio);

    // Mudar a rota para /escola
    changeRoute('/escola');
  };

  const changeRoute = (route) => {
    window.history.pushState(null, null, route);
    setCurrentRoute(route);
  };

  // Componentes correspondentes às rotas
  const routes = {
    '/escola': <Escolas municipio={selectedMunicipio} />,
    '/pesquisa': <Pesquisa data={data} onSelect={handleSelect} />,
  };

  // Renderizar o componente correspondente com base na rota
  const renderComponent = () => {
    return routes[currentRoute] || <Pesquisa data={data} onSelect={handleSelect} />;
  };

  return <div>{renderComponent()}</div>;
};

export default App;
