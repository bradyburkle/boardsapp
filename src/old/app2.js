class App extends React.Component {

render() {
    return(
        <div className="flex flex-wrap"> //Top level, everything
            
            <div className="fl w-20 pa2"> //Left bar to handle menu and expand 
                <SideMenu />
            </div>

            <div className="fl w-80 pa2"> //Right side for all non-menu content
                
                <div className="fl w-100 pa2"> //Container for top nav bar
                    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
                </div>

                <div className="fl w-100 pa2"> //All non nav bar content container
                
                    <div className="fl w-80 pa2"> //Main content area (player cards etc) 
                        <CardList
                            players={filteredPlayers}
                            handleClick={this.handleClick}
                            refreshData={this.updatePlayerData}
                            setPrices={this.setPrices}
                        />
                    </div>

                    <div className="fl w-20 pa2">
                    <div className="tradesticky"> // Right side container for trade app or whatever
                        <SearchBox searchChange={this.onSearchChange} />

                        <BasicTrade
                            userid={this.state.user.id}
                            handleClick={this.handleClick}
                            clickTicker={this.state.ticker}
                            handleChange={this.handleTickerInput}
                            refreshData={this.updatePlayerData}
                            loadPrices={this.loadPrices}
                            getPrices={this.getPrices}
                            players={players}

                        />
                        </div>
                    </div>

                </div>

                




            </div>
        </div>
    )
}

}