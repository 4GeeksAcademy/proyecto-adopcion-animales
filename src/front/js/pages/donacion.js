import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import donacionImg from '../../../front/img/Donacion.png';
import "../../styles/component.css"

export default function Donacion() {

    return (
        <div className='vh-100 text-center justify-content-center'>
            <div className='container mt-4'>
                <img src={donacionImg} className="img shadow-sm" id="loginImagen" style={{ maxWidth: "600px", maxHeight: "200px", display: "block", margin: "0 auto" }} />
                <div className='container mt-4  border rounded-pill shadow border-3 p-2'>
                    <p style={{ margin: "0 auto" }}>
                        Con solo 9.99€, puedes ayudar a más de un animal necesitado. Tu apoyo es crucial para proporcionarles alimento y un hogar seguro. Únete a nosotros en esta noble causa y juntos crearemos un impacto positivo en la vida de estos indefensos seres. ¡Tu donación cuenta!
                    </p>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <div className='d-flex justify-content-center'>
                            <PayPalScriptProvider
                                options={{
                                    'client-id': 'AXAbpXS5XM3nNJCq8gVcVRv-x2cFxB9SPAuHdJ6nPTfQuS6CvS9VJ-tO6odW35x6Fo5XfWIqvEbAALR9',
                                    currency: "EUR"
                                    
                                }}
                            >
                                <PayPalButtons
                                fundingSource="paypal"
                                style={{"layout":"vertical","label":"donate"}}
                                disabled={false}
                                createOrder={(data, actions) => {
                                    return actions.order
                                        .create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: "9.99",
                                                        breakdown: {
                                                            item_total: {
                                                                currency_code: "EUR",
                                                                value: "9.99",
                                                            },
                                                        },
                                                    },
                                                    items: [
                                                        {
                                                            name: "donation-example",
                                                            quantity: "1",
                                                            unit_amount: {
                                                                currency_code: "EUR",
                                                                value: "9.99",
                                                            },
                                                            category: "DONATION",
                                                        },
                                                    ],
                                                },
                                            ],
                                        })
                                        .then((orderId) => {
                                            // Your code here after create the donation
                                            return orderId;
                                        });
                                }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then(function (details) {
                                            alert('Transaction completed by ' + details.payer.name.given_name);
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}