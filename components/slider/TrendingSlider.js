import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"


export default function TrendingSlider({ showItem, data }) {
    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={showItem}
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
                        slidesPerView: showItem,
                        spaceBetween: 30,
                    },
                    1350: {
                        slidesPerView: showItem,
                        spaceBetween: 30,
                    },
                }}
                className="swiper-wrapper"
            >
                {data && data.length > 0 && [data[12], data[20], data[16], data[13], data[21], data[5], data[22], data[6], data[23]].map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="trending__post">
                            <div className="trending__post-thumb tgImage__hover">
                                <Link href="/#" className="addWish"><i className="fal fa-heart" /></Link>
                                <Link href={`/articles/${item.id}`}><img src={`/assets/img/${item.category}/${item.img}`} alt="img" /></Link>
                                {(item.content_tier == 'standard') && <span className="is_trend"><i className="fas fa-lock" /></span>}
                                {(item.content_tier == 'premium') && <span className="is_trend"><i className="fas fa-lightbulb" /></span>}
                            </div>
                            <div className="trending__post-content">
                                <ul className="tgbanner__content-meta list-wrap">
                                    <li className="category"><Link href={`/${item.category}`}>{item.category}</Link></li>
                                    <li><span className="by">By</span> {item.author}</li>
                                </ul>
                                <h4 className="title tgcommon__hover"><Link href={`/articles/${item.id}`}>{item.headline}</Link></h4>
                                <ul className="post__activity list-wrap">
                                    <li><i className="fal fa-signal" /> {formatNumber(item.view_count)}</li>
                                    <li><Link href={`/articles/${item.id}`}><i className="fal fa-comment-dots" /> {formatNumber(item.comment_count)}</Link></li>
                                    <li><i className="fal fa-share-alt" /> {formatNumber(item.share_count)}</li>
                                </ul>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )

    function formatNumber(number) {
        if (number >= 1000) {
            const formattedNumber = (number / 1000).toFixed(1);
            return `${formattedNumber}K`;
        }
        return number;
    }
}
