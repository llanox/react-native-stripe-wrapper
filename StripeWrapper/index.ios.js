/**
 * Sample Stripe Wrapper
 * 
 */
'use strict';

var React  = require('react-native');
var tCombForms = require('tcomb-form-native');
var config = require('./stripeConfig');

var StripeAPI = require('./StripeAPI')(config.stripeUrl,config.apiKey);

var { AppRegistry, StyleSheet, Text, View, TouchableHighlight } = React;


var Form = tCombForms.form.Form;

// 4242424242424242,12,2016,123,this._onReceiveToken);

var CreditCard = tCombForms.struct({
  number: tCombForms.Num,              
  exp_month: tCombForms.Num,  
  exp_year: tCombForms.Num , 
  cvc: tCombForms.Num ,              
  rememberMe: tCombForms.Bool        
});

var options = { 
  fields: {
    number: {
      placeholder: 'Card number'
    },
    exp_month: {
      placeholder: 'MM'
    },
     exp_year: {
      placeholder: 'YYYY'
    },
     cvc: {
      placeholder: 'CVC'
    }

  }
}; 




var RCTStripe = React.createClass({


   _onError : function(error) {

       console.log("error ",error);


  },

    _onReceiveToken: function(response){

       if(!response.ok){  
          console.log('error',response.text);   
       }else {
          console.log('card token',response.body.id);
          alert('token:'+response.body.id);
       }
        

    },

  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    if (value) { // if validation fails, value will be null
   
      console.log(value); 
      StripeAPI.createCardToken(value.number,value.exp_month,value.exp_year,value.cvc,this._onReceiveToken);

    }
  },

    render: function() {
        return (
          <View style={styles.container}>
            {/* display */}
            <Form
              ref="form"
              type={CreditCard}
              options={options}
            />
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Pay $20.0 </Text>
            </TouchableHighlight>
          </View>
        );
      }

});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('StripeWrapper', () => RCTStripe);
