import React, { Component } from 'react';
import CardList from '../CardList';
import SearchBox from '../SearchBox';
import Navigation from '../components/Navigation/navigation';
import './app.css';
// import Particles from 'react-particles-js';
import Register from '../components/Register/register';
import BasicTrade from '../components/Trade/basicTrade';
import SideMenu from '../components/SideNav/SideNav';
import SignIn from '../components/Trade/basicSignIn';
import ProgressBar from '../components/progressMeter/Meter';
import {newPlayers as players} from '../nba';


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
            }
            
        }


class App extends Component {
    constructor(){
        super()
        this.state = initialState;
        this.handleClick = this.handleClick.bind(this);   
        this.handleTickerInput = this.handleTickerInput.bind(this);
        this.updatePlayerData = this.updatePlayerData.bind(this);
        this.loadPrices = this.loadPrices.bind(this);
        this.setPrices = this.setPrices.bind(this);
        // this.queryNba = this.queryNba.bind(this);
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.setPrices(),
            1000
        );
        this.updatePlayers(players);
        
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    updatePlayers = (arr) => {
        this.setState({
            players: arr
        })
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
        this.setState({user: {
            id: data.id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            joined: data.joined,
            balance: data.balance
        }})
    }

    handleClick = (e) => {
        let targetId = e.target.id;
        console.log(targetId);
        this.setState({
            ticker: targetId
        })
    }

    updatePlayerData = (dbData) => {
        console.log(dbData);

        // this.setState({
        //     players: dbData
        // })
    }
       
    handleTickerInput = (e) => {
        console.log(e.target.value);
        this.setState({
            ticker: e.target.value
        })
    }

    onSearchChange = (event) => {
            this.setState({ searchfield : event.target.value });
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });
    }

        render(){
            const filteredPlayers = this.state.players.filter(player => {
                return player.fullName.toLowerCase().includes(this.state.searchfield.toLowerCase());
            })

            

            return (
                <div className="app">
                    {/* <Particles className='particles' params={particlesOptions} /> */}
                    
                    <header className='navbar w-100 fixed'>

                    </header>

                    { this.state.route === 'home' 
                        ? 
                        <div>
                            <section className="w-100 center bg-light-gray">
                                <h1 className="tc black f2"> The Boards Marketplace </h1>
                                <ProgressBar />
                                <h2 className="tc black f4"> Welcome {`${this.state.user.firstname}`} </h2>
                                <h3 className="tc black f4"> Your account balance is: ${`${this.state.user.balance}`}</h3>
                            </section>

                            <div className="flex">

                                <div className="fl w-20">
                                    
                                </div>

                                <div className="fl w-75">

                                </div>

                                <div className="fl w-40 pr6">    
                                    <div className="tradesticky">

                                            
                                    </div>
                                </div>

                            </div>
                        </div>
                        : ( 
                            this.state.route === 'signin' 
                            ?  
                            <div className="pt5">
                                <SignIn loadUser={this.loadUser} loadAcctBalance={this.loadAcctBalance} onRouteChange={this.onRouteChange} />
                            </div>
                            : 
                            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        )
                    }
                
                </div> )
                };
            };


export default App;
