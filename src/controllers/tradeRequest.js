const handleTradeRequest = (req, res, db) => {
    return db('market').insert({
        ticker: req.body.ticker,
        qty: req.body.qty,
        price: req.body.price,
        type: req.body.type,
        userid: req.body.userid
    })
    .then(response => res.json(response))


};



module.exports = {
    handleTradeRequest: handleTradeRequest
}