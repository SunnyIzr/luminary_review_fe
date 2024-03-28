import { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserData } from '@/context/UserContext';
const { root_domain } = require("@/constants/root_url");

export const UserDataFetcher = ({ children }) => {
    const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
    const { setUserName, setLastName, setAccessibleTiers, setEmail, isLoggedIn, setIsLoggedIn } = useUserData();

    useEffect(() => {
        const fetchUserData = async () => {
          console.log('RUNNING DATA FETCHING!')
            try {
                const accessToken = await getAccessTokenSilently({
                  audience: `luminary-review-api.com`,
                  scope: "read:current_user",
              })
              console.log('accessToken', accessToken)

                const response = await fetch(`${root_domain}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const userData = await response.json();
                console.log("setting user data")
                console.log('user data :', userData)
                console.log('firstname :', userData.first_name)
                console.log('ats :', userData.accessible_content_tiers)
                setUserName(userData.first_name);
                setLastName(userData.last_name);
                setEmail(userData.email);
                setAccessibleTiers(userData.accessible_content_tiers);
                setIsLoggedIn(true);
            } catch (error) {
                console.log("ERROR!")
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            }
        };

        if (isAuthenticated) {
          console.log('isAuthenticated', isAuthenticated)
            fetchUserData();
        }
    }, [isAuthenticated, getAccessTokenSilently, setUserName, setAccessibleTiers, user]);

    return <>{children}</>;
};
