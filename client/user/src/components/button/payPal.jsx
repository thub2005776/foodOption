import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { SuccessMesage } from '../../components';

const PayPalButton = ({ success}) => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ 'client-id': clientId }}>
      <div>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1.00', // Số tiền thanh toán
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function(details) {
              console.log('Transaction completed by ' + details.payer.name.given_name);
              success(true)
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;