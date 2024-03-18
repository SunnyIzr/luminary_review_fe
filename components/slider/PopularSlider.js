import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"

export default function PopularSlider({ data }) {
    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.block-gallery-pagination'
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    767: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1199: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1350: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="swiper-wrapper"
            >
                {data && data.length > 0 && [data[1], data[9], data[18], data[2], data[11], data[19]].map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="trending__post">
                            <div className="trending__post-thumb tgImage__hover">
                                <Link href="#" className="addWish"><i className="fal fa-heart" /></Link>
                                <Link href={`/articles/${item.id}`}><img src={`/assets/img/${item.category}/${item.img}`} alt="img" /></Link>
                                {(item.content_tier == 'standard') && <span className="is_trend"><i className="fas fa-lock" /></span>}
                                {(item.content_tier == 'premium') && <span className="is_trend"><i className="fas fa-lightbulb" /></span>}
                            </div>
                            <div className="trending__post-content">
                                <ul className="tgbanner__content-meta list-wrap">
                                    <li className="category"><Link href="/blog">Gaming</Link></li>
                                    <li><span className="by">By</span> {item.author}</li>
                                    <li>{item.date}</li>
                                </ul>
                                <h4 className="title tgcommon__hover"><Link href={`/articles/${item.id}`}>{item.headline}</Link></h4>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
