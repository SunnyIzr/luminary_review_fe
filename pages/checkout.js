import { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { useSearchParams } from 'next/navigation'
import { useAuth0 } from "@auth0/auth0-react";
const { root_domain } = require("@/constants/root_url");

export default function Checkout() {
    const [error, setError] = useState("");
    const router = useRouter(); 
    const searchParams = useSearchParams()
    const [clientSecret, setClientSecret] = useState('');
    const plan_id = searchParams.get('planId')
    const { getAccessTokenSilently } = useAuth0();

    const stripePromise = loadStripe("pk_test_51N0nnFCaYvT2BgMYG59TzQn0Qwa16HHaBCHuXPsF2aKZCnKeAdf4o73aTiVDqYj0uGxaKCSF20Y8Wf4F8SPjF65100n2avhVxI");


    useEffect(() => {

        const fetchData = async () => {
            const returnUrl = window.location.origin + "/";
            const accessToken = await getAccessTokenSilently({
                audience: `luminary-review-api.com`,
                scope: "read:current_user",
            })
            try {
                if (accessToken) {
                    const response = await fetch(
                        `${root_domain}/users/stripe_checkout`,
                        {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ plan_id: plan_id, return_url: returnUrl }),   
                        }
                    );
                    
                    if (response.status === 400) {
                        setError("Something went wrong.");
                    } else {
                        const responseData = await response.json();
                        console.log(responseData)
                        setClientSecret(responseData.client_secret)
                    }

                }

            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Layout headerStyle={3} footerStyle={2} footerClass="black-bg">
                <section className="blog-details-area pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12">
                                <div className="blog-post-wrapper">
                                    <div className="progress-bar-container" style={{
                                        maxWidth: '550px',
                                        margin: '50px auto 20px',
                                        paddingBottom: '39px',
                                    }}>
                                        <div className="step">
                                            <div className="step-number">1</div>
                                        </div>
                                        <div className="connector"></div>
                                        <div className="step">
                                            <div className="step-number">2</div>
                                        </div>
                                        <div className="connector"></div>
                                        <div className="step active">
                                            <div className="step-number">3</div>
                                        </div>
                                    </div>
                                    <h2
                                        className="title"
                                        style={{
                                            textAlign: "left",
                                            maxWidth: "550px",
                                            margin: "0 auto",
                                            paddingBottom: "8px",
                                        }}
                                    >
                                        And finally, let's finish up.
                                    </h2>
                                    <p
                                        className="pb-30"
                                        style={{
                                            maxWidth: "550px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        Remember, can always cancel your subscription at any time.
                                    </p>
                                    <div
                                        className=""
                                        style={{
                                            margin: "0 auto",
                                            maxWidth: "1200px",
                                        }}
                                    >
                                        <div id="checkout">
                                            {clientSecret && (
                                                <EmbeddedCheckoutProvider
                                                    stripe={stripePromise}
                                                    options={{clientSecret}}
                                                >
                                                <EmbeddedCheckout />
                                                </EmbeddedCheckoutProvider>
                                            )}
                                        </div>
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
