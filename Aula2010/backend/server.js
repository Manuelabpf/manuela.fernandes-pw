const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'Manu',
  password: 'manu12345',
  database: 'crud-funcionarios'
});

// LISTAR
app.get('/api/funcionarios', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM funcionarios ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRIAR
app.post('/api/funcionarios', async (req, res) => {
  try {
    const { nome, funcao, salario, email, status, data_admissao } = req.body;
    console.log('POST recebido:', req.body);
    if (!nome || !funcao || !salario || !email || !status || !data_admissao) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }
    const [result] = await db.execute(
      'INSERT INTO funcionarios (nome, funcao, salario, email, status, data_admissao) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, funcao, parseFloat(salario), email, status, data_admissao]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ATUALIZAR
app.put('/api/funcionarios/:id', async (req, res) => {
  try {
    const { nome, funcao, salario, email, status, data_admissao } = req.body;
    await db.execute(
      'UPDATE funcionarios SET nome = ?, funcao = ?, salario = ?, email = ?, status = ?, data_admissao = ? WHERE id = ?',
      [nome, funcao, parseFloat(salario), email, status, data_admissao, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EXCLUIR
app.delete('/api/funcionarios/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM funcionarios WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    // 1) pegar login e senha do corpo da requisição
    const { login, senha } = req.body;

    // 2) consultar o banco
    const [rows] = await db.execute(
    'SELECT senha,login FROM usuarios WHERE login = ? AND senha = ?',
    [login,senha]
    );
    // 3) decidir
    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'Login ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
