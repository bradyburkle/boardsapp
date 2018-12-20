

//WHAT NEEDS TO BE INCREMENTED FOR TIME?
const progressPeriods = (numOfPeriods, prevArray) => {
    let simulationData = [];
    for (let i =0; i < numOfPeriods; i++) {
        simulationData.push(reformattedArray(prevArray));
    }
    return simulationData;
}