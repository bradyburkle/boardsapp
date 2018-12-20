const currentMarketPrice = [];




const priceFetch = (req, res, db) => {
    return db
        .distinct('ticker', 'price')
        .select()
        .from('market')
        .where('ticker', '=', req.body.ticker)
        .then(data => {
            const maxValueOfTrade = Math.max(...data.map(o => o.price), 0);
            res.json(maxValueOfTrade);
            }
        )
};

module.exports = {
    priceFetch: priceFetch
}

// const dataResponse = data;
// if (dataResponse.length > 0 && dataResponse[0].ticker === req.body.ticker) {
//     const maxValueOfTrade = Math.max(...dataResponse.map(o => o.price));
//     currentMarketPrice.push(dataResponse[0].ticker, maxValueOfTrade);
//     return currentMarketPrice