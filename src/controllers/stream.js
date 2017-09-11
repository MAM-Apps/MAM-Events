const https = require('https');

exports.post = (options, callback) => {
  const req = https.request(options, (res) => {
    let output = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      const obj = JSON.parse(output);
      callback(res.statusCode, obj);
    });
  });

  req.end();

  rest.getJSON(options, (statusCode, result) => {
    console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
    res.statusCode = statusCode;
    res.send(result);
  });
};
