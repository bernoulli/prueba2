
import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';
import mongoose from 'mongoose';


const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/nota'));

// Conexión base de datos

const uri = 'mongodb+srv://bcuervo:Martina2501@cluster0.ancw6.mongodb.net/myapp?retryWrites=true&w=majority';

//const uri = 'mongodb://localhost:27017/myapp';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
// Or using promises
mongoose.connect(uri).then(
/** ready to use. The `mongoose.connect()` promise resolves to
mongoose instance. */
() => { console.log('Conectado a DB') }, /** handle initial connection error */ 
err => { console.log(err) }
);

app.get('/', function (req, res) { 
    res.send('Hello World!');
});


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history()); 
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3001); 
app.listen(app.get('puerto'), function () {
    console.log('Example app listening on port: '+ app.get('puerto')); 
});