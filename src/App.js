import logo from './logo.svg';
import './App.css';
import Amplify, { API, graphqlOperation , Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import Compose from './component/compose/compose.js'
import Display from './component/display/display.js'
Amplify.configure(awsconfig);
function App() {
  async function handleClick() {
    await Auth.signOut();
  }

  return (
      <div className="background">
          <header>
          </header>
          Welcome to feedback portal !
          <button  onClick={handleClick} >Log Out</button>
          <Compose />
          <Display />
      </div>
  );
}

export default withAuthenticator(App);
