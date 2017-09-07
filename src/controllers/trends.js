const request = require('request');
exports.get = (cb) => {
  const options = {
    url: "https://api.twitter.com/1.1/trends/place.json?id=1",
    headers: {
      Authorization: 'OAuth oauth_consumer_key="yURhm5VsOTRNrX1IHIyvp6f75",oauth_token="70442620-bxmJnJBuqxuZtm4jacgCTN07MGrNlgzRjh9vlt0fx",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1504782519",oauth_nonce="nsIMKV",oauth_version="1.0",oauth_signature="LJU6WxnZtH1HWnM8ulFjrOngOlk%3D"'

    }
  }
  request.get(options, (err, response, body) => {
    if (err) {
      cb(err);
    }else {
      const parsedBody = JSON.parse(body);
    cb(null, parsedBody);
    }
  })

}
