const app = require('./app');

const connectDatabase = require('./config/database')

//connfig
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

//Connecting to database
connectDatabase()

app.listen(process.env.PORT, () => [
  console.log(`Server is running at http://localhost:${process.env.PORT}`),
]);
