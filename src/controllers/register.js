

const handleRegister = (req, res, db, bcrypt) => {
    const hash = bcrypt.hashSync(req.body.password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return db('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        lastname: req.body.lastname,
                        firstname: req.body.firstname,
                    }).then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err));
}

module.exports = {
    handleRegister: handleRegister
}