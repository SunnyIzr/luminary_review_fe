import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { useAuth } from '../context/AuthContext';
const { root_domain } = require("@/constants/root_url");

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch(
                `${root_domain}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.status === 400) {
                setError("Invalid credentials");
            } else {
                const responseData = await response.json();
                setError('')
                const token = responseData.token
                login(token);
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Layout headerStyle={3} footerStyle={2} footerClass="black-bg">
                <section className="blog-details-area pt-60 pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12">
                                <div className="blog-post-wrapper">
                                    <h2
                                        className="title"
                                        style={{
                                            textAlign: "left",
                                            maxWidth: "550px",
                                            margin: "0 auto",
                                            paddingBottom: "8px",
                                        }}
                                    >
                                        Log into your account
                                    </h2>
                                    <p
                                        className="pb-30"
                                        style={{
                                            maxWidth: "550px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        Don't have an account? <Link href="/register">Register now</Link>
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
                                        <form onSubmit={handleSubmit}>
                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Email address
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
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                    marginTop: "35px",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Password
                                            </label>
                                            <input
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    border: "1px solid #989898",
                                                    height: "50px",
                                                    padding: "0 10px",
                                                }}
                                                type="password"
                                                placeholder=""
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                                value="Sign in"
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