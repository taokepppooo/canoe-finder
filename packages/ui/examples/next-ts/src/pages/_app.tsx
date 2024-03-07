import type { AppProps } from "next/app";
// import '../../../../style/index.css'
// import '../styles/index.css'
// import '../../../../style/theme/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
