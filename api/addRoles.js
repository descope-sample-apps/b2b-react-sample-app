import DescopeClient from '@descope/node-sdk';
import * as dotenv from "dotenv";

dotenv.config();

export default async function handler(request, response) {
    const projectId = request.headers['x-project-id'] || process.env.REACT_APP_DESCOPE_PROJECT_ID;
    const loginId = request.headers['x-login-id'];

    // when using cookies
    // const cookies = request.cookies;
    // const session_token = cookies.DS; // extract from request. The value is stored typically in DS cookie.

    // when using authorization header
    const header = request.headers['authorization'];
    const session_token = header?.split(" ")[1] ?? "";

    const descopeClient = DescopeClient({
        projectId: projectId,
        baseUrl: process.env.DESCOPE_BASE_URL,
        managementKey: process.env.DESCOPE_MANAGEMENT_KEY
    });

    try {
        await descopeClient.validateSession(session_token);

        // const loginId = jwt.token.loginIds;
        const roleNames = ["Tenant Admin"]

        let resp = await descopeClient.management.user.addRoles(loginId, roleNames)

        response.status(200).json({
            body: {
                resp: resp,
                loginId: loginId
            },
            query: request.query,
            cookies: request.cookies,
        });
    } catch (error) {
        response.status(401).json({
            body: {},
            query: request.query,
            cookies: request.cookies,
        });
    }
    response.send();
}

