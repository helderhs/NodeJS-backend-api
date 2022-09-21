module.exports = {
  // single transformation
  formatarTarefa(tarefa) {
    console.log(tarefa);
    return {
      id: tarefa.id,
      tarefa: tarefa.tarefa,
      usuario: [{ id: tarefa.user.id, nome: tarefa.user.name }],
    };
  },

  // collection transformation
  transformCollection(tarefas) {
    const data = [];
    for (let i = 0; i <= tarefas.length - 1; i++) {
      data.push(this.formatarTarefa(tarefas[i]));
    }
    return data;
  },
};
