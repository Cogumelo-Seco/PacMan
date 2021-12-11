import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { CookiesProvider } from "react-cookie";

Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#f03434" />

                <link rel="stylesheet" href="/css/reset.css" />             
                <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
                <link rel="stylesheet" href="/css/global.css" />
                <link rel="stylesheet" href="/css/globalAnimations.css" />   
            </Head>
            <nav>
                <style jsx>{`
                    a {
                        margin: 0 10px 0 0;
                    }
                `}</style>
            </nav>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </>
    )
}

export default App