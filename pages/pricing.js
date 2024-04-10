import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
const { root_domain } = require("@/constants/root_url");

export default function Account() {

  return (
    <>
      <Layout headerStyle={2} footerStyle={2} footerClass="black-bg border-top-none">
        <div className="container" style={{marginTop: 60, maxWidth: 750, marginBottom: 60}}>
        </div>
      </Layout>
    </>
  );
}
