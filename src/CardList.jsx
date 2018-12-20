import React from 'react';
import Card from './Card.jsx';


class CardList extends React.Component { 

    componentDidMount() {
        this.timerID = setInterval(
            () => this.props.setPrices(),
            100000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
    return (
        <div className="flex flex-wrap justify-center" >
            {
                this.props.players.map((i) => {
                    return (
                        <Card

                            key={this.props.players[i].boardsid}
                            price={this.props.players[i].price}
                            id={this.props.players[i].boardsid}
                            nba={this.props.players[i].playerId}
                            ticker={this.props.players[i].ticker}
                            name={this.props.players[i].fullName}
                            handleClick={this.props.handleClick}


                        />
                    );
                })
            }
        </div>
    )
};
    }
    

export default CardList