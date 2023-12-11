import React, { useEffect } from "react";
import "./invitation.scss";
import { useSession, useDescope } from '@descope/react-sdk';
import { useNavigate, useSearchParams } from "react-router-dom";

// This component is used to verify the token sent in the invitation email
// and redirect the user to the sign in page if the token is valid
const Invitation = () => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("t");
	const [verifyError, setVerifyError] = React.useState(false);
	const sdk = useDescope();

  useEffect(() => {
		// automatically redirect to home page if user is already logged in
    if (!isSessionLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isSessionLoading, navigate]);


	useEffect(() => {
		if (sdk && token) {
			const verifyToken = async () => {
				const res = await sdk.magicLink.verify(token);
				if (!res.ok) {
					console.log(res.error);
					setVerifyError(true);
				}
			}

			verifyToken().catch(e => {
				console.log(e);
				setVerifyError(true);
			});
		}
	}, [token, sdk]);

  return (
    <div className="invitation-wrapper">
        {
					!token && 'This page is not accessible without a token'
				}
				{
					token && verifyError ?
						'oops! something went wrong' : 'verifying...'
				}
    </div>
  );
};

export default Invitation;
