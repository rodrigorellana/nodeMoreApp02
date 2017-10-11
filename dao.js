var oauth = require('oauth');
var sha1 = require('./lib/sha1');
var config = require('./config');

var client = prepareClient(config);
var destiny = config.endpoint + '/customers/' + cumtomerID + '/users';
var body = { emailAddress: 'testFromAPI@gmail.com' };
var post_body = JSON.stringify(body);
var post_content_type = 'application/json';

module.exports = function (client) {
    client.get(destiny, null, null, function (error, data, res) {
        if (res) {
            console.log("The response status is: " + res.statusCode);
        }
        if (error) {
            console.log("Something went wrong please check the credentials and the API endpoint");
            return;
        }
    
        var customers = JSON.parse(data);
        console.log("The data are:");
        console.log(customers);
    });
    
    
    client.post(destiny, null, null, post_body, post_content_type, function (error, data, res) {
        if (res) {
            console.log("The response status is: " + res.statusCode);
        }
        if (error) {
            console.log(error);
            return;
        }
  
        console.log("The data are:");
        console.log(data);
    });
    
    function prepareClient(config) {
        var hash = makeHash(config.salt, config.password);
        return new oauth.OAuth(null, null, config.consumerKey, hash, '1.0', null, 'HMAC-SHA1');
    }
    
    function makeHash(salt, secret) {
        return sha1.hex_sha1(
            salt.substr(0, Math.ceil(salt.length / 2)) +
            secret +
            salt.substr(Math.ceil(salt.length / 2))
        );
    }
}


