const request = require('request');

if(!process.env.MSA_SKEY || !process.env.MSA_URL || !process.env.SITE_NAME || !process.env.SITE_REF_NAME) {
    console.log('You have to specify site name, MSA secret key and url for requesting db init.');
    return;
}

request.post(
    { url: process.env.MSA_URL, json: true, form: { key: process.env.MSA_SKEY, sitename: process.env.SITE_NAME, refname: process.env.SITE_REF_NAME } }
    , function (err, res, body) {
        console.log("Error:" + err);
        console.log("Body:"  + JSON.stringify(res.body));
    }
);