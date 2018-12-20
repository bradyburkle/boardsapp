import React from 'react';
import SimmedCard from './resultsClass';


class CardListSim extends React.Component {
componentWillMount() {
    console.log('ComponentWillMount')
}

componentDidMount() {
    console.log('Component did mounbt')
}

componentWillReceiveProps(nextProps) {
    console.log('Component will receive props', nextProps)
}

shouldComponentUpdate(nextProps, nextState) {
    console.log('Should component update', nextProps, nextState)
    return true
}

componentWillUpdate(nextProps, nextState){
    console.log('Component will update', nextProps, nextState)
}

componentDidUpdate(prevProps, prevState) {
    console.log('Component did update', prevProps, prevState);
}

componentWillUnmount() {
    
    console.log('ComponentWillUnmount');
}

    render() {
        let data = this.props.data;
        console.log(data);

        return (
            <div className="flex flex-wrap justify-center" >
                {
                    data.map(period => {
                        return period.map(player => {
                            return player.map(period => {
                                return (
                                    <SimmedCard
                                        id={period.id}
                                        currentAge={period.age}
                                        currentRating={period.rating}
                                        retirementAge={period.retirementAge}
                                        potential={period.potential}
                                        simPeriod={period.simPeriod}
                                    />
                           ) 
                        })
                    })
                })
                }
            </div>
        )


    }


};


export default CardListSim