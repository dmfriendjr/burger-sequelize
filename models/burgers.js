module.exports = (sequelize, DataTypes) => {
  return sequelize.define('burgers', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    burger_name: {
      type: DataTypes.STRING,
      validate: { len: [1, 25] }
    },
    devoured: {type: DataTypes.BOOLEAN, defaultValue: false}
  })
}