const allPlayers = [];
const declineYearArray = [];
const gausAge = [];
const otherAge = [];
const gausScoreArr = [];
const otherScoreArr = [];

let count35 = 0;
let count31 = 0;
let count27 = 0;
let count22 = 0;
let count18 = 0;
let count90 = 0;
let count80 = 0;
let count70 = 0;
let count60 = 0;
const playerContainer = [];
const playerData = [];
//FUNCTIONS
//   Display Range of Standard Deviation
let stdDevRange = (avg, std) => {
    let oneplus = (avg + std).toPrecision(4);
    let oneminus = (avg - std).toPrecision(4);
    let twoplus = (avg + std * 2).toPrecision(4);
    let twominus = (avg - std * 2).toPrecision(4);
    let threeplus = (avg + std * 3).toPrecision(4);
    let threeminus = (avg - std * 3).toPrecision(4);

    return (`
        +1: ${oneplus} || -1: ${oneminus} <br><br>
        +2: ${twoplus} || -2: ${twominus} <br><br>
        +3: ${threeplus} || -3: ${threeminus} <br><br>
    `)
} 

//Calculate Standard Deviation on an Array of values
function standardDeviation(values) {
    var avg = average(values);

    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

//Used for non-normal distributions
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

//Calculate the average of an Array of values
function average(data) {
    var sum = data.reduce(function (sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}

//Calculate a random number from a given skewed distribution
function gaussianRand(skew) {
    var rand = 0;

    for (var i = 0; i < skew; i += 1) {
        rand += Math.random();
    }

    return rand / skew;
}
//Set the parameters for the distribution
function gaussianRandom(start, end, skew) {
    return Math.floor(start + gaussianRand(skew) * (end - start + 1));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Compile the Overall Grades for players based on passed parameters
let randomResultCompilerGaus = (x, y, skew) => {
        let rndnInstance = gaussianRandom(x, y, skew);
        gausScoreArr.push(rndnInstance);
        if (rndnInstance > 90) {
            count90++;
        } else if (rndnInstance > 80) {
            count80++;
        } else if (rndnInstance > 70) {
            count70++
        } else 
            count60++;
    };

//Compile the Age for players based on passed parameters
let randomAgeCompilerGaus = (x, y, skew) => {
        let rndnInstance = gaussianRandom(x, y, skew);
        gausAge.push(rndnInstance);

        if (rndnInstance > 35) {
            count35++;
        } else if (rndnInstance > 31) {
            count31++
        } else if (rndnInstance > 27) {
            count27++
        } else if (rndnInstance > 22) {
            count22++
        } else count18++
    };

let careerLength = (leagueBaseAge, retirementAge) => {
    return retirementAge - leagueBaseAge;
}

//Take the current age, subtract the 
let downsideProgressFunc = (currentAge, decliningAge, downsidePeriods) => {
    return ((currentAge - decliningAge) / downsidePeriods);
}

let percentageOfProgressionFunc = (yearsPro, upsidePeriods) => {
    return yearsPro / upsidePeriods;
}

let percentageOfRegressionFunc = (peakAge, startingAge, retirementAge, currentAge) => {
    let currentAgeMinusPeakAge = currentAge - peakAge;
    let careerAgeMinusPeakAge = retirementAge + 1 - startingAge;

    return currentAgeMinusPeakAge / careerAgeMinusPeakAge;


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

const progressedArray = (arr) => {
    let forwardPeriod = arr.map(obj => {
        var rObj = {};
        //Static variable copy forward
        rObj.id = obj.id;
        rObj.startingAge = obj.startingAge;
        rObj.currentAge = obj.currentAge + 1;
        rObj.decliningAge = obj.decliningAge;
        rObj.retirementAge = obj.retirementAge;
        rObj.careerLength = obj.careerLength;
        rObj.potential = obj.potential;
        rObj.upsidePeriods = obj.upsidePeriods;
        rObj.downsidePeriods = obj.downsidePeriods;

        //Variables requiring a recalculation
        rObj.yearsPro = obj.yearsPro + 1;
        rObj.yearsFromPeak = obj.yearsFromPeak - 1;
        rObj.currentRating = Math.floor(startingRating(rObj.currentAge, rObj.decliningAge, rObj.yearsPro, rObj.upsidePeriods, rObj.potential, rObj.downsidePeriods), 2);
        rObj.simPeriod = obj.simPeriod + 1;

        // console.log(rObj.currentAge, rObj.decliningAge, rObj.yearsPro, rObj.upsidePeriods, rObj.potential, rObj.downsidePeriods);


        rObj.percentageOfProgression = percentageOfProgressionFunc(rObj.yearsPro, rObj.upsidePeriods);

        rObj.percentageOfRegression = percentageOfRegressionFunc(rObj.decliningAge, 19, rObj.retirementAge, rObj.currentAge);

        return rObj;

    })
    return forwardPeriod;
};

const progressPeriods = (numOfPeriods, prevArray) => {
    let simulationData = [];
    for (let i = 0; i < numOfPeriods; i++) {
        if (i == 0) { simulationData.push(progressedArray(prevArray));} 
        else {
            simulationData.push(progressedArray(simulationData[i - 1]));
        }

    }
    return simulationData;
}

//CONSTRUCTOR FUNCTION -- MAIN COMPILER
 let createPlayers = (n, periods) => {
    for (let i = 0; i < n; i++){ 
        // ^ Controls how many items get pushed to the arrays

        //Compile Random Start Age
        randomAgeCompilerGaus(18, 40, 2);

        //Compile Random "Potential" ([low, max] max throughout career)
        randomResultCompilerGaus(60, 99, 4);

        //Compile random year of skill decline [low year, high year]
        declineYearArray.push(gaussianRandom(25, 34, 4));

        //Determines the number of years the player will play after the peak season
        let yearsRemaining = randn_bm(2, 8, 0.5);

        //Set the player's starting age for their career (Period 0 / first period)
        let startingAge = gausAge[i];
        let decliningAge = declineYearArray[i];
        let determinedRetirementAge = decliningAge + yearsRemaining < startingAge ? startingAge : decliningAge + yearsRemaining;
        let retirementAge = Math.floor(determinedRetirementAge);
        let yearsPro = startingAge - 19;
        let potential = gausScoreArr[i];
        let downsidePeriods = determinedRetirementAge - decliningAge;
        let upsidePeriods = decliningAge - 19;
        let yearsRemainingOnUpside = decliningAge - startingAge;





        allPlayers.push({
            id: i, //static
            startingAge: startingAge, //static
            currentAge: startingAge,
            decliningAge: decliningAge, //static
            retirementAge: retirementAge, //static
            careerLength: careerLength(startingAge, retirementAge),
            potential: potential, //static
            yearsFromPeak: yearsRemainingOnUpside, //incremented with each period
            currentRating: startingRating(startingAge, decliningAge, yearsPro, upsidePeriods, potential, downsidePeriods), //recalculated each period
            yearsPro: yearsPro, //incremented each period
            upsidePeriods: upsidePeriods, //static
            yearsRemainingOnUpside: yearsRemainingOnUpside, //incremented
            percentageOfProgression: percentageOfProgressionFunc(yearsPro, upsidePeriods), //recalculated
            downsidePeriods: downsidePeriods, //static
            downsideProgress: downsideProgressFunc(startingAge, decliningAge, downsidePeriods), //static
            percentageOfRegression: percentageOfRegressionFunc(decliningAge, startingAge, retirementAge, startingAge), //recalculated
            simPeriod: 1
        }
        )
        
    }
    let resultsArray = [];
    resultsArray.push(allPlayers);

    //FUNCTION FIRING OFF MULTIPLE PERIODS
     let iterationResults = progressPeriods(periods, allPlayers);
    resultsArray.push(...iterationResults);
    playerData.push(...resultsArray)
    return playerData;
}

//Compile statistical information on the sample generator
let avg = average(gausAge);
let stdDev = standardDeviation(gausAge);
let avgSkill = average(gausScoreArr);
let stdDevSkill = standardDeviation(gausScoreArr);
let stdDevRangeReturn = stdDevRange(avg, stdDev);
let stdDevRangeSkillReturn = stdDevRange(avgSkill, stdDevSkill);

//Execute the Process
let chosenPlayerCount = 10;
let chosenPeriodLength = 1;

let simData = createPlayers(chosenPlayerCount, chosenPeriodLength);

const retrievePlayerData = (arr, period, player) => {
   return arr[period][player];
}

const compilePlayerPeriods = (data, periods, playersCount) => {
    for (let n = 0; n < playersCount; n++) {
        
        for (let i = 0; i < periods; i++) {
            if(i === 0) {
                let returnedData = retrievePlayerData(data, i, n);
                playerContainer[n] = [returnedData];
            } else {
                playerContainer[n].push(retrievePlayerData(data, i, n))
            }
           
        }

    }    
        
};

compilePlayerPeriods(simData, chosenPeriodLength, chosenPlayerCount);

module.exports = {
    playerContainer,
    chosenPlayerCount,
    chosenPeriodLength,
    progressedArray,
    progressPeriods,
    compilePlayerPeriods,
    average,
    standardDeviation,
    stdDevRange,
    gaussianRandom
}

//PRESENT ANY DATA ON THE HTML -- KEEP ON BOTTOM -- COMMENT OUT FOR FULL APP
    //     document.body.innerHTML = (`
    //     <div class="row">
    //         <div class="column">
    //         Average Age: ${avg}<br><br>
    //         Std Age: ${stdDev}<br><br>
    //         Std Range: <br><br> ${stdDevRangeReturn}<br><br>
            
    //         Age by Tier: <br>
    //         <ul>
    //         35+: ${count35} <br>
    //         31+: ${count31} <br>
    //         27+: ${count27} <br>
    //         22+: ${count22} <br>
    //         18+: ${count18} <br>
    //         </ul>
    // <br><br>
    //         Average Skill: ${avgSkill}<br><br>
    //         Std Skill: ${stdDevSkill}<br><br>
    //         Std Range:<br><br> ${stdDevRangeSkillReturn}<br><br>
            
    //         Skill by Tier: <br>
    //         <ul>
    //         90+: ${count90}<br>
    //         80+: ${count80}<br>
    //         70+: ${count70}<br>
    //         60+: ${count60}<br>
    //         </ul>
    //     </div>
    //     <div class="column">
    //     ${allPlayers[0]}
    //     ${playerData[0][0].currentRating}
    //     </div>
    // </div>
    //     `)

        
