const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const tradeRequest = require('./controllers/tradeRequest.js');
const priceFetch = require('./priceFetch');
const loadPlayerData = require('./controllers/loadPlayerData.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ripped32',
        database: 'boardsdb'
    }
});
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(db.users))

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt)}) 
  
app.post('/priceFetch', (req, res) => { priceFetch.priceFetch(req, res, db)
});

app.post('/playerInfo', (req, res) => {
    loadPlayerData.handleNbaPlayerRequest(req, res, db);
});

// app.post('/players/:id', (req, res) =>{
//     const { id } = req.params;
//     db.select('*').from('')
// }

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.post('/trade', (req, res) => { tradeRequest.handleTradeRequest (req, res, db) });

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('error getting user')
            }
            
        }) 
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))