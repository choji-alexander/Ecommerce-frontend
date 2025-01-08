export const loginRequest = {
    scopes: ["user.read", 'Mail.Read', 'openid', 'profile', 'offline_access'],
  };

  // authConfig.js
export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",  // Replace with your actual client ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",  // Your redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage",  // Or "localStorage"
    storeAuthStateInCookie: false, // Set to true for IE11 support
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, piiEnabled) => {
        if (level <= 2) {
          console.log(message);
        }
      },
      logLevel: "info", // Adjust the log level as needed
      piiLoggingEnabled: false, // Set to true to include personally identifiable information
    },
  },
};

  