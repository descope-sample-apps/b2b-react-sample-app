import { useSearchParams } from "react-router-dom";

function kebabCaseToCamelCase(str) {
  return str.replace(/-./g, (x) => x.toUpperCase()[1]);
}

const authProviderPrefix = "auth-provider.";

// Custom hook to get the authProvider props from the URL by the prefix "auth-provider."
// If search params are "auth-provider.refresh-cookie-name=DSR1&auth-provider.session-cookie-name=DS1"
// This hook will return { refreshCookieName: "DSR1", sessionCookieName: "DS1" }
export default function useAuthProviderProps() {
  const [searchParams] = useSearchParams();
  // return an object with all the authProvider params
  return Object.fromEntries(
    Array.from(searchParams.entries()).filter(([key]) =>
      key.toLocaleLowerCase().startsWith(authProviderPrefix)
    ).map(([key]) => {
        // remove the "auth-provider." prefix and make it camelCase
        const k =  kebabCaseToCamelCase(key.slice(authProviderPrefix.length))
        const v = searchParams.get(key)
        return [
          k,
          v === "true" ? true : v === "false" ? false : v
        ]
    }),
  );
}
