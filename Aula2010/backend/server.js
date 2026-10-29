const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Banco de Dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'manu123',
    database: 'crud_funcionarios'
};

const db = mysql.createPool(dbConfig);

// Teste inicial de conexão com o banco para garantir que as credenciais estão certas
db.getConnection()
    .then(() => console.log('✅ Conexão com o banco de dados MySQL realizada com sucesso!'))
    .catch((err) => {
        console.log('\n❌ === ERRO AO CONECTAR NO BANCO DE DADOS ===');
        console.error(err.message);
        console.log('=============================================\n');
    });

// ==========================================
// ROTAS DE FUNCIONÁRIOS (CRUD)
// ==========================================

// GET /api/funcionarios
app.get('/api/funcionarios', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM funcionarios ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error("❌ Erro ao listar funcionários:", error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/funcionarios
app.post('/api/funcionarios', async (req, res) => {
    try {
        const { nome, funcao, salario, email, status, data_admissao } = req.body;
        
        if (!nome || !funcao || !salario) {
            return res.status(400).json({ error: 'Nome, função e salário são obrigatórios' });
        }

        const [result] = await db.execute(
            'INSERT INTO funcionarios (nome, funcao, salario, email, status, data_admissao) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, funcao, parseFloat(salario), email || null, status || 'Ativo', data_admissao || null]
        );
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error("❌ Erro no cadastro:", error);
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/funcionarios/:id
app.put('/api/funcionarios/:id', async (req, res) => {
    try {
        const { nome, funcao, salario, email, status, data_admissao } = req.body;
        const id = req.params.id;

        await db.execute(
            'UPDATE funcionarios SET nome = ?, funcao = ?, salario = ?, email = ?, status = ?, data_admissao = ? WHERE id = ?',
            [nome, funcao, parseFloat(salario), email || null, status || 'Ativo', data_admissao || null, id]
        );
        res.json({ success: true });
    } catch (error) {
        console.error("❌ Erro na edição:", error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/funcionarios/:id
app.delete('/api/funcionarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.execute('DELETE FROM funcionarios WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error("❌ Erro ao deletar:", error);
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// ROTA DE AUTENTICAÇÃO (LOGIN)
// ==========================================

// POST /api/login
app.post('/api/login', async (req, res) => {
    try {
        const { login, senha } = req.body; 

        if (!login || !senha) {
            return res.status(400).json({ error: 'Login e senha são obrigatórios' });
        }

        console.log(`\n[LOGIN] Tentando autenticar o usuário: "${login}"`);

        // Executa a busca na coluna 'email' usando o valor de 'login'
        const [rows] = await db.execute('SELECT * FROM funcionarios WHERE email = ?', [login]);

        if (!rows || rows.length === 0) {
            console.log(`[LOGIN] Usuário "${login}" não foi encontrado no banco.`);
            return res.status(401).json({ error: 'Login ou senha incorretos' });
        }

        const funcionario = rows[0]; 

        // Validação da senha
        if (funcionario.senha !== senha) {
            console.log(`[LOGIN] Senha incorreta para o usuário: "${login}"`);
            return res.status(401).json({ error: 'Login ou senha incorretos' });
        }

        console.log(`[LOGIN] Sucesso! "${login}" logou.`);
        return res.json({ 
            success: true, 
            message: 'Login realizado com sucesso!' 
        });

    } catch (error) {
        // Bloco reforçado para capturar qualquer erro de banco/sintaxe
        console.log("\n❌ === ERRO CRÍTICO ENCONTRADO NO LOGIN ===");
        console.error(error); 
        console.log("=============================================\n");
        
        return res.status(500).json({ error: error.message });
    }
});

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
