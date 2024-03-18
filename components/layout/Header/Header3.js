import Link from 'next/link'
import Menu from './Menu'
import MobileMenu from './MobileMenu'
import Sidebar from './Sidebar'

const Header1 = ({ scroll,
    handleMobileMenuOpen,
    handleMobileMenuClose,
    langToggle,
    handleLangToggle,
    handleSidebarClose,
    handleSidebarOpen }) => {
    return (
        <>
            <header className="header__style-two">
                <div className="header__top" style={{borderBottom: '1px solid #989898'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-4 d-none d-lg-block">
                                <div className="d-flex gap-4 align-items-center">
                                    {/* <div className="offcanvas-toggle" >
                                        <Link href="#"><i className="flaticon-menu-bar" /></Link>
                                    </div> */}
                                    <div className="header__top-logo logo">
                                        <Link href="/" className="logo-dark">
                                            <img src="/assets/img/logo/logo.png" alt="Logo" />
                                        </Link>
                                        <Link href="/" className="logo-light">
                                            <img src="/assets/img/logo/w_logo.png" alt="Logo" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="footer__social">
                                    <ul className="list-wrap">
                                    {/* <li><Link href="/blog/1" style={{'padding': '17px 23px 17px 20px', marginTop: '10px', marginBottom: '-10px'}} className="btn" data-animation-in="tg-fadeInUp" data-delay-in={1}><span className="btn-text">Subscribe</span></Link></li>
                                    <li><Link href="/blog/1" style={{
                                        'padding': '17px 20px',
                                        marginTop: '10px',
                                        marginBottom: '-10px',
                                        color: '#111111 !important',
                                        fontWeight: 'bold',
                                    }} className="" data-animation-in="tg-fadeInUp" data-delay-in={1}>Sign in</Link></li> */}
                                    
                                        {/* <li><Link href="#"><i className="fab fa-facebook-f" /> Facebook <span>25K</span></Link></li>
                                        <li><Link href="#"><i className="fab fa-twitter" /> Twitter <span>44K</span></Link></li>
                                        <li><Link href="#"><i className="fab fa-youtube" /> Youtube <span>91K</span></Link></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="header-fixed-height" className={`${scroll ? "active-height" : ""}`} />
                <div id="sticky-header" className={`tg-header__area ${scroll ? "sticky-menu" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* <Menu handleMobileMenuOpen={handleMobileMenuOpen} handleSidebarOpen={handleSidebarOpen} /> */}
                                {/* <MobileMenu handleMobileMenuClose={handleMobileMenuClose} /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar handleSidebarClose={handleSidebarClose} />
            </header>
        </>
    )
}

export default Header1