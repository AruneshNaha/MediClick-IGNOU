const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
    //   useUnifiedTopolgy: true,
    //   useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb connected to the server: ${data.connection.host}`);
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
