const connection = require('../../database/DBdireto');

module.exports = {
  async sqlDireto(req, res) {
    connection.query('SELECT * FROM tarefas', function(err, rows, fields) {
      if (!err) {
        //console.log('Resultado: ', JSON.parse(JSON.stringify(rows)));
      } else {
        console.log('Erro ao relaizar a consulta' + err.message);
      }
      //var resultado = JSON.parse(JSON.stringify(rows));
      return res.json(rows);
    });
  },

  async sqlDiretoUpdate(req, res) {
    //************************************* */
    // 2 maneiras de fazer
    //************************************* */
    connection.query('UPDATE tarefas SET ? WHERE ?', [
      { TAREFA: req.body.tarefa },
      { ID: req.body.id },
    ]);

    const sql = 'UPDATE tarefas set TAREFA =?  WHERE ID = ?';

    const query = connection.query(
      sql,
      [req.body.tarefa, req.body.id],
      function(err, result) {
        //console.log(result);
      }
    );

    connection.end();
    //var resultado = JSON.parse(JSON.stringify(rows));
    return res.json('ATUALIZADO COM SUCESSO2:');
  },
};
