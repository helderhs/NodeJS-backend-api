import * as Yup from 'yup';
import Tarefa from '../models/Tarefa';
import formatador from './TarefaTransform';

class TarefaController {
  async index(req, res) {
    const tarefas = await Tarefa.findAll({
      //* EXEMPLOS PARA RETORNO */

      //attributes: ['tarefa', 'id'],
      where: { id_usuario: req.id_usuario },
      //include: 'user',
      //include: [{ association: 'user', attributes: ['tarefa'] }],
      include: [{ association: 'user', attributes: ['id', 'name'] }],
    });

    //return res.json(formatador.formatarTarefa(tarefas));
    return res.json(formatador.transformCollection(tarefas));
    //return res.json(tarefas);
  }

  async indexPaginacao(req, res) {
    const _limitePorPagina = 5;
    const _pagina = 3 - 1;
    const tarefas = await Tarefa.findAndCountAll({
      offset: _pagina * _limitePorPagina, // your page number = page * limit
      limit: _limitePorPagina, // your limit
    });
    tarefas.numPaginas = Math.ceil(tarefas.count / _limitePorPagina);
    /*
    const options = {
      page: 1, // Default 1
      paginate: 4, // Default 25
      order: [['id']],
      //where: { name: { [Op.like]: `%elliot%` } },
    };
    const { docs, pages, total } = await Tarefa.paginate(options);*/

    return res.json(tarefas);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      tarefa: Yup.string().required('É preciso informar uma tarefa'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
    }

    const { tarefa } = req.body;

    const tarefas = await Tarefa.create({
      id_usuario: req.id_usuario,
      tarefa,
    });

    return res.json(tarefas);
  }

  async storeArray(req, res) {
    /*
    const schema = Yup.object().shape({
      tarefa: Yup.string().required('É preciso informar uma tarefa'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
    }*/

    const tarefa = req.body;

    for (let i = 0; i < tarefa.length; i++) {
      tarefa[i].id_usuario = req.id_usuario;
      console.log(tarefa[i]);
    }
    console.log(tarefa);

    const tarefas = await Tarefa.bulkCreate(tarefa);
    //console.log(tarefas2);

    return res.json(tarefas);
  }

  async update(req, res) {
    const { id_tarefa } = req.params;

    const tarefa = await Tarefa.findByPk(id_tarefa);

    if (!tarefa) {
      return res.status(400).json({ error: 'Tarefa não existe.' });
    }

    await tarefa.update(req.body);

    return res.json(tarefa);
  }

  async delete(req, res) {
    const { id_tarefa } = req.params;

    const tarefa = await Tarefa.findByPk(id_tarefa);

    if (!tarefa) {
      return res.status(400).json({ error: 'Tarefa não existe.' });
    }

    if (tarefa.id_usuario !== req.id_usuario) {
      return res.status(401).json({ error: 'Requisição não autorizada.' });
    }

    await tarefa.destroy();
    return res.send();
  }

  async upload(req, res) {
    const { nome } = req.body;
    res.json({ nome });
  }
}

export default new TarefaController();
