import { Html, Main, Head, NextScript } from "next/document";
import {DocumentHead} from "@/src/shared/DocumentHead";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <DocumentHead/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
