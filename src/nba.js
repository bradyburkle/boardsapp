import NBA from 'nba';
// const NBA = require("nba");

const nbaReturnData = [];
export const newPlayers = [];

const availablePlayerArray = [
  'LeBron James',
  'James Harden',
  'Kevin Durant',
  'Joel Embiid',
  'Stephen Curry',
  'Russell Westbrook',
  'Klay Thompson',
  'Jayson Tatum',
  'Dirk Nowitzki',
  'Chris Paul'
];


const request = async (id) =>  {
  const response = await fetch('http://localhost:3001/playerInfo', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      playerId: id
    })
  });
  const json = await response.json();
  return [json[0].ticker, json[0].boardsid];
};





function nbaPlayer(firstName, lastName, playerId, teamId, fullName, downcaseName, ticker, boardsid) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.playerId = playerId;
  this.teamId = teamId;
  this.fullName = fullName;
  this.downcaseName = downcaseName;
  this.ticker = ticker;
  this.boardsid = boardsid;
}

async function players(arr) {
  arr.forEach(player => {
      nbaReturnData.push(NBA.findPlayer(player));
  })

  
  let i = 0;
  
  for (i; i < nbaReturnData.length; i++){
    let index = nbaReturnData[i];
    let apiData = await request(index.playerId);

    newPlayers.push(new nbaPlayer(index.firstName, index.lastName, index.playerId, index.teamId, index.fullName, index.downcaseName, apiData[0], apiData[1]));
    
  };
  // console.log(newPlayers);
};

//returns information from the database and the API for all players included in the array of string inputted
players(availablePlayerArray);




// console.log(newPlayers)
