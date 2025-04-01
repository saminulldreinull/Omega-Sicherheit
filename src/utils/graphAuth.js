const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const tokenPath = path.resolve(__dirname, "../../token.json");

async function getAccessToken() {
  if (fs.existsSync(tokenPath)) {
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (tokenData.expires_at > now) {
      console.log("🔐 Verwende gespeicherten Access Token");
      return tokenData.access_token;
    } else {
      console.log("🔁 Token abgelaufen. Versuche Refresh...");
      return await refreshToken(tokenData.refresh_token);
    }
  } else {
    return await authenticateWithDeviceCode();
  }
}

async function authenticateWithDeviceCode() {
  const deviceCodeRes = await axios.post(
    `https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode`,
    new URLSearchParams({
      client_id: process.env.AZURE_CLIENT_ID,
      scope: "offline_access Mail.Send Mail.ReadWrite Mail.Read"
    })
  );

  console.log(`\n🔐 Bitte öffne die folgende URL in deinem Browser:\n${deviceCodeRes.data.verification_uri}`);
  console.log(`🧠 Und gib diesen Code ein: ${deviceCodeRes.data.user_code}`);

  const interval = deviceCodeRes.data.interval * 1000;

  return new Promise((resolve, reject) => {
    const poll = setInterval(async () => {
      try {
        const tokenRes = await axios.post(
          `https://login.microsoftonline.com/consumers/oauth2/v2.0/token`,
          new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            client_id: process.env.AZURE_CLIENT_ID,
            device_code: deviceCodeRes.data.device_code
          })
        );

        clearInterval(poll);

        const expires_at = Math.floor(Date.now() / 1000) + tokenRes.data.expires_in;
        fs.writeFileSync(
          tokenPath,
          JSON.stringify({ ...tokenRes.data, expires_at }, null, 2)
        );

        console.log("✅ Authentifizierung erfolgreich! Access Token gespeichert.");
        resolve(tokenRes.data.access_token);
      } catch (error) {
        if (error.response && error.response.data.error !== "authorization_pending") {
          clearInterval(poll);
          reject(error);
        }
      }
    }, interval);
  });
}

async function refreshToken(refresh_token) {
  try {
    const res = await axios.post(
      `https://login.microsoftonline.com/consumers/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.AZURE_CLIENT_ID,
        refresh_token,
        scope: "offline_access Mail.Send Mail.ReadWrite Mail.Read"
      })
    );

    const expires_at = Math.floor(Date.now() / 1000) + res.data.expires_in;
    fs.writeFileSync(tokenPath, JSON.stringify({ ...res.data, expires_at }, null, 2));

    console.log("🔁 Refresh erfolgreich");
    return res.data.access_token;
  } catch (error) {
    console.error("❌ Fehler beim Refresh. Starte neue Authentifizierung.");
    return await authenticateWithDeviceCode();
  }
}

module.exports = getAccessToken;