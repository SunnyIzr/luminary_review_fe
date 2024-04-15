import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from 'next/link'
import { useUserData } from '@/context/UserContext';
import { useAuth0 } from "@auth0/auth0-react";
const { root_domain } = require("@/constants/root_url");

export default function Account() {
  const { userName, lastName, email } = useUserData();
  const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [selectedTab, setSelectedTab] = useState('Account');

  useEffect(() => {
  }, []);

  const fetchPortalSessionUrl = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `luminary-review-api.com`,
      scope: "read:current_user",
    });

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
      window.location.href = data.url;
    })
    .catch(error => {
      console.error('Error fetching user name:', error);
    });
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={2} footerClass="black-bg border-top-none">
        <div className="container" style={{marginTop: 60, maxWidth: 1200, marginBottom: 60}}>
          <h2>Settings</h2>
          <div className="tabs">
            <button onClick={() => setSelectedTab('Account')}>Account</button>
            <button onClick={() => setSelectedTab('Subscription')}>Subscription</button>
            <button onClick={() => setSelectedTab('Notifications')}>Notifications</button>
            <button onClick={() => setSelectedTab('Security')}>Security</button>
          </div>

          {selectedTab === 'Account' && (
            <div className="main-account-section">
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
                  {/* <div className="account-row">
                    <label className="account-label">Your Subscription</label>
                    <span className="account-value"><Link href='#' onClick={fetchPortalSessionUrl}>Manage Plan</Link></span>
                  </div> */}
                </div>
              </div>

              {/* <div className="account-section">
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
              </div> */}
            </div>
          
          )}
          {selectedTab === 'Subscription' && (
            <div className="subscription-section">
              <p>Subscription details will go here.</p>
            </div>
          )}
          {selectedTab === 'Notifications' && (
            <div className="notifications-section">
              <p>Notification settings will go here.</p>
            </div>
          )}
          {selectedTab === 'Security' && (
            <div className="security-section">
              <p>Security settings will go here.</p>
            </div>
          )}

          <style jsx>{`
            .tabs button {
              margin-right: 10px;
              padding: 8px 16px;
              border: none;
              background-color: #f0f0f0;
              cursor: pointer;
            }
            .tabs button:focus, .tabs button:hover {
              background-color: #ddd;
            }
            .account-section, .subscription-section, .notifications-section, .security-section {
              background: #fff;
              margin-top: 35px;
              margin-bottom: 35px;
              padding: 20px 30px;
              border: 1px solid #eee;
            }
            .account-header h4, .subscription-header h4, .notifications-header h4, .security-header h4 {
              margin-bottom: 16px;
              color: #333;
            }
            .account-body, .subscription-body, .notifications-body, .security-body {
              display: flex;
              flex-direction: column;
            }
            .account-row, .subscription-row, .notifications-row, .security-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .account-label, .subscription-label, .notifications-label, .security-label {
              font-weight: 600;
              color: #555;
            }
            .account-value, .subscription-value, .notifications-value, .security-value {
              color: #777;
            }
          `}</style>
        </div>
      </Layout>
    </>
  );
}
