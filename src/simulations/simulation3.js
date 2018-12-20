// import requestRandomNames from './randomnessGenerator';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

async function requestRandomNames() {
    const response = await fetch('https://uinames.com/api/?region=united%20states&gender=male');
    const json = await response.json();
    console.log(json);
    const name = json.stringify();
    return name
}

let dataArray = [];


//Make the ROOKIE player objects
const playerObjMaker = (n, lowPotential, highPotential, lowDecline, highDecline) => {
    let initialArray = [];
    for (let i = 0; i < n; i++) {


        let potential = gaussianRandom(lowPotential, highPotential, 1);
        let declineAge = gaussianRandom(lowDecline, highDecline, 2);
        let enteredLeagueAgeInit = Math.floor(randn_bm(19, 24, 1));
        let enteredLeagueRating = Math.floor(randn_bm(lowPotential, 80, 3));
        let yearsPro = (declineAge - enteredLeagueAgeInit) + Math.floor(randn_bm(1, 12, 2));
        let determinedRetirementAge = enteredLeagueAgeInit + yearsPro;
        let retirementAge = Math.floor(determinedRetirementAge);
        let retirementRating = Math.floor(randn_bm(50, 65, 1))

        let downsidePeriodsCareer = Math.floor(determinedRetirementAge - declineAge);
        let upsidePeriodsCareer = Math.floor(declineAge - enteredLeagueAgeInit);
        let progressionSlope = (potential - enteredLeagueRating) / upsidePeriodsCareer
        let regressionSlope = (retirementRating - potential) / downsidePeriodsCareer


        initialArray.push({
            id: i,
            name: '',
            potential: potential,
            declineAge: declineAge,
            retirementAge: retirementAge,
            enteredLeagueAge: enteredLeagueAgeInit,
            enteredLeagueRating: enteredLeagueRating,
            age: enteredLeagueAgeInit,
            yearsPro: yearsPro,
            downsidePeriodsCareer: downsidePeriodsCareer,
            upsidePeriodsCareer: upsidePeriodsCareer,
            simPeriod: 1,
            rating: enteredLeagueRating,
            progressionSlope: progressionSlope,
            retirementRating: retirementRating,
            regressionSlope: regressionSlope
        })
    }
    return initialArray
}

let getProgress = (boolean, obj) => {
    if (boolean) {
        let slopePure = (obj.potential - obj.rating)
        let factor = gaussianRandom(10, 100, 3) / 100;
        let change = slopePure * (factor);
        let newRating = obj.rating + change;
        return newRating
    } else {
        let slopePure = (obj.rating - obj.retirementRating)/(obj.downsidePeriodsCareer); //this sets the floor for how low you can go
        //a big regress would be = 1; 
        let factor = gaussianRandom(50, 100, 3) / 100;
        let change = -(slopePure * factor)
        let newRating = obj.rating + change;
        return newRating
    }
}


//Function that touches incremental properties
const progressPlayers = (arr) => {
    let simArray = [];
    arr.forEach(obj => {
        let newObj = {};
        newObj.age = obj.age + 1;
        newObj.simPeriod = obj.simPeriod + 1;
        newObj.progress = determiningFunc(obj.simPeriod);
        newObj.id = obj.id;
        newObj.potential = obj.potential;
        newObj.declineAge = obj.declineAge;
        newObj.retirementAge = obj.retirementAge;
        newObj.enteredLeagueAge = obj.enteredLeagueAge;
        newObj.enteredLeagueRating = obj.enteredLeagueRating;
        newObj.yearsPro = obj.yearsPro;
        newObj.downsidePeriodsCareer = obj.downsidePeriodsCareer;
        newObj.upsidePeriodsCareer = obj.upsidePeriodsCareer;
        newObj.retirementRating = obj.retirementRating;
        newObj.rating = getProgress(newObj.progress, obj);
        simArray.push(newObj);

    })
    return simArray

}

let multiplePeriods = (arr, n) => {
    for (let i = 0; i < n; i++) {
        let index = arr.length - 1
        let progressedPlayers = progressPlayers(arr[index]);
        simContainer.push(progressedPlayers);
    }
}

let simContainer = [];

const initialArray = playerObjMaker(1, 60, 99, 26, 34);
simContainer.push(initialArray);



multiplePeriods(simContainer, 9); // number of periods plus 1
console.log(simContainer);

export {simContainer, progressPlayers};

// let newObj = {};
// let progress = determiningFunc(obj.simPeriod);
// newObj.progress = progress
// newObj.age = obj.age++;
// newObj.simPeriod = obj.simPeriod++;


// newObj.id = obj.id;
// newObj.potential = obj.potential;
// newObj.declineAge = obj.declineAge;
// newObj.retirementAge = obj.retirementAge;
// newObj.enteredLeagueAge = obj.enteredLeagueAge;
// newObj.enteredLeagueRating = obj.enteredLeagueRating;
// newObj.yearsPro = obj.yearsPro;
// newObj.downsidePeriodsCareer = obj.downsidePeriodsCareer;
// newObj.upsidePeriodsCareer = obj.upsidePeriodsCareer;
// newObj.retirementRating = obj.retirementRating;

// newObj.rating = getProgress(progress, obj);



// console.log(newObj);


// return newObj




// let periods = determinePlayerStartingAge(playerObj.yearsPro);
// progressPlayer(playerObj, periods);
// console.log(playerHistoryArray);