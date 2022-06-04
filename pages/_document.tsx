import Document, { Html, Main } from 'next/document';
import { provideComponents } from '@next-safe/middleware/dist/document';

// when running on Vercel, the response header set by middleware
// will be found in req, when serving a prod build with next start, it will be in res
const getCtxHeader = (ctx, header) => {
  return (
    ctx.res?.getHeader(header) ||
    ctx.req?.headers[header] ||
    ''
  ).toString();
};

const CSP_NONCE_HEADER = 'csp-nonce';

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const nonce = getCtxHeader(ctx, CSP_NONCE_HEADER);
  if (nonce) {
    return { ...initialProps, nonce };
  }
  return initialProps;
};

export default function MyDocument(props) {
  const { Head, NextScript } = provideComponents(props);
  return (
    <Html>
      <Head>
        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                forward: ["gtag"]           
              };
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
