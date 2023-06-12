import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nav } from '../components/Nav/Nav';
import Head from 'next/head';
import { Montserrat } from 'next/font/google';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const mont = Montserrat({ subsets: ['latin'] });

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="public/assets/logo.svg" type="image/svg" />
      </Head>
      <ApolloProvider client={client}>
        <div className={`min-h-screen p-12 ${mont.className}`}>
          <Nav />
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </>
  )
}
