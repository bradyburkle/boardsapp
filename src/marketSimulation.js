
let marketplace = [];
let boardsLedger = [];

let addPlayersToBoardsLedger = (playerNum, shareAmt, startPrice) => {
    for (let i = 0; playerNum > i; i++) {
        let playerToLedger = {
            id: i,
            shares: shareAmt,
            startPrice: startPrice
        };
        boardsLedger.push(playerToLedger);
    }
    console.log(boardsLedger);
}





let createMarketParticipants = (n, min, max) => {
    let i = 0;

    for (i; n > i; i++) {
        let thisUser = {
            userid: i,
            accountBal: randomizeBalance(min, max)
        }
        marketplace.push(thisUser);
    }
    //create a user object an loop for n times
    //increment userid
    //assign random account balance between the two parameters
    console.log(marketplace);
}

let randomizeBalance = (lowBal, highBal) => {
    return Math.floor(Math.random() * (highBal - lowBal)) + lowBal;
}

let userPreference = () => {
    riskPreference: '',




}

createMarketParticipants(5, 100, 5000);
addPlayersToBoardsLedger(100, 1000, 1);






/*
Total Allocation: $100,000
Number of days?
Days per period?
Periods per Year?
Total Simulated Years?



Player Performance for a period:
    Performance "pie" of 1
    Pie is distributed based on tiering of total athletes
        5% Superstar
        10% All-Star (15%)
        20% Quality Performer (35%)
        30% Average Performer (65%)
        20% Below Average Performer (85%)
        15% Poor or No performance (100%)

    Creating Potential as a function of age:
        Create age ranges:
            1-2 Years -- Rookie Level
            3-5 Years -- Entering Prime Level
            6-9 Years -- Prime Level
            10-13 Years -- Early Decline
            13+ -- Decline / Retirement

        Player "Age":
            Min Age:19
            Max Age:38

            % of Total Players in each age range:
                18-21: 15% 
                22-26: 40%
                27-30: 25%
                31-35: 15%
                35+ : 5%


            For total players create x% of them within each age range
            Randomize the "age" by routing the random number
            Assign that age to the player



        Years Remaining = Simulation RangeYears - Years in League
        Potential  Years Remaining/Periods



Total Allocation * Players Score during Current Period


Create something that assigns a portion of 100% to a player based on their skill type
    -- Create a "Score" for the period with variance/randomness
    -- The score should add up to 1 (or some whole number variation)



*/

