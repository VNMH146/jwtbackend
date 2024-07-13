const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jwt', 'root', 'Huy0774792593', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connection;
