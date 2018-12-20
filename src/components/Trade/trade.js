import React from 'react';




class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: '',
            price: '',
            type: 'BUY',
            userid: this.props.userid
        }
        this.onTypeChange = this.onTypeChange.bind(this);

    };


    onQtyChange = (event) => {
        this.setState({ qty: event.target.value })
    }


    onPriceChange = (event) => {
        this.setState({ price: event.target.value })
    }

    onTypeChange = (event) => {
        this.setState({ type: event.target.value })
    }

    onSubmitTrade = () => {
        fetch('http://localhost:3001/trade', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ticker: this.props.clickTicker,
                qty: this.state.qty,
                price: this.state.price,
                type: this.state.type,
                userid: this.state.userid
            })
        })
            .then(response => response.json())
            .then(jsonData => console.log(jsonData))
            .catch(err => console.log(err))
            ;
        
    }

    render() {
        return (
            <article className="br3 ba dark-gray bg-light-gray b--black-10 mv4 w-100 pa2 mw8 shadow-3 center" >
                <main className="pa4 black-80">
                    <div className="measure" >
                        <fieldset id="trade" className="ba b--transparent ph0 mh2 pa4">
                            <legend className="f1 fw6 ph0 mh0">Trade</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="ticker">Player Symbol</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="ticker"
                                    id="ticker"
                                    onChange={this.props.handleInput}
                                    value={this.props.clickTicker}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="qty">Shares</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="qty"
                                    id="qty"
                                    onChange={this.onQtyChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="price">Price</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="price"
                                    name="price"
                                    id="price"
                                    onChange={this.onPriceChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="type">Order Type</label>
                                <select
                                
                                    type="text"
                                    name="type"
                                    id="type"
                                    onChange={this.onTypeChange}
                                    value={this.state.type}>
                                    
                                    <option value="BUY">Buy</option>
                                    <option value="SELL">Sell</option>
                                
                                </select>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitTrade}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Buy/Sell"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}


export default Trade

/*
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="type"
                                    id="type"
                                    onChange={this.onTypeChange}
                                />
*/