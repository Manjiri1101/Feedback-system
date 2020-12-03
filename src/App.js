import logo from './logo.svg';
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
Amplify.configure(awsconfig);


function App() {
  return (
    <div >
      <header >
      <AmplifySignOut />
      </header>
      Welcome to feedback portal !
      
    </div>
  );
}

export default withAuthenticator(App);
