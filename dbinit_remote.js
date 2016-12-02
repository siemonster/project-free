const request = require('request');

if(!process.env.MSA_SKEY || !process.env.MSA_URL || !process.env.SITE_NAME || !process.env.SITE_REF_NAME || !process.env.SITE_DNAME) {
    console.log('You have to specify site name, MSA secret key and url for requesting db init.');
    return;
}

request.post(
    {
          url : process.env.MSA_URL + '/api/admin/site_clone'
        , json: true
        , body: { api_key: process.env.MSA_SKEY, sitename: process.env.SITE_NAME, refname: process.env.SITE_REF_NAME, dname: process.env.SITE_DNAME }
    }
    , function (err, res, body) {
        console.log("Error:" + err);
        console.log("Body:"  + JSON.stringify(res.body));
    }
);