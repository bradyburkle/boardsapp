import {newPlayers as players} from './nba';

export const loadPrices = (ticker) => {
  fetch('http://localhost:3001/priceFetch', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ticker: ticker
    })
  })
    .then(response => response.json())
    .then(myJson => {
      players.price = myJson;
      let playerIndex = players.findIndex((obj => obj.ticker === ticker));
      players[playerIndex].price = myJson;
      console.log(players);
    })
    .catch(err => {
      console.log(err)
      return 'No price data.'
    })
};

export const setPrices = () => {
  players.forEach(player => {
    const playerPrice = loadPrices(player.ticker);
      return player.price = playerPrice;
  })
};

setPrices();