module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customers', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      validate: { len: [1, 25] }
    }
  })
}