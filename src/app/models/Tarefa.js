import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Tarefa extends Model {
  static init(sequelize) {
    super.init(
      {
        tarefa: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_usuario', as: 'user' });
  }

  //
}

//caso precise, porem pode ser feito se
sequelizePaginate.paginate(Tarefa);

export default Tarefa;
