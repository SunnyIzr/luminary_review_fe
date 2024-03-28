import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { useAuth0 } from "@auth0/auth0-react";
const { root_domain } = require("@/constants/root_url");

export default function Subscribe() {
    const router = useRouter();
    const { user, getAccessTokenSilently } = useAuth0();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            first_name: firstName,
            last_name: lastName,
        };

        const accessToken = await getAccessTokenSilently({
            audience: `luminary-review-api.com`,
            scope: "read:current_user",
        })
        console.log("access token", accessToken)

        try {
            const response = await fetch(
                `${root_domain}/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.status === 400) {
                setError("Invalid credentials");
            } else {
                const responseData = await response.json();
                console.log("***")
                console.log(responseData)
                router.push("/plans");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Layout headerStyle={3} footerStyle={2} footerClass="black-bg">
                <section className="blog-details-area pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12">
                                <div className="blog-post-wrapper">
                                    <div className="progress-bar-container" style={{
                                        maxWidth: '400px',
                                        margin: '50px auto 20px',
                                        paddingBottom: '39px',
                                    }}>
                                        <div className="step active">
                                            <div className="step-number">1</div>
                                        </div>
                                        <div className="connector"></div>
                                        <div className="step">
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
                                        Let's setup your account.
                                    </h2>
                                    {/* <p
                                        className="pb-30"
                                        style={{
                                            maxWidth: "550px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        Already have an account? <Link href="/sign_in">Log in</Link>
                                    </p> */}
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
                                        <form onSubmit={handleSubmit}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <div style={{ width: "48%" }}>
                                                    <label
                                                        style={{
                                                            fontWeight: "bold",
                                                            marginBottom: "5px",
                                                        }}
                                                    >
                                                        First Name
                                                    </label>
                                                    <input
                                                        style={{
                                                            display: "block",
                                                            width: "100%",
                                                            border: "1px solid #989898",
                                                            height: "50px",
                                                            padding: "0 10px",
                                                        }}
                                                        type="text"
                                                        placeholder=""
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                                <div style={{ width: "48%" }}>
                                                    <label
                                                        style={{
                                                            fontWeight: "bold",
                                                            marginBottom: "5px",
                                                        }}
                                                    >
                                                        Last Name
                                                    </label>
                                                    <input
                                                        style={{
                                                            display: "block",
                                                            width: "100%",
                                                            border: "1px solid #989898",
                                                            height: "50px",
                                                            padding: "0 10px",
                                                        }}
                                                        type="text"
                                                        placeholder=""
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                    marginTop: "35px",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Email address
                                            </label>
                                            <input
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    
                                                    height: "50px",
                                                    padding: "0 10px",
                                                }}
                                                type="text"
                                                disabled
                                                placeholder=""
                                                value={user ? user.email : ''}
                                                />

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