import Preloader from "@/components/elements/Preloader"
import { useEffect, useState, useContext } from "react"
import { Auth0Provider } from '@auth0/auth0-react';
import { UserDataProvider, useUserData } from '@/context/UserContext';
import { UserDataFetcher } from '@/components/auth/UserDataFetcher';

import 'swiper/css'
import "swiper/css/navigation"
import "swiper/css/pagination"
import '../public/assets/css/animate.min.css'
import '../public/assets/css/bootstrap.min.css'
import '../public/assets/css/flaticon.css'
import '../public/assets/css/fontawesome-all.min.css'
import '../public/assets/css/imageRevealHover.css'
import '../public/assets/css/magnific-popup.css'
import '../public/assets/css/main.css'
import '../public/assets/css/slick.css'
import '../public/assets/css/spacing.css'
import '../public/assets/css/swiper-bundle.css'
import Script from "next/script";

function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (<>

        <Script
        src="https://lightswitch-js-sdk-poc.vercel.app/index.js"
        type="text/javascript"
        onLoad={async () => {
            await window.lightswitch.init("tlr");
        }}
        ></Script>
        {!loading ? (
            <Auth0Provider
                domain="dev-opns1cwxjgnbq7a2.us.auth0.com"
                clientId="loEXdMjeF4gxCUYEHxjbXBCKrvr9K2ox"
                cacheLocation="localstorage"
                scope='openid profile email'
                authorizationParams={{
                    audience: 'luminary-review-api.com',
                    redirect_uri: window.location.origin
            }}
            >
                <UserDataProvider>
                    <UserDataFetcher>
                        <Component {...pageProps} />
                    </UserDataFetcher>
                </UserDataProvider>
            </Auth0Provider>
        ) : (
            <Preloader />
        )}
    </>)
}

export default MyApp
