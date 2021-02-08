var express = require('express');
var router = express.Router();
const fs = require('fs');
const { uuid } = require('uuidv4');

const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');

const config = {
    'publicKeyId': 'AFCWGIZJ5YUODSTMSXE6RQR7',                 // RSA Public Key ID (this is not the Merchant or Seller ID)
    'privateKey': fs.readFileSync('keys/private.pem'),      // Path to RSA Private Key (or a string representation)
    'region': 'us',                                            // Must be one of: 'us', 'eu', 'jp' 
    'sandbox': true                                            // true (Sandbox) or false (Production) boolean
};

// authorize-controller

router.get('/', function(req, res, next) {
  const payload = {
    webCheckoutDetails: {
        checkoutReviewReturnUrl: 'https://localhost/store/checkoutReview',
        checkoutResultReturnUrl: 'https://localhost/store/checkoutReturn'
    },
    storeId: 'amzn1.application-oa2-client.542de3a9ff244dc1892fd6ed9f69be71' // Enter Client ID
  };

  const headers = {
    'x-amz-pay-idempotency-key': uuid().toString().replace(/-/g, '')
  };

  const testPayClient = new Client.WebStoreClient(config);
  const response = testPayClient.createCheckoutSession(payload, headers);

  res.send(response);
});

router.post('/', function(req, res, next) {
  // const testPayClient = new Client.AmazonPayClient(config);
  const testPayClient = new Client.InStoreClient(config);
  console.log(testPayClient);

  const payload = {
    scanData: 'UKhrmatMeKdlfY6b',
    scanReferenceId: uuid().toString().replace(/-/g, ''),
    merchantCOE: 'US',
    ledgerCurrency: 'USD',
    chargeTotal: {
        currencyCode: 'USD',
        amount: '2.00'
    },
    storeLocation: {
        countryCode: 'US'
    },
    metadata: {
        merchantNote: 'Merchant Name',
        customInformation: 'in-store Software Purchase',
        communicationContext: {
            merchantStoreName: 'Store Name',
            merchantOrderId: '789123'
        }
    }
  };

  const response = testPayClient.merchantScan(payload);
  console.log(response);

  res.send(response);
});

router.delete('/:tokenId', function(req, res, next) {
  res.send(`DELETE: ${req.params.tokenId}`);
});

module.exports = router;
