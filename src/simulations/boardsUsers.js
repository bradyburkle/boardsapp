import React from 'react';
import { chosenPlayerCount, progressedArray, progressPeriods, compilePlayerPeriods, average, standardDeviation, stdDevRange, gaussianRandom } from '../results';
import { simContainer as playerContainer } from './simulation3';

let numOfUsers = 100;
let usersArray = [];
let skillCount1 = 0;
let skillCount2 = 0;
let skillCount3 = 0;
let skillCount4 = 0;
let skillCount5 = 0;


const valuationFunc = (obj) => {
    obj.age
}

const valuePerceptionFunc = (arr, skill) => {
    let skillMultiplier = 0;
    let potentialMultiplier = 0;

    if (skill === 1) {
        skillMultiplier = gaussianRandom(90, 110, 2);
        potentialMultiplier = gaussianRandom(90, 110, 2);
    } else if (skill === 2) {
        skillMultiplier = gaussianRandom(85, 115, 2);
        potentialMultiplier = gaussianRandom(85, 115, 2);
    } else if (skill === 3) {
        skillMultiplier = gaussianRandom(80, 120, 2);
        potentialMultiplier = gaussianRandom(80, 120, 2);
    } else if (skill === 4) {
        skillMultiplier = gaussianRandom(75, 125, 2);
        potentialMultiplier = gaussianRandom(75, 125, 2);
    } else if (skill === 5) {
        skillMultiplier = gaussianRandom(70, 130, 2);
        potentialMultiplier = gaussianRandom(70, 130, 2);
    }

    
    let userViewArray = arr.map(player => {
        // console.log(skillMultiplier)
        return ({
            currentRating: (player[0].currentRating * (skillMultiplier/100)),
            potential: (player[0].potential * (potentialMultiplier/100))
        })
    })
    return userViewArray
}


const createUserProfiles = (arrOfPlayers) => {    
    for (let i = 0; i < numOfUsers; i++) {
       let userSkill = gaussianRandom(1, 5, 2);
        let userRisk = gaussianRandom(1, 5, 2);
        let userBal = gaussianRandom(20, 200, 8);


        usersArray.push({
            id: i,
            skillLevel: userSkill,
            riskPref: userRisk,
            accountBal: userBal,
            perceivedPlayers: valuePerceptionFunc(arrOfPlayers, userSkill),
            portfolio: []
        })
    }
}

const countSkillLevelDistribution = (arr) => {
    arr.forEach(user => {
        if (user.skillLevel === 1) {
            skillCount1++;
        } else if (user.skillLevel === 2) {
            skillCount2++;
        } else if (user.skillLevel === 3) {
            skillCount3++;
        } else if (user.skillLevel === 4) {
            skillCount4++;
        } else {
            skillCount5++;
        }
    })
}


playerContainer.forEach(player => {
    // console.log(player[0]);
})
createUserProfiles(playerContainer);
// console.log(usersArray);
countSkillLevelDistribution(usersArray);
// console.log(skillCount1, skillCount2, skillCount3, skillCount4, skillCount5);
let BoardsUsers = usersArray;
export default BoardsUsers;