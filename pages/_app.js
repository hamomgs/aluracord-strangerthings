import appConfig from "../config.json";
import Head from "next/head"

function GlobalStyle() {
  return (
    <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    *::-webkit-scrollbar {
      display: none;
      width: 5px;
    }
    *::-webkit-scrollbar-track {
      background: transparent;
    }
    *::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 100px;
      border: 0px solid orange;
    }
    .boxBlur {
      backdrop-filter: blur(16px);
      transition: all 0.5s;
    }
    .boxBlur:hover {
      backdrop-filter: blur(10px);
    }
    .boxBlur2 {
      backdrop-filter: blur(2rem);
      transition: all 0.5s;
    }
    .boxImgBack .boxImg {
      transition: 0.3s;
    }
    .boxImgBack .boxImg:hover {
      transition: 0.3s;
      border-radius: 5%;
    }
    .btnLogout {
      background-color: rgba(0, 0, 0, 0) !important;
      border: 0px solid transparent;
      box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.5);
      margin-left: 5px;
      transition: all 0.5s;
    }
    .btnLogout:hover {
      transition: all 0.5s;
      background-color: rgba(227, 81, 79, 0.1) !important;
      color: #e3514f !important;
    }
    body.swal2-shown > [aria-hidden="true"] {
      transition: 0.1s filter;
      filter: blur(5px);
    }
    .perfilLogado {
      padding: 2rem;
      background: linear-gradient(
        90deg,
        rgba(227, 10, 10, 0.2),
        rgba(0, 0, 0, 0.5)
      );
      backdrop-filter: blur(2rem);
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    .btnSend {
      
      padding: 12px 8px !important;
      background: #bf0603 !important;
      width: 6rem;
      height: 45.8px;
    }
    .btnSend:hover {
      background: # !important;
    }
    ::selection {
      background-color: ${appConfig.theme.colors.neutrals["200"]};
      color: rgba(0, 0, 0, 1);
    }
    body {
      font-family: "Nunito", sans-serif;
    }

    /* App fit Height */
    html,
    body,
    #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }
    /* ./App fit Height */
  `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  // Esse arquivo vai rodar em todas as páginas, colocar configurações globais aqui
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />
        <title>StrangerCord - HamomSilva</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}