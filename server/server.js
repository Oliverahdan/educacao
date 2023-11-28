const express = require('express');
const mysql = require('mysql2');

const app = express();
// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'acesso123',
  database: 'educacao',
});

connection.connect();

// Rota para buscar o nome da escola pelo ID
app.get('/api/escola/:idEscola', (req, res) => {
  const idEscola = req.params.idEscola; // Correção aqui

  connection.query(
    'SELECT nome FROM schools WHERE id = ?',
    [idEscola],
    (error, results, fields) => {
      if (error) {
        console.error('Erro ao buscar nome da escola:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (results.length > 0) {
          const nomeEscola = results[0].nome;
          res.json(nomeEscola); // Correção aqui
        } else {
          res.status(404).json({ error: 'Escola não encontrada' });
        }
      }
    }
  );
});

// Rota para buscar os nomes de todas as escolas
app.get('/api/escolas/nomes', (req, res) => {
  connection.query('SELECT id, nome FROM schools', (error, results, fields) => {
    if (error) {
      console.error('Erro ao buscar nomes das escolas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      const nomesEscolas = results.map(({ id, nome }) => ({ id, nome }));
      res.json(nomesEscolas);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});

// Encerrando a conexão MySQL no final
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
