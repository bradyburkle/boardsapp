const percentile = require('percentile');

//Sets variables and tiers for skill assignments
//NEED TO ADD QUANTIFABLE TO EACH
let skillTiers = {
    tier1: {
        name: 'Superstar',
        value: 0.05
    },
    tier2: {
        name: 'All-Star',
        value: 0.15
    },
    tier3: {
        name: 'Quality',
        value: 0.35
    },
    tier4: {
        name: 'Average',
        value: 0.65
    },
    tier5: {
        name: 'Below Average',
        value: 0.85
    },
    tier6: {
        name: 'Poor',
        value: 1
    },
}


//Sets variables and tiers for random age assignments in line with league data
let ageTiers = {
    tier1: {
        value: 0.05
    },
    tier2: {
        value: 0.15
    },
    tier3: {
        value: 0.35
    },
    tier4: {
        value: 0.65
    },
    tier5: {
        value: 0.85
    }
}

// Set the dividend pool amount figure
let divPool = 100000;

// Defines a method to be added on the array to sum property values -- pass it the string of the property value you want
Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}

// Assigns random numbers to determine the athlete's skill based on the tiering 
let randomizeSkill = () => {
    
        let coeff = Math.random();
        if (coeff < skillTiers.tier1.value) {
            return skillTiers.tier1.name
        } 
        else if (coeff < skillTiers.tier2.value) {
            return skillTiers.tier2.name

        }
        else if (coeff < skillTiers.tier3.value) {
            return skillTiers.tier3.name
            }
        else if (coeff < skillTiers.tier4.value) {
            return skillTiers.tier4.name
        }
        else if (coeff < skillTiers.tier5.value) {
            return skillTiers.tier5.name
        }
        else 
        return skillTiers.tier6.name;
    
    }

//Assigns random ages based on the league population of age ranges
let randomizeAge = () => {
        let coeff = Math.random();
    console.log(getRndInteger(1, 4));
        if (coeff < ageTiers.tier1.value) {
            let ageSelector = getRndInteger(1, 4);
                if (ageSelector == 1) {
                    return 18
                } else if (ageSelector == 2) {
                    return 19
                } else if (ageSelector == 3) {
                    return 20
                } else if (ageSelector == 4) {
                    return 21
                }

                
        }
        else if (coeff < ageTiers.tier2.value) {
            let ageSelector = getRndInteger(1, 5);
            if (ageSelector == 1) {
                return 22
            } else if (ageSelector == 2) {
                return 23
            } else if (ageSelector == 3) {
                return 24
            } else if (ageSelector == 4) {
                return 25
            } else if (ageSelector == 5) {
                return 26
            }
            
        }
        else if (coeff < ageTiers.tier3.value) {
            let ageSelector = getRndInteger(1, 4);
            if (ageSelector == 1) {
                return 27
            } else if (ageSelector == 2) {
                return 28
            } else if (ageSelector == 3) {
                return 29
            } else if (ageSelector == 4) {
                return 30
            }
       
        }
        else if (coeff < ageTiers.tier4.value) {
            let ageSelector = getRndInteger(1, 4);
            if (ageSelector == 1) {
                return 31
            } else if (ageSelector == 2) {
                return 32
            } else if (ageSelector == 3) {
                return 33
            } else if (ageSelector == 4) {
                return 34
            } else if (ageSelector == 5) {
                return 35
            }
  
        }
        else 
            return '35+'
    }

// Standard function to get round integers between the two passed parameters
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Establish tier counters for purposes of a summary
let tier1 = 0;
let tier2 = 0;
let tier3 = 0;
let tier4 = 0;
let tier5 = 0;
let tier6 = 0;


// Based on the player's randomized skill level, assigns an integer "score" that reflects the player's performance
// ADD A RANDOMNESS ELEMENT TO THE TIER SCORE BASED
let periodScore = () => {
    allPlayers.forEach(player => {
        if(player.skill == 'Superstar') {
            player.score = getRndInteger(90, 100);
             // changed to include skill assignments slightly out of range
            tier1++
        } else if (player.skill == 'All-Star') {
            player.score = getRndInteger(80, 94);
            tier2++
        } else if (player.skill == 'Quality') {
            player.score = getRndInteger(60, 84);
            tier3++
        } else if (player.skill == 'Average') {
            player.score = getRndInteger(30, 64);
            tier4++
        } else if (player.skill == 'Below Average') {
            player.score = getRndInteger(10, 34);
            tier5++
        } else if (player.skill = 'Poor'){
            player.score = getRndInteger(0, 15);
            tier6++
        }
        // console.log(allPlayers);
    })
}

let decliningAge = 27;

let potentialScoreAssignment = (decliningAge) => {
    allPlayers.forEach(player => {
        if((decliningAge - player.age) > 0){
            //this indicates the player is still in the ascention of his career
            player.potential = "Ascending";
            // player.potential = random positive increment based on remaining ascention years and recent score trends
        } else {
            player.potential = "Declining";
            //player is declining in potential until retirement age
        }
    })
}


// Used to construct player objects.  Add properties as necessary to the constructor function
let createPlayer = (id, age, skill, potential) => {
   return ( { 
        id: id,
        age: age,
        skill: skill,
        potential: potential
    } )
};

// Empty array for return of constructor
let allPlayers = [];

// This -- currently -- initializes the process by receiving a parameter to determine how many athletes should be in the simulation

let setPlayers = (playerCount) => {
    for (let i = 0; i < playerCount; i++) {
        let age = randomizeAge(); // gets random age
        let skill = randomizeSkill(); // gets random skill
        let potential = potentialScoreAssignment(decliningAge);
        
        allPlayers.push(createPlayer(i, age, skill, potential)) //pushes each constructed object to the allPlayers array
    }
    periodScore(); //executes the assignment of performance to all simulated athletes
    let totalPlayerScores = allPlayers.sum('score'); //Used as a check and reference to ensure all data captured back to whole

    //Logs the breakout by tier of the simulation
    console.log(
        `Total Scores: ${totalPlayerScores}, 
        Superstars: ${tier1},
        All-Stars: ${tier2},
        Quality: ${tier3},
        Average: ${tier4},
        Below Average: ${tier5},
        Poor: ${tier6}
    `);
    console.log(allPlayers);

}


//SIMULATION EXECUTE CALL
setPlayers(100);


//Set dividend threshold variable to determine which players qualify 
let dividendThreshold = '';

// Declare an empty array to hold the dividend qualifiers pushed from allPlayers 
let dividendEarners = [];

//Find the percentile breaks.  This should be converted to a function that receives the percentile cut off based on the received parameter
let result = percentile(
    60,
    allPlayers,
    item => item.score
);

//This should be involved with the percentile function.  This sets the score that a player needs to exceed to be pushed to the dividend earners array
let thresholdCutOff = result.score;


// The function to execute the filtering of the allPlayers array down to those players who have a score exceeding the threshold.  Also counts the number of dividned earners

let countAboveThreshold = (array, func, threshold) => {
    let i = 0;
    let count = 0;
    while (i < array.length) {
        if (func(array[i], threshold)) { 
            count++;
            dividendEarners.push(array[i]);
        };
        i++
    }
    // console.log(dividendEarners);

    let dividendEarnersTotalScore = dividendEarners.sum('score');
    // console.log(dividendEarnersTotalScore);

    dividendEarners.forEach(player => {
        let allocPercentage = ( player.score / dividendEarnersTotalScore);
        player.alloc = allocPercentage;
    })
    allocateDividend(dividendEarners, divPool);
    // console.log(dividendEarners);
    return count;
}

let aboveCheck = (obj, threshold) => {
    return obj['score'] > threshold;
}

let allocateDividend = (divEarnerArray, divPool) => {
    divEarnerArray.forEach(earner => {
        earner.dividend = ( earner.alloc * divPool );
    })
}

//EXECUTING THE DIVIDEND PROCESS
console.log(countAboveThreshold(allPlayers, aboveCheck, thresholdCutOff));


//Player performance should begin to level/decline at age 27 (per fivethirtyeight) 

//Create the initial set of players, assigning them age and a quality metric

// Based on their assigned quality metric for that initial period; determine an upside potential remaining function based on their ASSIGNED TIER AND remaining years to play

// If a player is young and assigned a higher level to start, that player should have a longer career and a maintenance of level to 27

// Progress the period

// The new player score for the period should be a +/- based on 1) age progression , 2) recent trend, 3) deviation/randomness  

// let progressionDirection = getRndInteger(0, 1);
// if (progression > 0) {
//     player.skillNumber = 
//                 }