let a = {
    period: 1
}

let b = {
    period: 1
}

let c = {
    period: 2
}

let d = {
    period: 4
}

let e = {
    period: 3
}

let f = {
    period: 1
}

let array = [[a,b,c],[d,e,f]];
let periodFilteredArray = [];

const iterationProcess = () => {array.forEach(item => {
    item.forEach(subItem => {
        if (subItem.period == 1){
            periodFilteredArray.push(subItem)
        }
    })
})};

iterationProcess();
console.log(periodFilteredArray);

/*
            const updateSimState = (array) => {
                this.setState({
                    simulationData: {
                        simPlayers: array
                    }
                })
            }

            const iterationProcess = (array) => {
                array.forEach(item => {
                    item.forEach(subItem => {
                        if (subItem.simPeriod == 1) {
                            periodFilteredArray.push(subItem)
                        }
                    })
                })

            }
            iterationProcess(this.state.simulationData.simPlayers);
            updateSimState(periodFilteredArray)
*/