import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setPrices } from '../../players';


const TradeSchema = Yup.object().shape({
    ticker: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    qty: Yup.number()
        .required('Required'),
    price: Yup.string()
        .required('Required'),
    type: Yup.string()
        .required('Required'),
});

let summaryInfo = [];
//Start will '' value for ticker
//Clicking a player card will update the tickerChoice
//Typing into the box will overwrite the tickerChoice
//Clicking again will update the tickerChoice



class BasicTrade extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tradeTicket: {
                ticker: '',
                qty: '',
                price: '',
                type: ''
            }
        };
        this.handleShareChange = this.handleShareChange.bind(this);
        this.handleTickerChange = this.handleTickerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.getTradeTicket = this.getTradeTicket.bind(this);
        

    }

    overwriteForm = (obj) => {
        
    }

    getTradeTicket = () => {
        return this.state.tradeTicket;
    }


    handleTickerChange = (e) => {
        console.log(e.target.value);
        this.setState({
            tradeTicket: {
                ticker: e.target.value
            }
        });
    }

    handleShareChange = (e) => {
        console.log(e.target.value);
        this.setState({
            tradeTicket: {
                qty: e.target.value
            }
        })
        console.log(this.state.tradeTicket);
    }

    handlePriceChange = (e) => {
        console.log(e.target.value);
        this.setState({
            tradeTicket: {
                price: e.target.value
            }
        })
    }

    handleOrderChange = (e) => {
        console.log(e.target.value);
        this.setState({
            tradeTicket: {
                type: e.target.value
            }
        })
    }


    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.tradeTicket);
    }
    render(){ 
        
        return (

        <article className="br3 ba dark-gray bg-light-gray b--black-10 mv4 w-100 pa2 mw8 shadow-3 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="trade" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0 tc">Your Trade Ticket</legend>
                        <div className="mt3">
                
                            <Formik
                                enableReinitialize="false"
                                initialValues={{
                                    ticker: this.state.tradeTicket.ticker,
                                    qty: this.state.tradeTicket.qty,
                                    price: this.state.tradeTicket.price,
                                    type: this.state.tradeTicket.type,
                                    userid: this.props.userid
                                }}
                                // validationSchema={TradeSchema}
                                onSubmit={(values, bag) => {
                                    // same shape as initial values
                                    console.log(values);
                                    fetch('http://localhost:3001/trade', {
                                        method: 'post',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                                ticker: values.ticker,
                                                qty: values.qty,
                                                price: values.price,
                                                type: values.type,
                                                userid: values.userid
                                        })
                                    })
                                        .then(response => {
                                            response.json();
                                        })                                       
                                       .catch(err => console.log(err))
                                }}
                                    render={({ props, errors, touched }) => <Form>
                                        <label className="db fw6 lh-copy f6" htmlFor="ticker">{props}</label>
                                        <Field name="ticker" type="text" className="db fw6 lh-copy f6 mb3" value={this.state.tradeTicket.ticker} onChange={this.handleTickerChange}
                                        /> 

                                        {errors.ticker && touched.ticker ?
                                            <div className="db fw6 lh-copy f7 mb3 red">{errors.ticker}</div> : null}

                                        <label className="db fw6 lh-copy f6" htmlFor="qty">Shares</label>
                                        <Field name="qty" className="db fw6 lh-copy f6 mb3" type="number" />

                                        {errors.qty && touched.qty ? (
                                            <div className="db fw6 lh-copy f7 red">{errors.qty}</div>
                                        ) : null}

                                        <label className="db fw6 lh-copy f6" htmlFor="price">Price</label>
                                        <Field name="price" className="db fw6 lh-copy f6 mb3" type="number" />

                                        {errors.price && touched.price ? (
                                            <div className="db fw6 lh-copy f7 red">{errors.price}</div>
                                        ) : null}

                                        <label className="db fw6 lh-copy f6" htmlFor="type">Order Type</label>
                                        <Field name="type" className="db fw6 lh-copy f6 mb3" type="text" />

                                        {errors.type && touched.type ? (
                                            <div className="db fw6 lh-copy f7 red">{errors.type}</div>
                                        ) : null}


                                        <button type="submit">Submit Trade!</button>
                                        <ul>
                                            <li>Price x {}.00</li>
                                            <li>Shares x {summaryInfo.qty}</li>
                                        </ul>
                                    </Form>}
                            >
                            </Formik>
                        </div>
                    </fieldset>
                </div>
            </main>
        </article>
    )};
} 

export default BasicTrade;