import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from 'next/link'
import { useUserData } from '@/context/UserContext';
import { useAuth0 } from "@auth0/auth0-react";
const { root_domain } = require("@/constants/root_url");

export default function Account() {
  const { userName, lastName, email } = useUserData();
  const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
  }, []);

  const fetchPortalSessionUrl = async () => {
    // Make a request to fetch user name using the token
    // Replace the URL with your actual API endpoint
    const accessToken = await getAccessTokenSilently({
        audience: `luminary-review-api.com`,
        scope: "read:current_user",
    })

    fetch(`${root_domain}/users/stripe_portal`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }, 
        method: "POST",
        body: JSON.stringify({ return_url: window.location.origin + '/account'})
    })
    .then(response => response.json())
    .then(data => {
        console.log('portal data', data)
        window.location.href = data.url;
    })
    .catch(error => {
        console.error('Error fetching user name:', error);
    });
};

  return (
    <>
      <Layout headerStyle={2} footerStyle={2} footerClass="black-bg border-top-none">
        <div className="container" style={{marginTop: 60, maxWidth: 750, marginBottom: 60}}>
          <h2>My Account</h2>
          
          <div className="account-section">
            <div className="account-header">
              <h4>Basic Information</h4>
            </div>
            <div className="account-body">
              <div className="account-row">
                <label className="account-label">First Name</label>
                <span className="account-value">{userName}</span>
              </div>
              <div className="account-row">
                <label className="account-label">Last Name</label>
                <span className="account-value">{lastName}</span>
              </div>
              <div className="account-row">
                <label className="account-label">Email</label>
                <span className="account-value">{email}</span>
              </div>
              <div className="account-row">
                <label className="account-label">Your Subscription</label>
                <span className="account-value"><Link href='#' onClick={fetchPortalSessionUrl}>Manage Plan</Link></span>
              </div>
            </div>
          </div>

          <div className="account-section">
            <div className="account-header">
              <h4>Payment Methods</h4>
            </div>
            <div className="account-body">
              <div className="account-row">
                <label className="account-label">Payment Method</label>
                <span className="account-value">Visa ending in 1234</span>
              </div>
            </div>
          </div>

          <div className="account-section">
            <div className="account-header">
              <h4>Billing History (Dummy Data)</h4>
            </div>
            <div className="account-body">
              <div className="account-row">
                <label className="account-label">Date</label>
                <label className="account-label">Amount</label>
              </div>
              <div className="account-row">
                <span className="account-value">January 1, 2021</span>
                <span className="account-value">$10.00</span>
              </div>
              <div className="account-row">
                <span className="account-value">February 1, 2021</span>
                <span className="account-value">$10.00</span>
              </div>
              <div className="account-row">
                <span className="account-value">March 1, 2021</span>
                <span className="account-value">$10.00</span>
              </div>
            </div>
          </div>



          <style jsx>{`
            .account-section {
              background: #fff;
              margin-top: 35px;
              margin-bottom: 35px;
              padding: 20px 30px;
              border: 1px solid #eee;
            }
            .account-header h4 {
              margin-bottom: 16px;
              color: #333;
            }
            .account-body {
              display: flex;
              flex-direction: column;
            }
            .account-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .account-label {
              font-weight: 600;
              color: #555;
            }
            .account-value {
              color: #777;
            }
          `}</style>
        </div>
      </Layout>
    </>
  );
}
