const mongoose = require('mongoose');

const conn = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.DB_URI, {
      dbName: 'pcat',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = conn;
