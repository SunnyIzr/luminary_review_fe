import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
const { root_domain } = require("@/constants/root_url");

export default function Account() {

  return (
    <>
      <Layout headerStyle={2} footerStyle={2} footerClass="black-bg border-top-none">
        <div className="container"id="lightswitch-pricing"></div>
      </Layout>
    </>
  );
}
