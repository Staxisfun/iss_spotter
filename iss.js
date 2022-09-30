const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function (callback) {


  request('https://api.ipify.org?format=json', (error, response, body) => {


    if (error) {

      return callback(error, null);

    }

    if (response.statusCode !== 200) {

      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);

    }

    const ip = JSON.parse(body).ip;


    callback(null, ip);


  });

};



const fetchCoordsByIP = function(ip, callback) {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {


  if (error) {

    callback(error, null);
    
    return;
  }


  const coordInfo = JSON.parse(body);

  if (!coordInfo.success) {

    const message = `success status was ${coordInfo.success}. server message says: ${coordInfo.message} when fetching for IP ${coordInfo.ip}`;

    callback(Error(message), null)
    
    return;

  }
  
  const { latitude, longitude } = coordInfo;
  
  callback(null, {latitude, longitude});

});



};



















module.exports = { fetchCoordsByIP };