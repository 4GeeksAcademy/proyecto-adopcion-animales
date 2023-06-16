import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function Donacion() {
  return (
    <div><h1>Haz una donacion</h1>
        <span>
            Con solo 9.99$ puedes ayudar a mas de un animal
        </span>
        <PayPalScriptProvider options = {{
            "client-id": 
                "AXAbpXS5XM3nNJCq8gVcVRv-x2cFxB9SPAuHdJ6nPTfQuS6CvS9VJ-tO6odW35x6Fo5XfWIqvEbAALR9"
                }}>
            <PayPalButtons 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: "9.99",
                            }
                        }]
                    })
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details){
                        alert('Transaction completed by ' + details.payer.name.given_name);
                    })
                }}
            />
        </PayPalScriptProvider>
    </div>
  )
}