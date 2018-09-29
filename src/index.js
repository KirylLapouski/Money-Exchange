// PLEASE DON'T change function name
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
module.exports = function makeExchange(currency) {
   return  compose(
        checkToRich,
        pennies,
        nickels,
        dimes,
        quarters,
        halfDollars,
        checkNegative
    )(currency)
}
function halfDollars(currency){
    let res = {}
    if(Math.floor(currency/50))
        res['H'] = Math.floor(currency/50)
    
    return [currency%50,res]
}

function quarters([currency,res]){
    let quarters = {}
    if(Math.floor(currency/25))
        quarters['Q'] = Math.floor(currency/25)

    return [currency%25, {...res, ...quarters}]
}

function dimes([currency,res]){
    let dimes = {}
    if(Math.floor(currency/10))
        dimes['D'] = Math.floor(currency/10)

    return [currency%10, {...res, ...dimes}]
}


function nickels([currency,res]){
    let nickels = {}
    if(Math.floor(currency/5))
        nickels['N'] = Math.floor(currency/5)

    return [currency%5, {...res, ...nickels}]
}

function pennies([currency,res]){
    let nickels = {}
    if(Math.floor(currency/1))
        nickels['P'] = Math.floor(currency/1)

    return [currency%1, {...res, ...nickels}]
}

function checkToRich([currency,res]){
    if(res.H >= 200)
        return {error: "You are rich, my friend! We don't have so much coins for exchange"}
    return res
}
function checkNegative(currency){
    if(currency<0)
        return 0
    return currency
}