import React from 'react';
import { playerContainer, chosenPlayerCount, progressedArray, progressPeriods, compilePlayerPeriods, average, standardDeviation, stdDevRange } from '../results';


class StatDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avgAge: 0
        };
        
    }

    getAverage = (flatArrayOfNumbers) => {
        return average(flatArrayOfNumbers);
    }


    componentWillReceiveProps(prevProps, nextProps){
        let periodChoice = this.props.selected.value || 0;
        console.log('Will receive', 'prev props: ' + prevProps, nextProps);


        if(periodChoice !== '') {
            const ageCompiler = [];
            let chosenRenderPeriod = this.props.renderedPlayers;
            console.log(chosenRenderPeriod);

            chosenRenderPeriod[0].forEach(subElement => {
                subElement.forEach(player => {
                    ageCompiler.push(player.currentAge);
                })
            })
            
            console.log(ageCompiler);
            let averageAge = this.getAverage(ageCompiler);
            this.setState({
                avgAge: averageAge
            })
        } else {
            console.log('Else case');
        }


       
        



    }
    
    render(){
       
        return(
            <div className="f7 tc pl2">
                <h3>Average Age: {this.state.avgAge}</h3>
                {/* <h3>Average Age: {age}</h3>
                <h3>Standard Deviation: {stdDev}</h3> */}
            </div>
        )
    }

};

export default StatDisplay;