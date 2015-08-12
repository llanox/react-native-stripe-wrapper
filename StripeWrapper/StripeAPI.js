/**
 * Created by Gabriel on 15-07-15.
 **/

"use strict";

var superagent = require('superagent');
var base64 = require('base-64');
var utf8 = require('utf8');


module.exports = function (stripe_url, secret_key) {
    var module = {};




    module.createCardToken = function (cardNumber , expMonth ,expYear , cvc , callback ) {
      
           
        var bytes = utf8.encode(secret_key+':');
        var encodedSecretKey = base64.encode(bytes); 

         try {

                    superagent
                    .post(stripe_url+'tokens')
                    .set('Accept', '*/*')
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Authorization', 'Basic '+encodedSecretKey)
                    .send('card'+'[number]='+cardNumber)
                    .send('card'+'[exp_month]='+expMonth)
                    .send('card'+'[exp_year]='+expYear)
                    .send('card'+'[cvc]='+cvc)
                    .end(function(err, res){

                                if (err) {
                                    if (! error.response) {
                                        res = {
                                            ok: false,
                                            body: { errors: { default: 'Server connection error' }}
                                        }
                                    } else {
                                        res = error.response;
                                       
                                    }
                                } else if(!res.ok){

                                     res = {
                                            ok: false,
                                            body: JSON.parse(res.text)
                                     }

                                }else{

                                    res = {
                                            ok: true,
                                            body: JSON.parse(res.text)
                                     }
 
                                }
                                
                               
                                callback && callback(res);

                      }
                     );  

         } catch (e) {
            var error = {ok: false, unauthorized: false, exception: e};
            callback && callback(error);
        } 

             
    };

        module.createCardTokenTest = function (request, cardNumber , expMonth ,expYear , cvc , callback ) {
      
           
        var bytes = utf8.encode(secret_key+':');
        var encodedSecretKey = base64.encode(bytes); 

         try {

                    request
                    .post(stripe_url+'tokens')
                    .set('Accept', '*/*')
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Authorization', 'Basic '+encodedSecretKey)
                    .send('card'+'[number]='+cardNumber)
                    .send('card'+'[exp_month]='+expMonth)
                    .send('card'+'[exp_year]='+expYear)
                    .send('card'+'[cvc]='+cvc)
                    .end(callback);  

         } catch (e) {
            var error = {ok: false, unauthorized: false, exception: e};
            callback && callback(error);
        } 

             
    };


     module.testResult = function (data) {

        return data;
     };

   

    return module;
};







