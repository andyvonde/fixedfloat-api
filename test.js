const FixedFloat = require("./FixedFloat.js");

const API_KEY = "";
const SECRET_KEY = "";

// Testing..

let fixedFloat = new FixedFloat(API_KEY, SECRET_KEY);

//console.log(fixedFloat.getCurrencies());

//console.log(fixedFloat.getPrice("ETH", "BTC", "0.001", "0.001"));

console.log(fixedFloat.getPrice("USDCBSC", "BTC", 25.0));
