module.exports = (sequelize, DataTypes) => {
  return sequelize.define('burgers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    burger_name: {type: DataTypes.STRING},
    devoured: {type: DataTypes.BOOLEAN, defaultValue: false}
  })
}