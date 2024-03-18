import BlogSidebar from "@/components/elements/BlogSidebar"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import data from "../../util/blogData"
import { useAuth } from "../../context/AuthContext";
const { root_domain } = require("@/constants/root_url");

export default function BlogDetails() {
    let Router = useRouter()
    const [item, setItem] = useState(null)
    const [article, setArticle] = useState(null)
    const { id } = Router.query
    const { authToken } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        setItem(data.find((data) => data.id == id));
        const fetchData = async () => {
            try {
                const response = await fetch(`${root_domain}/articles/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    }
                });
                if (!response.ok) {
                    const responseData = await response.json();
                    if (responseData.detail.code == 'NEED_LOGIN'){
                        setShowLoginModal(true)

                    } else if (responseData.detail.code == 'NEED_SUBSCRIPTION') {
                        setShowSubscribeModal(true)

                    } else if (responseData.detail.code == 'NEED_PREMIUM') {
                        setShowUpgradeModal(true)
                    }
                } else {
                    const responseData = await response.json();
                    setArticle(responseData);
                }
            } catch (error) {
                console.log("ERROR")
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const fetchPortalSessionUrl = () => {
        // Make a request to fetch user name using the token
        // Replace the URL with your actual API endpoint
        fetch(`${root_domain}/users/stripe_portal`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            }, 
            method: "POST",
            body: JSON.stringify({ return_url: window.location.origin })
        })
        .then(response => response.json())
        .then(data => {
            console.log('portal data', data)
            window.location.href = data.url;
        })
        .catch(error => {
            console.error('Error fetching user name:', error);
        });
    };

    if (showLoginModal) {
        return (
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered" role="document" style={{'maxWidth': '700px'}}>
                    <div className="modal-content" style={{
                        border: 'none',
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                        padding: '30px 40px'
                    }}>
                        <div className="modal-body">
                            <h4 style={{
                                textAlign: "center",
                                marginBottom: "3rem",
                                marginTop: "2rem",
                                fontSize: "1.5rem"
                            
                            }}>
                                Log in for access
                            </h4>
                            <p>
                                Unlock full access to insightful and exclusive content by logging in or subscribing today. Elevate your understanding with The Luminary Review.
                            </p>
                            <div style={{
                                textAlign: "center",
                                marginTop: "3rem",
                                marginBottom: '2rem'
                            }}>
                                <Link href="/subscribe" className="btn btn-primary" style={{
                                    marginRight: "1rem"
                                }}>
                                    Subscribe
                                </Link>
                                <div style={{marginTop: '10px'}}>
                                    Already have an account? <Link href="/sign_in">Log in</Link>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (showSubscribeModal) {
        return (
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered" role="document" style={{'maxWidth': '700px'}}>
                    <div className="modal-content" style={{
                        border: 'none',
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                        padding: '30px 40px'
                    }}>
                        <div className="modal-body">
                            <h4 style={{
                                textAlign: "center",
                                marginBottom: "3rem",
                                marginTop: "2rem",
                                fontSize: "1.5rem"
                            
                            }}>
                                Subscribe for access
                            </h4>
                            <p>
                                Unlock full access to insightful and exclusive content by subscribing today. Elevate your understanding with The Luminary Review.
                            </p>
                            <div style={{
                                textAlign: "center",
                                marginTop: "3rem",
                                marginBottom: '2rem'
                            }}>
                                <Link href="/plan" className="btn btn-primary" style={{
                                    marginRight: "1rem"
                                }}>
                                    Subscribe
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (showUpgradeModal) {
        return (
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered" role="document" style={{'maxWidth': '700px'}}>
                    <div className="modal-content" style={{
                        border: 'none',
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                        padding: '30px 40px'
                    }}>
                        <div className="modal-body">
                            <h4 style={{
                                textAlign: "center",
                                marginBottom: "3rem",
                                marginTop: "2rem",
                                fontSize: "1.5rem"
                            
                            }}>
                                Upgrade for access
                            </h4>
                            <p>
                                Unlock full access to insightful and exclusive content by subscribing to Premium today. Elevate your understanding with The Luminary Review.
                            </p>
                            <div style={{
                                textAlign: "center",
                                marginTop: "3rem",
                                marginBottom: '2rem'
                            }}>
                                <Link href="#" onClick={fetchPortalSessionUrl} className="btn btn-primary" style={{
                                    marginRight: "1rem"
                                }}>
                                    Upgrade
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!article) {
        return null;
    }

    return (
        <>
            {item && (
                <Layout headerStyle={2} footerStyle={2} footerClass="black-bg">
                    <>
                        <section className="blog-details-area pt-80 pb-100">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-1">
                                        <div className="blog-details-social">
                                            <ul className="list-wrap">
                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-behance" /></Link></li>
                                                <li><Link href="#"><i className="fas fa-share" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-7">
                                        <div className="blog-details-wrap">
                                            <ul className="tgbanner__content-meta list-wrap">
                                                <li className="category"><Link href="/blog">{article.category}</Link></li>
                                                <li><span className="by">By</span> {article.author}</li>
                                                <li>{article.date}</li>
                                                <li>{article.comment_count} comments</li>
                                            </ul>
                                            <h2 className="title">{article.headline}</h2>
                                            <div className="blog-details-thumb">
                                                <img src={`/assets/img/${article.category}/${article.img}`} alt="" style={{ width: "100%" }} />
                                            </div>
                                            <div className="blog-details-content">
                                                <p>In partnership with Sydney startup Trace, Envato is delivering on its sustainability promise as a B-Corp and meeting part of its recent commitment to the To Whom It Should Concern campaign. Envato is now officially carbon neutral, as part of a comprehensive new sustainability.</p>
                                                <p>When we signed on to the To Whom It May Concern campaign we made a pledge to be 100% renewable by 2030 and carbon zero by 2040,” said Envato CEO Hichame Assi. “It’s a commitment made on the back of our B Corp certification, and one we believe reflects not just our values but a broader sense of how businesses can contribute to fighting climate change.</p>
                                                <p>We are proud that our people can make a positive impact on the world around us through their work at Envato. And while there is still lots of work to do to realise carbon, we’re nonetheless pleased we’ve reached this sustainability milestone and thrilled to partner with Trace to further track and refine the management of our carbon footprint. An through Trace, Envato is now able to more comprehensively measure the amount of carbon emissions the business generates. This includes not just its physical offices in Melbourne, Guadalajara and Los Angeles, but also includes an estimate of the footprint of its 600 plus staff who work flexibly around the world, as well as the usage tied to its tech infrastructure including our cloud computing services.</p>
                                                <div className="blog-details-inner">
                                                    <h3 className="inner-title">Building the Future of Artificial Intelligence</h3>
                                                    <p>When we signed on to the To Whom It May Concern campaign we made a pledge to be 100% renewable by 2030 and carbon zero by 2040,” said Envato CEO Hichame Assi. “It’s a commitment made on the back of our B Corp certification, and one we believe reflects not just our values but a broader sense of how businesses can contribute to fighting climate change.</p>
                                                    <div className="blog-details-images">
                                                        <div className="row">
                                                            <div className="col-md-4 col-sm-6">
                                                                <div className="details-inner-image">
                                                                    <img src="/assets/img/lifestyle/life_style02.jpg" alt="img" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6">
                                                                <div className="details-inner-image">
                                                                    <img src="/assets/img/lifestyle/life_style03.jpg" alt="img" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6">
                                                                <div className="details-inner-image">
                                                                    <img src="/assets/img/lifestyle/life_style04.jpg" alt="img" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>The Mount Sandy project in South Australia is one of those supported by Envato through Trace. Its permanent protection of the regionally and culturally important pocket. Trace CEO and Co-Founder Catherine Long said Envato was a perfect example of a fast-moving tech business that already has a demonstrable commitment to sustain.
                                                        “But they needed a solution for measuring and managing their carbon footprint that matched the speed and efficiency of the way they work footprint that matched the speed.</p>
                                                </div>
                                                <blockquote>
                                                    <p>“ 20 years ago today, Steve introduced the world to iMac. It set Apple on a new course and forever changed the way people look at computers. ”</p>
                                                    <div className="blockquote-cite">
                                                        <div className="image">
                                                            <img src="/assets/img/others/about_me.png" alt="" />
                                                        </div>
                                                        <div className="info">
                                                            <h5>Miranda H. Halim</h5>
                                                            <span>Head Of Idea</span>
                                                        </div>
                                                    </div>
                                                </blockquote>
                                                <p>We are proud that our people can make a positive impact on the world around us through their work at Envato. And while there is still lots of work to do to realise carbon, we’re nonetheless pleased we’ve reached this sustainability milestone and thrilled to partner with Trace to further track and refine the management of our carbon footprint. An
                                                    through Trace, Envato is now able to more comprehensively measure the amount of carbon emissions the business generates. This includes not just its physical offices in Melbourne, Guadalajara and Los Angeles, but also includes an estimate of the footprint of its 600 plus staff who work flexibly around the world, as well as the usage tied to its ech infrastructure including our cloud computing services.</p>
                                                <div className="blog-details-inner">
                                                    <h3 className="inner-title">The Creative Cloud</h3>
                                                    <p>When we signed on to the To Whom It May Concern campaign we made a pledge to be 100% renewable by 2030 and carbon zero by 2040,” said Envato CEO Hichame Assi..</p>
                                                    <ul className="list-wrap">
                                                        <li><span>The games generate:</span>Revenue through sales of digital items, such as special costumes, which appear in a rotating storefront that is updated daily.</li>
                                                        <li><span>Players use in-game:</span>Currency to customize their appearance, and the daily refresh of the store incentives players to buy fresh gear or risk missing out on it entirely.</li>
                                                        <li><span>Players have:</span> Already spent more than $1 billion on Fortnite’s in-game purchases, according to IGN report.</li>
                                                    </ul>
                                                </div>
                                                {/* <div className="details-advertisement">
                                                    <Link href="#"><img src="/assets/img/others/advertisement02.png" alt="img" /></Link>
                                                </div> */}
                                                <p>Envato is now able to more comprehensively measure the amount of carbon emissions the business generates. includes not just its physical offices in Melbourne, Guadalajara and Los Angeles, but also includes an estimate of footprint of its 600 plus staff who work flexibly around the world, as well as the usage tied to its tech infrastructure including our cloud computing services lexibly around the world.</p>
                                            </div>
                                            <div className="blog-details-bottom">
                                                <div className="row align-items-baseline">
                                                    {/* <div className="col-xl-6 col-md-7">
                                                        <div className="blog-details-tags">
                                                            <ul className="list-wrap mb-0">
                                                                <li><Link href="#">technology</Link></li>
                                                                <li><Link href="#">finance</Link></li>
                                                                <li><Link href="#">business</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="col-xl-6 col-md-5">
                                                        <div className="blog-details-share">
                                                            <h6 className="share-title">Share Now:</h6>
                                                            <ul className="list-wrap mb-0">
                                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                                <li><Link href="#"><i className="fab fa-behance" /></Link></li>
                                                                <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                                            </ul>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="blog-avatar-wrap">
                                                <div className="blog-avatar-img">
                                                    <Link href="#"><i className="far fa-check" /><img src="/assets/img/others/avatar.png" alt="img" /></Link>
                                                </div>
                                                <div className="blog-avatar-content">
                                                    <p>{article.author} is a Writer at Sarsa and has been covering emerging technologies and
                                                        venture capital there since 2013. He covers a wide variety of news from early and late stage startups to massive tech behemoths.</p>
                                                    <h5 className="name">{article.author}</h5>
                                                    <span className="designation">Award-Winning Journalist</span>
                                                </div>
                                            </div>
                                            {/* <div className="blog-prev-next-posts">
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-8 col-md-6">
                                                        <div className="pn-post-item">
                                                            <div className="thumb">
                                                                <Link href="/blog/1"><img src="/assets/img/lifestyle/life_style06.jpg" alt="img" /></Link>
                                                            </div>
                                                            <div className="content">
                                                                <span>Prev Post</span>
                                                                <h5 className="title tgcommon__hover"><Link href="/blog/1">3 Stocks to Buy and Hold Through the Panic...</Link></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-8 col-md-6">
                                                        <div className="pn-post-item next-post">
                                                            <div className="thumb">
                                                                <Link href="/blog/1"><img src="/assets/img/lifestyle/life_style07.jpg" alt="img" /></Link>
                                                            </div>
                                                            <div className="content">
                                                                <span>Next Post</span>
                                                                <h5 className="title tgcommon__hover"><Link href="/blog/1">Mood Boards for Product Designers dome...</Link></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <BlogSidebar author={article.author}/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                </Layout>
            )}
        </>
    )
}