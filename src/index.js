//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from 'aws-amplify';
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
/*let awsconfig = {
    Auth: {
        identityPoolId: "us-east-1:a130f516-f9b7-4d0b-82dd-25e248b49511",
        region: "us-east-1",
        userPoolId:  "us-east-1_CALDr4EZA",
        userPoolWebClientId: "79gsrp64vm7vrdh6bk0j8fl20j",
        oauth: {
            domain:"http://newtechcorpauth-dev.auth.us-east-1.amazoncognito.com/",
            scope: ['email', 'openid'],
            //redirectSignIn: "https://master.d36s98jndilz0p.amplifyapp.com/",
            redirectSignIn: "https://newtechcorpauth-dev.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=79gsrp64vm7vrdh6bk0j8fl20j&redirect_uri=http://localhost:3000/",
            redirectSignOut: "https://master.d36s98jndilz0p.amplifyapp.com/",
            responseType: "code"
        }
      },

      aws_appsync_graphqlEndpoint:  "https://wznhygavpfbgdgsy7oibu2g2sq.appsync-api.us-east-1.amazonaws.com/graphql",
      aws_appsync_region: "us-east-1",
      aws_appsync_authenticationType:"AMAZON_COGNITO_USER_POOLS"
}*/
if (isLocalhost) {
  awsconfig.Auth.oauth.redirectSignIn = 'http://localhost:3000/';
  awsconfig.Auth.oauth.redirectSignOut = 'http://localhost:3000/';
}

Amplify.configure(awsconfig);




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
