///////////////////////////////
function gaussianRand(skew) {
    var rand = 0;

    for (var i = 0; i < skew; i += 1) {
        rand += Math.random();
    }

    return rand / skew;
}

function gaussianRandom(start, end, skew) {
    return Math.floor(start + gaussianRand(skew) * (end - start + 1));
}

function randn_bm(min, max, skew) {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

let startingRating = (currentAge, decliningAge, yearsPro, upsidePeriods, potential, downsidePeriods) => {

    if (currentAge > decliningAge) {
        let regressionCoeff = ((currentAge - decliningAge) / downsidePeriods)

        return potential - ((potential - 60) * regressionCoeff)


    } else {
        let progressionCoeff = yearsPro / upsidePeriods;
        return ((potential - 60) * progressionCoeff) + 60
    }
}

let downsideRemainingFunc = (retirementAge, currentAge) => {
    return retirementAge - currentAge
}

let upsideRemainingFunc = (declineAge, currentAge) => {
    return declineAge - currentAge
}

let percentToPeakFunc = (totalUpsidePeriods, remainingUpsidePeriods) => {
    return (totalUpsidePeriods - remainingUpsidePeriods)/totalUpsidePeriods
}

let percentToRetirementFunc = (totalDownsidePeriods, remainingDownsidePeriods) => {
    return 1 - (remainingDownsidePeriods / totalDownsidePeriods)
}

let determiningFunc = (n) => {
    if (n < 3) {
        let r = randn_bm(0, 100, 1)
        if (r > 80) { //80% chance of progress
            return false
           
        } else {
            return true
        }
    } else if (n < 6) {
        let r = randn_bm(0, 100, 1);
        if (r > 60) { //60% chance of progress
            return false
        } else {
            return true
        }
    } else if (n < 10) {
        let r = randn_bm(0, 100, 1);
        if (r > 30) { //30% chance of progress
            return false
        } else {
            return true
        }
    } else {
        let r = randn_bm(0, 100, 1);
        if (r > 10) { // 10% chance of progress
            return false
        } else {
            return true
        }
    }
}

let progressionAmount = (boolean, slope) => {
//if the determiningFunc returns true, the player should PROGRESS (slope * randombetween)
    if (boolean) {
        let slopeIncreaseFactor = 1 + (randn_bm(100, 500, 1)/100);
            let newSlope = slope * slopeIncreaseFactor;
            return newSlope
    } else return slope;
}

//Slope = 5 ... multiply slope by 2 OR reduce the current rating (multiply by less than 100%)

// let playerRatingGenerator = (initialAge, initialRating, potential, peakAge, yearsPro) => {
//     let n = yearsPro;
//     let progressRegress = determiningFunc(n);
//     console.log(progressRegress);
//     let slope = ( potential - initialRating ) / ( peakAge - initialAge);
//     let newSlope = progressionAmount(progressRegress, slope);
//     let ratingArray = [];
//     for (let i = 0; i < n; i++) {
        
//         if (ratingArray.length === 0) {
//             let ratingProgressAmt = initialRating + ((1) * slope);
//             ratingArray.push(ratingProgressAmt);
//         } else {
//         if (progressRegress) {
//             let index = ratingArray.length - 1;
//             let mostRecentRating = ratingArray[index];
//             let ratingProgressAmt = mostRecentRating + ((1) * slope);
//             ratingArray.push(ratingProgressAmt)
//         }
//                 //determine whether it will be a progression or regression of the player for the period

//         }
        

//     }
//     let index = ratingArray.length - 1
//     return ratingArray[index]
// }

/////////////////////////////////
let playerContainer = [];

const createPlayers = (n, lowPotential, highPotential, lowDecline, highDecline) => {
    for ( let i = 0; i < n; i++ ) {

        let potential = gaussianRandom(lowPotential, highPotential, 2);
        let declineAge = gaussianRandom(lowDecline, highDecline, 4);
        let enteredLeagueAgeInit = Math.floor(randn_bm(19, 24, 1));
        let enteredLeagueRating = Math.floor(randn_bm(lowPotential, 80, 1));
        let yearsPro = randn_bm(0, 22, .5);
        let determinedRetirementAge = enteredLeagueAgeInit + yearsPro;
        let retirementAge = Math.floor(determinedRetirementAge);
        let retirementRating = Math.floor(randn_bm(50, 65, 1))
        
        let downsidePeriodsCareer = Math.floor(determinedRetirementAge - declineAge);
        let upsidePeriodsCareer = Math.floor(declineAge - enteredLeagueAgeInit);
        let progressionSlope = (potential - enteredLeagueRating)/upsidePeriodsCareer
        let regressionSlope = (retirementRating - potential)/downsidePeriodsCareer
        

        playerContainer.push({
            id: i,
            potential: potential,
            declineAge: declineAge,
            retirementAge: retirementAge,
            enteredLeagueAge: enteredLeagueAgeInit,
            yearsPro: yearsPro,
            downsidePeriodsCareer: downsidePeriodsCareer,
            upsidePeriodsCareer: upsidePeriodsCareer,
            simPeriod: 1,
            enteredLeagueRating: enteredLeagueRating,
            rating: enteredLeagueRating,
            progressionSlope: progressionSlope,
            retirementRating: retirementRating,
            regressionSlope: regressionSlope
        })
    }

}

////////////////////////////
createPlayers(10, 60, 99, 25, 34);

///////////////////////////////
console.log(playerContainer);

// let playerObj = {
//     rating: 70,
//     potential: 90,
//     initialAge: 22,
//     age: 24,
//     declineAge: 29,
//     upPer: 0,
//     ratingSpread: 0,
// };
// let n = 5
// let historicalProgression = [];

// for (let i = 0; i < n; i++){
//     playerObj.age = playerObj.age + 1;

//     setTimeout(() => historicalProgression.push(playerObj), 1000);
// }

// console.log(historicalProgression);