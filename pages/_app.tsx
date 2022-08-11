import Head from 'next/head';
import { AppPropsWithLayout } from '../types/global';
import { Provider } from 'react-redux';
import '../styles/global.css';
import { store } from '../app/store';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import UserProvider from '../context/userContext';
import Background from '../components/Home';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [loading, setLoading] = useState(false);
    const getLayout = Component.getLayout ?? ((page) => page);
    useEffect(() => {
        window.setTimeout(() => {
            setLoading(true);
        }, 2000);
    }, []);
    return (
        <CookiesProvider>
            <UserProvider>
                <Head>
                    <title>Foxy</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content="A social network to connect with your friends" />
                    <meta name="keywords" content="foxy, social network, friends, connect, social, network" />
                    <link rel="icon" href="/logo.svg" />
                </Head>
                <Provider store={store}>
                    {loading ? <>{getLayout(<Component {...pageProps} />)}</> : <Background />}

                    <Toaster />
                </Provider>
            </UserProvider>
        </CookiesProvider>
    );
}

export default MyApp;
