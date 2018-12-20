const express = require('express');



const app = express();
const bodyParser = require('body-parser');
const database = {
    users: [
        {
            id:'123',
            name: 'Brady',
            email: 'brady.burkle@gmail.com',
            password: 'Ripped32!',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Marty',
            email: 'shanklemarty@gmail.com',
            password: 'poptart',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(bodyParser.urlencoded({extended: false})) //like installing a thirty party software to use within express.  Body parser lets you use req/res body etc

app.use(bodyParser.json()); //this parses the json file returned by the body

// app.use(express.static(__dirname)) //this will server up the index.html file in the directory you give it.  use dir name to id the current folder

app.get('/:id', (req, res) => {
    console.log(req.query) //this gets the request query string from the url request in browser

    req.body //this will get the body of the request

    console.log(req.headers) //returns an object of header keys and values

    console.log(req.params) //will log the /blahblah from the url as an object with the object proprty of whatever is after the : in the parameter (ie id blahblah)

    res.status(404).send("Not found"); //request (coming from the browser) and resolve (sending back to the browser from the server)
});

app.get('/profile', (req, res) => {
    res.send("Getting Account");
});


app.post('/profile', (req, res) => {
    console.log(req.body)
    const user = {
        name:'Brady',
        account: '5000',
    }
    res.send(user);
});


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === {id}){
            res.json(user)
        }
            else {
                res.status(404).json('Error, no such user')
            }
    })
});






app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) =>{
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success!');
    } else {
        res.status(400).json('Error logging in.')
    }
    
})


app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
        
    database.users.push({
            id: '124', 
            name: name,
            email: email,
            password: password,
            joined: new Date(),
        })
    res.json(database.users[database.users.length-1])
    })




app.listen(3000, () => {
    console.log('app is running on port 3000');
})
/*
/ --> res = this is working

/signin --> POST request (posting the userinformation) ... responds with success or fail

/register --> POST request to add information to database
                POST = user will return
/profile/:userid --> GET the user information
/image (player maybe?) --> PUT --> user (want to update, use PUT)

*/