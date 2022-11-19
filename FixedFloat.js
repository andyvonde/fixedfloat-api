const fetch = require("sync-fetch");
const crypto = require("crypto");

module.exports = class FixedFloat {
  constructor(API_KEY, SECRET_KEY) {
    this._API_KEY = API_KEY;
    this._SECRET_KEY = SECRET_KEY;
    this._MAIN_URL = "https://fixedfloat.com/api/v1/";
  }

  _sendRequest(reqMethod = null, apiMethod = null, body = "") {
    var headers, r;

    if (reqMethod && apiMethod) {
      headers = {
        "X-API-KEY": this._API_KEY,
        "X-API-SIGN": crypto
          .createHmac("sha256", this._SECRET_KEY)
          .update(body)
          .digest("hex"),
        "Content-Type": "application/x-www-form-urlencoded",
      };

      if (reqMethod === "GET") {
        r = fetch(this._MAIN_URL + apiMethod + "?" + body, {
          headers: headers,
        });
      } else {
        if (reqMethod === "POST" && body !== "") {
          r = fetch(this._MAIN_URL + apiMethod, {
            headers: headers,
            body: body,
            method: "POST",
          });
        } else {
          return null;
        }
      }

      if (r.status === 200) {
        return r.json();
      } else {
        return null;
      }
    }
  }

  getCurrencies() {
    /*  Getting a list of all currencies that are available on FixedFloat.com  */
    return this._sendRequest("GET", "getCurrencies");
  }

  getPrice(fromCurrency, toCurrency, fromQty, toQty = 0.0, type = "float") {
    /*  Information about a currency pair with a set amount of funds  */
    var body;
    let params = {
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      fromQty: Number.parseFloat(fromQty),
      toQty: Number.parseFloat(toQty),
      type: type,
    };

    body = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    return this._sendRequest("POST", "getPrice", body);
  }

  getOrder(id, token) {
    /*  Receiving information about the order  */
    var body;
    let params = {
      id: id,
      token: token,
    };

    body = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    return this._sendRequest("GET", "getOrder", body);
  }

  setEmergency(id, token, choice, address = "") {
    /*  Emergency Action Choice  */
    var body;

    let params = {
      id: id,
      token: token,
      choice: choice,
      address: address,
    };

    body = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    return this._sendRequest("GET", "setEmergency", body);
  }

  createOrder(
    fromCurrency,
    toCurrency,
    toAddress,
    fromQty,
    toQty = 0.0,
    type = "float",
    extra = ""
  ) {
    /*  Creating exchange orders  */
    var body;
    let params = {
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      fromQty: Number.parseFloat(fromQty),
      toQty: Number.parseFloat(toQty),
      toAddress: toAddress,
      extra: extra,
      type: type,
    };

    body = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    return this._sendRequest("POST", "createOrder", body);
  }
};
