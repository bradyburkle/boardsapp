var Prob = require('prob.js');

let playerObj = {
    rating: 70,
    potential: 92,
    yearsRemainingOnUpside: 7
}




const progressPlayer = (obj) => {
    obj.spread = obj.potential - obj.rating;
    obj.pace = obj.spread / obj.yearsRemainingOnUpside

    return obj
};

let n = 100;




const positiveProgression = () => {
    var f = Prob.normal(0,1.0);
    let progressionCoeff = f();
    console.log(progressionCoeff * 100);
}

const assignProgressRegress = (coeff, playerObj) => {
    if (coeff > .2) {
        console.log('Progress');
    } else { console.log('Regress')}
}

const decideProgressRegress = () => {
    var r = Prob.uniform(0, 1);
    let decisionCoeff = r();
    return decisionCoeff
}

assignProgressRegress(decideProgressRegress(), playerObj)
positiveProgression();

// for (let i = 0; i < n; i++) {
//     var r = Prob.normal(0, 1.0);
//     console.log(r());
    
// }

// console.log(randn_bm(-3,3,1));
// console.log(progressPlayer(playerObj));