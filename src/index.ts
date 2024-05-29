import axios from 'axios';
import * as forge from 'node-forge';

export interface JWTTokenResponse  {
  access_token: string,
  expires_in: number,
  token_type: string 
}
export interface APIResponse  {
  isSuccess: boolean,
  message: string,
  resultData: string 
}

//const baseUrl = 'https://localhost:44353';//url
//const baseUrl = 'https://localhost:44361';//leslinqapi
const baseUrl = 'https://localhost:44325';//leslinqapiLRS

async function getAccessToken(encryptedObj: string): Promise<JWTTokenResponse> {
  const getTokenEndpoint = baseUrl + '/api/token';

  // const formData = new URLSearchParams();
  // formData.append('data', encryptedObj);
  // formData.append('grant_type', "password");
  // formData.append('client_id', "DEVpX5eY9rTqV2bD3F");
  // formData.append('client_secret', "DEV1d7Rf2Kp9Yx8V3W");

  try {
    const response = await axios.post(
      getTokenEndpoint,
      {
        data: encryptedObj,
        grant_type: 'password',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch access token');
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

async function getApiResponse(token: string): Promise<string> {
  const formData = {
    url: 'https://leslinq2ddd.grafioffshorenepal.com.np/Projects/View?id=IRK3BIQc0QVon91VwHPaGA==',
  };
  const getTokenEndpoint = baseUrl + '/api/LinkShortner';

  try {
    const response = await axios.post(getTokenEndpoint, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      throw new Error('Failed to fetch access token');
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

async function main() {
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6E1byaRTXm7f3X2Yvwb4
    1+apYiRZQq0YlA39f1MHkGpLiPvbKLGkZmGTlGksziImb1osnpkyZQbOm8g47Z/Z
    7aphQIP4344j+7ivdLURbnhUp8MDxnta9uLIgFouxa+Lq9dYsvIeMF+Lf9Y8JZTA
    yyxPmSCbMpVldbbLtajY3oZQhou03UnhZyhj98ETU1YwEXWu75YXAqKPMcD3goQt
    1KMgKlaLAc/E/yyWu+idlaofcQzwXqVGUW623+j+9cV7EYOleE3hYqYuERfyMF8b
    Citlz1WD4Rv0J2XWyghfRX9PUE+BviYX6OGo5uG8Dq583a06NxQXV9vw7CmLzOu1
    zwIDAQAB
    -----END PUBLIC KEY-----`;

  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const obj = {
    apiKey: 'DEVpX5eY9rTqV2bD3F',
    dateTimeUTC: new Date().toISOString(),
  };

  const jsonStr = JSON.stringify(obj);
  const encryptedObj = window.btoa(publicKey.encrypt(jsonStr));

  console.log(
    '%c -------------------------------------Frontend-------------------------------------',
    'background-color:red; color: white; font-size:20px',
  );
  console.log(
    '%c Plaintext:',
    'background-color:red; color: white; font-size:15px',
    obj,
  );
  console.log(
    '%c Encrypted of above Plain Text with public Key:',
    'background-color:red; color: white; font-size:15px',
    encryptedObj,
  );

  console.log(
    '%c -------------------------------------Backend-------------------------------------',
    'background-color:blue; color: white; font-size:20px',
  );
  try {
    const accessToken = await getAccessToken(encryptedObj);
    console.log(accessToken.access_token);
    console.log(
      '%c OAuth JWT Refresh Token:',
      'background-color:blue; color: white; font-size:15px',
      accessToken,
    );
    const apiResponse = await getApiResponse(accessToken.access_token);
    console.log(
      '%c Api response with token:',
      'background-color:blue; color: white; font-size:15px',
      apiResponse,
    );
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
}

main();
