import React, { Component } from 'react';
import CardList from './CardList';
import CardListSimmed from './CardListSim';
import SearchBox from './SearchBox';
import Navigation from './components/Navigation/navigation';
import './app.css';
// import Particles from 'react-particles-js';
import Register from './components/Register/register';
import BasicTrade from './components/Trade/basicTrade';
import SideMenu from './components/SideNav/SideNav';
import SignIn from './components/Trade/basicSignIn';
import ProgressBar from './components/progressMeter/Meter';
import buttonsInstance from './components/dropdown/button';
import { newPlayers as players } from './nba';
import styled from 'styled-components';
import { chosenPlayerCount, progressedArray, progressPeriods, compilePlayerPeriods, average, standardDeviation, stdDevRange } from './results';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import options from './components/dropdown/options';
import StatDisplay from './simulations/statsResults.js';
import InputVariables from './simulations/simInputs';
import BoardsUsers from './simulations/boardsUsers.js';
import { simContainer as playerContainer } from './simulations/simulation3.js'

const defaultOption = options[0]
// const particlesOptions = {
//     particles: {
//         number: {
//             value: 30,
//             density: {
//                 enable: false,
//                 value_area: 800
//             }
//         }
//     }
// }



const SideBarStyle = styled.div`
    font-size: 3em
`;
fetch('api.namefake.com/unitedstates-unitedstates/male/', )

let periodFilteredArray = [];
let simmedPlayersArray = [playerContainer];
let periodStatisticsCompiler = [];

const containerStyle = {
    backgroundImage: 'linear-gradient(271deg, #48B9C2, #51D0B5)',
    // boxShadow: '0 2px 2px 0',
}

const initialState = {
    players: players,
    searchfield: '',
    route: 'signin',
    isSignedIn: true,
    ticker: '', //flip this switch for login
    user: {
        id: '',
        email: '',
        firstname: '',
        lastname: '',
        joined: '',
        balance: ''
    },
    selectedCard: {
        selectedTicker: '',
        selectedPrice: '',
    },
    simulationData: {
        currentPeriod: '',
        simPlayers: simmedPlayersArray,
        simStats: {
            age: 0
        }
    },
    selected: '',
    progressionClicks: 0

}


class App extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.updatePlayerData = this.updatePlayerData.bind(this);
        this.loadPrices = this.loadPrices.bind(this);
        this.setPrices = this.setPrices.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }



    componentDidMount() {
        this.timerID = setInterval(
            () => this.setPrices(),
            1000
        );
        this.updatePlayers(players);

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updatePlayers = (arr) => {
        this.setState({
            players: arr
        })
    }

    progressClickCounter = () => {
        let prevClick = this.state.progressionClicks + 1;
        this.setState({
            progressionClicks: prevClick
        })
    }

    handleClick = (e, obj) => {
        const targetTicker = obj.ticker;
        const targetPrice = obj.price;
        this.setState({
            selectedCard: {
                selectedTicker: targetTicker,
                selectedPrice: targetPrice
            }
        })
        console.log(this.state.selectedCard)

        console.log(targetPrice, targetTicker);
    }


    loadPrices = (ticker) => {
        fetch('http://localhost:3001/priceFetch', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ticker: ticker
            })
        })
            .then(response => response.json())
            .then(myJson => {
                let playerIndex = players.findIndex((obj => obj.ticker === ticker));
                players[playerIndex].price = myJson;
                this.setState({
                    players: players
                })
            })
            .catch(err => {
                console.log(err)
                return 'No price data.'
            })
    };

    setPrices = () => {
        players.forEach(player => {
            const playerPrice = this.loadPrices(player.ticker);
            return player.price = playerPrice;
        })
    };

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                joined: data.joined,
                balance: data.balance
            }
        })
    }

    periodDataToRender = (period) => {
        let periodData = [simmedPlayersArray[period - 1]];
        let statContainer = [];

        periodData.forEach(thisPeriod => {
            thisPeriod.forEach(player => {
                console.log(player)
                statContainer.push(player[0].age);
            })
        })

        console.log(statContainer);
        this.setState({
            simulationData: {
                simPlayers: periodData
            }
        })
        console.log(this.state)
    }

    _onSelect = (option) => {
        console.log('You selected ', option.label)
        this.setState({ selected: option })
        this.periodDataToRender(option.value);

    }


    updatePlayerData = (dbData) => {
        console.log(dbData);
    }

    progressOnePeriod = () => {
        let priorPeriod = simmedPlayersArray.length - 1

        let statsCompiler = [];

        let stdCompiler = [];

        let progressCompiler = [];

        simmedPlayersArray[priorPeriod].forEach(player => {
            let progressionReturn = progressedArray(player);
            progressCompiler.push(progressionReturn);

        })

        simmedPlayersArray.push(progressCompiler);

        progressCompiler.forEach(player => {
            statsCompiler.push(player[0].age)
        })

        //Stat Compilers
        console.log(statsCompiler);
        // let stdAge = standardDeviation(statsCompiler[0]);
        // let avgAge = average(statsCompiler[0]);


        this.progressClickCounter();

        this.setState({
            simulationData: {
                simPlayers: simmedPlayersArray,
            }
        })
        console.log(this.state);
    }



    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });
    }





    render() {
        const filteredPlayers = this.state.players.filter(player => {
            return player.fullName.toLowerCase().includes(this.state.searchfield.toLowerCase());

        })


        return (
            <div className="app">
                {/* <Particles className='particles' params={particlesOptions} /> */}



                {this.state.route === 'home'
                    ?


                    <div className="fl w-100 bg-light-gray">
                        <div className="pl4">
                            <div className="fl w-100 pa2">
                                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
                            </div>

                            <div className="fl w-100">

                                <div className="flex-wrap fl w-70 border-box ph1-ns shadow-3" style={containerStyle}>
                                    <div className="pt2">
                                        <SearchBox searchChange={this.onSearchChange} className="shadow-3 v-mid" />
                                    </div>

                                    <div className="">
                                        <CardList
                                            players={filteredPlayers}
                                            handleClick={this.handleClick}
                                            refreshData={this.updatePlayerData}
                                            setPrices={this.setPrices}

                                        />
                                    </div>
                                    {/* <div className="">

                                            <SideMenu />

                                        </div> */}

                                </div>
                                <div className="fl w-20 center" >
                                    <div className="tradesticky">
                                        <BasicTrade
                                            userid={this.state.user.id}
                                            handleTickerChange={this.handleTickerChange}
                                            handlePriceChange={this.handlePriceChange}
                                            handleShareChange={this.handleShareChange}
                                            handleOrderChange={this.handleOrderChange}
                                            tradeTicket={this.getTradeTicket}
                                            players={players}
                                            clickedCard={this.handleClick}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    : (
                        this.state.route === 'signin'
                            ?
                            <div className="">
                                <header className='navbar w-100 fixed'>
                                    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
                                </header>
                                <SignIn loadUser={this.loadUser} loadAcctBalance={this.loadAcctBalance} onRouteChange={this.onRouteChange} />

                            </div>
                            :
                            this.state.route === 'simulation' ? (
                                <div>                                        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" periodsAvailable={simmedPlayersArray.length} />

                                    <InputVariables />

                                    <button onClick={this.progressOnePeriod}>Progress Period </button>


                                    <StatDisplay selected={this.state.selected}

                                        renderedPlayers={this.state.simulationData.simPlayers}
                                    />

                                    <CardListSimmed data={this.state.simulationData.simPlayers}
                                        playerCount={chosenPlayerCount}
                                        periodSelected={this.state.selected}
                                        unmountPeriod={this.unmountPeriod}
                                    />



                                </div>)

                                :
                                this.state.route === 'userSim' ? (
                                    <BoardsUsers />
                                ) :
                                    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    )
                }

            </div>)
    };
};


export default App;


    //     const dataToFilter = playerContainer;

    //     const filterFunction = () => {
    //         dataToFilter.forEach(subItem => {

    //             subItem.forEach(playerPeriod => {
    //                 if (playerPeriod.simPeriod == option.value)
    //             {

    //                     periodFilteredArray.push([playerPeriod]);    
    //             }
    //         })
    //     })
    // }

        //     //Selected option.value = 2
        // //Filter the array based on this

        // filterFunction();
        // this.setSimPlayersState(periodFilteredArray);

        // //When it sets state, call a function that filters the player array 
        // console.log(option, periodFilteredArray);