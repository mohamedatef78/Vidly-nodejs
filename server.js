const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config({ path: './config.env' });
const app = require('./index');
mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then(() => console.log('DB connection successful!'))
    .catch(err=>console.error(err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));


  
// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     server.close(() => {
//       process.exit(1);
//     });
//   });
  