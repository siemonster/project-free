require('core-os');

var reCAPTCHA=require('recaptcha2');

recaptcha=new reCAPTCHA({
    siteKey:'6LdCtggUAAAAAALmWtTYZhJ63QM_gSu9dgY3PPxo',
    secretKey:'6LdCtggUAAAAACxjGzl9lGsqKhajD4_FqCpTVoFz'
});

classes.Captcha = {
    resetPasswordDeny: function() {
        var request = CatchRequest(Auth_ResetPasswordForbidRq);

        return function(success, fail) {

            recaptcha.validate(request.data[0]["g-recaptcha-response"])
                .then(function(){
                    // validated and secure
                    fail();
                })
                .catch(function(errorCodes){
                    // invalid
                    success( {message: recaptcha.translateErrors(errorCodes) });
                });
        }


    }

};