
jest.dontMock('../StripeAPI');
jest.autoMockOff();

//var superagent = require('superagent');
var request = require('supertest');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();


var config = require('./stripeConfig');
var StripeAPI = require('../StripeAPI')(config.stripeUrl,config.apiKey);

var validCardToken ='tok_16RRf0DE9ZivpJtCYYBpeIWM';


var card_data = {
	card: {
      "number": 4242424242424242,
      "exp_month": 12,
      "exp_year": 2016,
      "cvc": 123
     }
 };
  
    describe('StripeAPI request tokens', function() {


      it('call function createCardToken', function(done) {  

      this.timeout(60000);
           
            stripe.createCardTokenTest(request, card_data.card.number,
                                  card_data.card.exp_month,
                                  card_data.card.exp_year,
                                  card_data.card.cvc,
                                  function(err, res) {

                                      if (err)
                                        return done(err);

                                     expect(res.ok).to.be.true;
                                     expect(res.body.id).to.have.length(1);
                                     done();
                                  }

                                  );

      
         

      });
    });


















