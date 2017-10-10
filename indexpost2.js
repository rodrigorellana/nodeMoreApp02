var oauth = require('oauth');
var sha1 = require('./lib/sha1');

//Load the config
var config = require('./config');
const customer = require('./customer'); 

var cumtomerID = "24594";

//Prepare the client taht is a OAuth object
var client = prepareClient(config);
//Legible url:
var destiny = config.endpoint + '/customers/' + cumtomerID + '/users';

var body = { emailAddress : 'testFromAPI@gmail.com'};
var post_body = JSON.stringify(body); 
var post_content_type = 'application/json';
client.post(destiny, null, null, post_body, post_content_type, function (error, data, res) {
  if (res) {
    console.log("The response status is: " + res.statusCode);
  }
  if (error) {    
    console.log(error);
    return;
  }

  //Print the result
//   var customers = JSON.parse(data);
  console.log("The data are:");
  console.log(data);

  // customers.forEach(function(customer) {
  //   console.log(customer);
  // });
});


function prepareClient(config) {
  var hash = makeHash(config.salt, config.password);
  return new oauth.OAuth(null, null, config.consumerKey, hash, '1.0', null, 'HMAC-SHA1');
}

//Function to salt the password and hash the password using a SHA-1
function makeHash(salt, secret) {
  return sha1.hex_sha1(
      salt.substr(0, Math.ceil(salt.length / 2)) +
      secret +
      salt.substr(Math.ceil(salt.length / 2))
  );
}
