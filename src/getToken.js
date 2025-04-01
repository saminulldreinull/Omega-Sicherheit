// getToken.js
require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const deviceCodeUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/devicecode`;
const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;

(async () => {
  try {
    const deviceCodeResponse = await axios.post(deviceCodeUrl, qs.stringify({
      client_id: process.env.AZURE_CLIENT_ID,
      scope: 'https://graph.microsoft.com/Mail.Send offline_access'
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    console.log(`📲 Öffne: ${deviceCodeResponse.data.verification_uri}`);
    console.log(`🔑 Gib den Code ein: ${deviceCodeResponse.data.user_code}`);

    const interval = deviceCodeResponse.data.interval * 1000;

    const pollForToken = async () => {
      try {
        const tokenResponse = await axios.post(tokenUrl, qs.stringify({
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
          client_id: process.env.AZURE_CLIENT_ID,
          device_code: deviceCodeResponse.data.device_code
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        console.log('✅ Access Token:', tokenResponse.data.access_token);
        console.log('🔁 Refresh Token:', tokenResponse.data.refresh_token);
        // Speichere Tokens z. B. in .token.json
      } catch (err) {
        if (err.response && err.response.data.error === 'authorization_pending') {
          setTimeout(pollForToken, interval);
        } else {
          console.error('❌ Fehler:', err.response?.data || err.message);
        }
      }
    };

    pollForToken();
  } catch (err) {
    console.error('❌ Fehler bei der Initialisierung:', err.response?.data || err.message);
  }
})();