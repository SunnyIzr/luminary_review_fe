import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"

export default function InteriorSlider({ data }) {
    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
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
                className="slider-active"
            >
                {data && data.length > 0 && [data[0], data[10], data[25]].map((item, i) => (
                    <SwiperSlide className="slider__item" key={i}>
                        <div className="row align-items-center">
                            <div className="col-xl-5 col-lg-6">
                                <div className="slider__content">
                                    <ul className="tgbanner__content-meta list-wrap">
                                        <li className="category"><Link href={`/${item.category}`}>{item.category}</Link></li>
                                        <li><span className="by">By</span> {item.author}</li>
                                        <li>{item.date}</li>
                                    </ul>
                                    <h2 className="title" data-animation-in="tg-fadeInUp" data-delay-in=".6">{item.headline}</h2>
                                    <Link href={`/articles/${item.id}`} className="btn" data-animation-in="tg-fadeInUp" data-delay-in={1}><span className="btn-text">Read More</span> <i className="far fa-long-arrow-right" /></Link>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-6">
                                <div className="slider__img-wrap">
                                    <img src={`/assets/img/${item.category}/${item.img}`} className="main-img" alt="img" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
