import Link from 'next/link'
import Menu from './Menu'
import MobileMenu from './MobileMenu'
import Sidebar from './Sidebar'
import { useUserData } from '@/context/UserContext';
import { useAuth0 } from "@auth0/auth0-react";
const { root_domain } = require("@/constants/root_url");

const Header1 = ({ scroll,
    handleMobileMenuOpen,
    handleMobileMenuClose,
    langToggle,
    handleLangToggle,
    handleSidebarClose,
    handleSidebarOpen }) => {



        const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
        const { userName, accessibleTiers } = useUserData();
    
    const fetchPortalSessionUrl = async () => {
        // Make a request to fetch user name using the token
        // Replace the URL with your actual API endpoint
        const accessToken = await getAccessTokenSilently({
            audience: `luminary-review-api.com`,
            scope: "read:current_user",
        })

        fetch(`${root_domain}/users/stripe_portal`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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
    return (
        <>
            <header className="header__style-two">
                <div className="header__top">
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
                                    {userName ? (
                                        <ul className="list-wrap">
                                            { accessibleTiers && !accessibleTiers.includes('premium') && !accessibleTiers.includes('standard') ? (
                                                <li><Link href="/plans" style={{'padding': '17px 23px 17px 20px', marginTop: '10px', marginBottom: '-10px'}} className="btn" data-animation-in="tg-fadeInUp" data-delay-in={1}><span className="btn-text">Subscribe</span></Link></li>
                                            ): null}

                                            { accessibleTiers && !accessibleTiers.includes('premium') && accessibleTiers.includes('standard') ? (
                                                <li><Link href="#" onClick={fetchPortalSessionUrl} style={{'padding': '17px 23px 17px 20px', marginTop: '10px', marginBottom: '-10px'}} className="btn" data-animation-in="tg-fadeInUp" data-delay-in={1}><span className="btn-text">Upgrade</span></Link></li>
                                            ): null}
                                            <li>
                                                Welcome {userName}! (<Link style={{display: 'inline'}} onClick={() => {
                                                    logout({ 
                                                        logoutParams: {returnTo: window.location.origin}
                                                    });
                                                }} href='#'>Sign out</Link>)
                                                {accessibleTiers && accessibleTiers.includes('free') ? (
                                                    <div><Link href='/account' >View Settings</Link></div>
                                                ) : null}
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="list-wrap">
                                            <li><Link href="#" onClick={
                                                () => {
                                                    loginWithRedirect({
                                                        authorizationParams: {
                                                            screen_hint: "signup",
                                                            redirect_uri: `${window.location.origin}/subscribe`
                                                        }
                                                    });
                                                }
                                            } style={{'padding': '17px 23px 17px 20px', marginTop: '10px', marginBottom: '-10px'}} className="btn" data-animation-in="tg-fadeInUp" data-delay-in={1}><span className="btn-text">Subscribe</span></Link></li>
                                            <li><Link href="#" style={{
                                                'padding': '17px 20px',
                                                marginTop: '10px',
                                                marginBottom: '-10px',
                                                color: '#111111 !important',
                                                fontWeight: 'bold',
                                            }} className="" data-animation-in="tg-fadeInUp" data-delay-in={1} onClick={loginWithRedirect}>Sign in</Link></li>
                                        </ul>
                                    )}
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
                                <Menu handleMobileMenuOpen={handleMobileMenuOpen} handleSidebarOpen={handleSidebarOpen} />
                                <MobileMenu handleMobileMenuClose={handleMobileMenuClose} />
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