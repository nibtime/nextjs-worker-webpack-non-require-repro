import '../styles/globals.css';
import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX';

const gTagInitInline = `
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_TRACKING_ID}', {
	page_path: window.location.pathname,
});
`;

const GoogleAnalyticsWebWorker = () => (
  <>
    <Script id="gtag-init" strategy="worker">
      {gTagInitInline}
    </Script>
    <Script
      id="gtag"
      strategy="worker"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
  </>
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalyticsWebWorker />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
