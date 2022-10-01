const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');




fetchMyIP((error, returnedIp) => {

  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  // console.log('It worked! Returned IP:', returnedIp);

  fetchCoordsByIP(returnedIp, (error, returnedCoordinates) => {
    // console.log("returned coordinates: ", returnedCoordinates);

    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    // console.log('It worked! Returned coordinates:', returnedCoordinates);

    

    
    fetchISSFlyOverTimes(returnedCoordinates.latitude, returnedCoordinates.longitude, (error, passTimes) => {

      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      // console.log('It worked! Returned flyover times:', passTimes);

    
    
      nextISSTimesForMyLocation(passTimes)
    
    
    
    
    
    });


  });


});







const nextISSTimesForMyLocation = function (passTimes) {

for (item of passTimes) {

 passOverDate = new Date(item.risetime * 1000);
  
 console.log(`Next pass at ${passOverDate} for ${item.duration} seconds!`)


}



}

