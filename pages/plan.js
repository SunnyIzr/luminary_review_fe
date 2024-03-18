import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router"; 
const { root_domain } = require("@/constants/root_url");

export default function Plan() {
    const [error, setError] = useState("");
    const router = useRouter(); 
    const [plans, setPlans] = useState([])
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPlanId) {
            router.push(`/checkout?planId=${selectedPlanId}`);
        } else {
            setError("Please select a plan before proceeding to checkout.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${root_domain}/plans`);
                const data = await response.json();
                setPlans(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
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
                                        <div className="step active">
                                            <div className="step-number">2</div>
                                        </div>
                                        <div className="connector"></div>
                                        <div className="step">
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
                                        Second, choose a plan.
                                    </h2>
                                    <p
                                        className="pb-30"
                                        style={{
                                            maxWidth: "550px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        Select a plan that's right for you. You can always switch or cancel anytime.
                                    </p>
                                    <div
                                        className=""
                                        style={{
                                            margin: "0 auto",
                                            maxWidth: "550px",
                                        }}
                                    >
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        {plans.length > 0 && (
                                            <form onSubmit={handleSubmit}>
                                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                                                    {plans.map((plan) => (
                                                        <div
                                                            key={plan.id}
                                                            className={`plan-box ${selectedPlanId === plan.id ? "active" : ""}`}
                                                            onClick={() => setSelectedPlanId(plan.id)}
                                                            style={{
                                                                border: "1px solid",
                                                                borderColor: selectedPlanId === plan.id ? "#ff3366" : "#989898",
                                                                borderRadius: "5px",
                                                                padding: "20px",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <h3 className="plan-header">{plan.name}</h3>
                                                            <p className="plan-subheader">{plan.description}</p>
                                                            <p className="plan-price">${(plan.price_cents / 100).toFixed(2)}</p>
                                                        </div>
                                                    ))}
                                                </div>                                            
                                                <input
                                                    className="btn"
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        backgroundColor: "#ff3366",
                                                        color: "#fff",
                                                        height: "50px",
                                                        marginTop: "35px",
                                                    }}
                                                    type="submit"
                                                    value="Next"
                                                />
                                            </form>
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