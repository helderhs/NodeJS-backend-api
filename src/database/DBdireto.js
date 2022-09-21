const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inicioapagar',
});

connection.connect(function(err) {
  if (err) {
    console.error('Erro de conexao:' + err.stack);
    return '';
  }
  //console.log('Conectado com sucesso: thread ->');
});

module.exports = connection;
