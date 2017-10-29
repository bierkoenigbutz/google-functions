var fetch = require('node-fetch'); // Require 3rd party depedency → https://github.com/bitinn/node-fetch

/**
 * Main Google Cloud HTTP Function.
 * Takes in a request object and returns a response.
 *
 * Example (call from local Terminal.app or commandline application):
 *  $ curl https://<YOUR_REGION>-<YOUR_PROJECT_ID>.cloudfunctions.net/handleHTTPGetReq
 *
 * @param req - HTTP Request object
 * @param res - Our HTTP Response
 */
exports.handleHTTPGetReq = function(req, res) {
  /**
   * Fetch data from our google spreadsheet. fetch() returns a promise!
   * We use arrow functions inside the fetch call.
   * Arrow functions are just a fancy way to write a normal function.
   *
   * Example:
   *
   *  function(parameter) {
   *    do something with "parameter"
   *  }
   *
   *  is equal to
   *
   *  (paramter) => {
   *    do something with "parameter"
   *  }
   */

   // The url to fetch data from.
  const resourceURL = 'https://sheets.googleapis.com/v4/spreadsheets/1a96a6rcMGiqUaHFHst4v3_Edz7MSqLinZF6xjakAWlw/values/B2?key=AIzaSyCI3AzDBPXXwtfe-xF3J3S0318uiCSGwCI';

  // Make a get request.
  // This is asynchronous and generates a new "thread".
  // The "main" thread continues on line 53 and does nothing.
  // The "new" thread continues on line 43 where we handle our external GET request.

  fetch(resourceURL)
    // handle the response. In this case we want to convert our response to JSON
    .then((response) => {
      // response.json() returns a _new_ promise with the converted data.
      // We return this new promise so we can chain a ".then()" call onto it.
      return response.json();
    })
    // We have converted our response to json, do something with it!
    .then((json) => {

      // Google spreadsheet returns an object with the following keys:
      const range = json.range;
      const majorDimension = json.majorDimension;
      const values = json.values;

      // iterate over all values, since values is an array (rows?)
      values.forEach((row) => {
        // each row inside values is another array (cells?)
        row.forEach((cell) => {
          // console.log each cell
          console.log(cell);
        });
      });

      // Maybe we want a custom response. So we create a new object
      // with some example data.
      const customResponse = {
        ourMessage: 'You have successfully requested the spreadsheet!',
        spreadsheetData: json
      };

      // Finally respond to the google cloud functions http request with a response!
      // We set the http status code to 200, which means "success" and send our customResponse back.
      res.status(200).send(customResponse);
    });
};