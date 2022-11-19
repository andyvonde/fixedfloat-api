<p align="center">
  <img src="https://i.imgur.com/XBHyUzk.png" width="150"/>
  <h1 align="center">FixedFloat API - Javascript</h1>
  <p align="center">
    <br>FixedFloat API - Javascript (unofficial)
    <br><a href="https://fixedfloat.com/?ref=a7u3rzvc">Get API Key</a> | <a href="https://fixedfloat.com/api">Docs</a> | <a href="https://fixedfloat.com/">Website</a> | <a href="https://fixedfloat.com/faq">FAQ</a>
  </p>
</p>

## _Description_

The FixedFloat API allows you to automate the receipt of information about the exchange rates of currencies, created orders, presented on the FixedFloat service, create orders and manage them using it

API Documentation: https://fixedfloat.com/api

Get your API KEY: https://fixedfloat.com/?ref=a7u3rzvc

## _Installation_

Method 1 :

```bash
git clone https://github.com/andyvonde/fixedfloat-api.git
npm install
```

Method 2 :

Download the folder, extract and run :

```bash
npm install
```

## _Usage_

```javascript
const FixedFloat = require("./FixedFloat.js");
let fixedfloat_api = new FixedFloat("API_KEY", "SECRET_KEY");
```

## _Methods_

| Method                                                                                                                                                   | Description                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [.getCurrencies()](#getcurrencies)                                                                                                                       | Get list of all currencies         |
| [.getPrice(fromCurrency, toCurrency, fromQty, toQty, type)](#getpricefromcurrency-tocurrency-fromqty-toqty-type)                                         | Informations about a currency pair |
| [.getOrder(id, token)](#getorderid-token)                                                                                                                | informations about an order        |
| [.setEmergency(id, token, choice, address)](#setemergencyid-token-choice-address)                                                                        | Emergency action choice            |
| [.createOrder(fromCurrency, toCurrency, toAddress, fromQty, toQty, type, extra)](#createorderfromcurrency-tocurrency-toaddress-fromqty-toqty-type-extra) | Create exchange order              |

> ### .getCurrencies()

Getting a list of all currencies that are available on FixedFloat.com

[Official documentation](https://fixedfloat.com/api#method_getCurrencies)

```javascript
let response = fixedfloat_api.getCurrencies();
```

> ### .getPrice(fromCurrency, toCurrency, fromQty, toQty, type)

Information about a currency pair with a set amount of funds.

[Official documentation](https://fixedfloat.com/api#method_getPrice)

```javascript
// Fixed
response = fixedfloat_api.getPrice("USDCBSC", "BTC", 25.0, (type = "fixed"));

// Float
response = fixedfloat_api.getPrice("USDCBSC", "BTC", 25.0);
```

> ### .getOrder(id, token)

Receiving information about the order.

[Official documentation](https://fixedfloat.com/api#method_getOrder)

```javascript
response = fixedfloat_api.getOrder("ID", "TOKEN");
```

> ### .setEmergency(id, token, choice, address)

Emergency action choice.

[Official documentation](https://fixedfloat.com/api#method_setEmergency)

```javascript
// Exchange
response = fixedfloat_api.setEmergency("ID", "TOKEN", "EXCHANGE");

// Refund
response = fixedfloat_api.setEmergency("ID", "TOKEN", "REFUND", "ADDRESS");
```

> ### .createOrder(fromCurrency, toCurrency, toAddress, fromQty, toQty, type, extra)

Creating exchange order.

[Official documentation](https://fixedfloat.com/api#method_createOrder)

```javascript
// Fixed
response = fixedfloat_api.createOrder(
  "USDCBSC",
  "BTC",
  "ADDRESS",
  25.0,
  (type = "fixed")
);

// Float
response = fixedfloat_api.createOrder("USDCBSC", "BTC", "ADDRESS", 25.0);
```

## _Example_

```javascript
const API_KEY = "YOUR_API_KEY_HERE";
const SECRET_KEY = "YOUR_SECRET_KEY_HERE";

const FixedFloat = require("./FixedFloat.js");
let fixedfloat_api = new FixedFloat(API_KEY, SECRET_KEY);

let allCurrencies = fixedfloat_api.getCurrencies();
console.log("All currencies :", allCurrencies);

let ethBtcPrice = fixedfloat_api.getPrice("ETH", "BTC", "0.001", "0.001");
console.log("Eth/Btc Price :", ethBtcPrice);

let order = fixedfloat_api.getOrder("ID", "TOKEN");
console.log("Order :", order);

let fixedOrderCreated = fixedfloat_api.createOrder(
  "USDCBSC",
  "BTC",
  "ADDRESS",
  25.0,
  (type = "fixed")
);

console.log("Order created :", fixedOrderCreated);

let FloatOrderCreated = fixedfloat_api.createOrder(
  "USDCBSC",
  "BTC",
  "ADDRESS",
  25.0
);

console.log("Order created :", FloatOrderCreated);
```

## _License_

fixedfloat_api is Licensed under the [MIT License](https://github.com/andyvonde/fixedfloat-api/blob/main/LICENSE)
