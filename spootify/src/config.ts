const config = {
  clientId: "adbd25adf6f14d2e9c2974b495c1040d",
  clientSecret: "01beb8d02e6b499ca7426f5786a38aa4",
  scopes: ["user-read-private", "user-read-email"],
  redirectUrl: "http://localhost:3000",
  api: {
    baseUrl: "https://api.spotify.com/v1",
    authUrl: "https://accounts.spotify.com/api/token",
  },
};

export default config;
