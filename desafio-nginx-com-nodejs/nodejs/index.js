const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS pessoa ( nome VARCHAR(50) NOT NULL )`;

connection.query(createTable, (err, rows) => {
    if (err) {
        console.error('Erro ao criar a tabela no banco:', err);
        return;
    }

    const sql = `INSERT INTO pessoa(nome) values ('Alex Yoshitake')`;
    connection.query(sql, (err) => {
        if (err) {
            console.error('Erro ao inserir no banco:', err);
            return;
        }
        console.log('Inserção feita com sucesso');
    });
});

app.get('/', (req, res) => {
        const query = "SELECT * FROM pessoa";
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Erro ao buscar dados:', err);
                res.status(500).send('Erro ao buscar dados no banco de dados.');
                return;
            }

            const nomes = rows.map(row => row.nome);
            res.send('<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrada no banco de dados:</p>' + nomes.join('<br>'));
        });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});