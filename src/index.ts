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
const baseUrl = 'https://llapi.grafioffshorenepal.com.np';//leslinqapi
//const baseUrl = 'https://localhost:44325';//leslinqapiLRS
//step 2
async function getAccessToken(encryptedObj: string): Promise<JWTTokenResponse> {
  const getTokenEndpoint = baseUrl + '/api/token';

  // const formData = new URLSearchParams();
  // formData.append('data', encryptedObj);
  // formData.append('grant_type', "password");
  // formData.append('client_id', "DEVpX5eY9rTqV2bD3F");
  // formData.append('client_secret', "DEV1d7Rf2Kp9Yx8V3W");

  var data = {
    data: encryptedObj,
    grant_type: 'password',
  }
  
  try {
    const response = await axios.post(
      getTokenEndpoint,
      data,
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
  
  
//   var ss  =   
//   {
//       data: encryptedObj,
//       grant_type: 'password',
//     };

//     var postData = JSON.stringify(ss);
//     var formData = new FormData();
//     formData.append("postData",postData );

// const xhr = new XMLHttpRequest();
// xhr.open("POST", "https://llapi.grafioffshorenepal.com.np/api/token",false);
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
// xhr.send(formData);
// debugger
// xhr.onload = () =>{
//   debugger
//   console.log(xhr.response);
//   return xhr.response;
// }

}

//step 2

//step3
async function getApiResponse(token: string): Promise<string> {
  const formData = {
    url: 'https://leslinq2ddd.grafioffshorenepal.com.np/Projects/View?id=IRK3BIQc0QVon91VwHPaGA==',
  };
  //const getTokenEndpoint = baseUrl + '/api/LinkShortner';
  const getTokenEndpoint = baseUrl + '/api/Language/GetList';

  try {
    // const response = await axios.post(getTokenEndpoint, formData, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = await axios.get(getTokenEndpoint, {
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
//step3

//Open SSL
async function main() {

  //step1
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs4Jlhub5HCvqpgv6lVfq
  cjk6ILGM5FmYj/tx6Uz3ubbwRrzGUBvsacrvpTcxkK4VuyWHFcp2zpXZtltQQmne
  Vx9rqyiNfdzjlZJs+qssnzxgvTyEWyFcfHm/D/Ot+czc2tRxDB3cxLZz6H++pIuX
  DtGggHnQiZcuUrDbPnt5Xbs0iJakMYunRKVl5juKc+nSeQxoYeAtlcDLcl/ex0fm
  Q5Kt9xJCluJwA8LIJ2ZokNwxJzErwR13LwFW7i8tDgUGal00UyajzxZCxC46fOJK
  3Iya6eh5k/y4TZ0N9cC+w98nn4IjZiZmt43oDej8tW9go4bwhbq4QBzIZBORFgvJ
  2wIDAQAB
  -----END PUBLIC KEY-----`;

  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const obj = {
    apiKey: 'njA4E1F486#9Otjm37h)7Rq1ULesPZFYs7(GJiP5ta',
    dateTimeUTC: new Date().toISOString(),
  };

  const jsonStr = JSON.stringify(obj);
  const encryptedObj = window.btoa(publicKey.encrypt(jsonStr));
//step 1
console.log(publicKey.encrypt(jsonStr), "asdfdasssssss")
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
