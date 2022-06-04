import Document, { Html, Main } from 'next/document';
import { provideComponents } from '@next-safe/middleware/dist/document';

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
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
