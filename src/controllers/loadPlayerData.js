const handleNbaPlayerRequest = (req, res, db) => {
    return db
    .select('boardsid', 'ticker', 'nbaid')
    .from('nbainfo')
    .where('nbaid', '=', req.body.playerId)
    .then(response => res.json(response))};



module.exports = {
    handleNbaPlayerRequest: handleNbaPlayerRequest
}