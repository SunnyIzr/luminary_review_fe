import Isotope from "isotope-layout"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
const { root_domain } = require("@/constants/root_url");
import { useRouter } from "next/router"

export default function MinimalIsotope() {
    let Router = useRouter()
    const isotope = useRef()
    const [articles, setArticles] = useState([])
    const { category_name } = Router.query

    useEffect(() => {
        setTimeout(() => {
            isotope.current = new Isotope(".minimal__post-wrapper", {
                itemSelector: ".minimal__post-item",
                percentPosition: true,
                masonry: {
                    columnWidth: ".minimal__post-item",
                },
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            })
        }, 1000)

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${root_domain}/articles`);
                const data = await response.json();
                setArticles(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredArticles = articles.filter(item => item.category === category_name);

    return (
        <>

            <section className="minimal__post-area pt-80 pb-80">
                <div className="container">
                    <div className="minimal__post-wrapper">
                        {filteredArticles.map((item, i) => (
                            <div className="minimal__post-item grid-item" key={i}>
                                <div className="minimal__post-thumb tgImage__hover trending__post-thumb">
                                    <div className="minimal__post-tags">
                                        <Link href="#">{item.category}</Link>
                                    </div>
                                    <Link href="/articles/1"><img src={`/assets/img/${item.category}/${item.img}`} alt="img" /></Link>
                                    {(item.content_tier == 'standard') && <span className="is_trend"><i className="fas fa-lock" /></span>}
                                    {(item.content_tier == 'premium') && <span className="is_trend"><i className="fas fa-lightbulb" /></span>}
                                </div>
                                <div className="minimal__post-content">
                                    <ul className="tgbanner__content-meta list-wrap">
                                        <li><span className="by">By</span> {item.author}</li>
                                        <li>{item.date}</li>
                                    </ul>
                                    <h4 className="title tgcommon__hover"><Link href={`/articles/${item.id}`}>{item.headline}</Link></h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}