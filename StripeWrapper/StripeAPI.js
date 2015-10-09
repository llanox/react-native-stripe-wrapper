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
                                    if (!err.response) {
                                        res = {
                                            ok: false,
                                            body: { errors: { default: 'Server connection error' }}
                                        }
                                    } else {
                                        res = err.response;
                                       
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
                                
                                console.log('response ',res.text);                               
                                callback && callback(res);

                      }
                     );  

         } catch (e) {
            var error = {ok: false, unauthorized: false, exception: e};
            console.log('error ',error );  
            callback && callback(error);
        } 

             
    };

   

    return module;
};







