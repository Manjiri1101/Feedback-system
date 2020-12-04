import logo from './logo.svg';
import './App.css';
import Amplify, { API, graphqlOperation , Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Button from 'react-bootstrap/Button';
import Compose from './component/compose/compose.js'
import Display from './component/display/display.js'
import { Navbar } from 'react-bootstrap';
Amplify.configure(awsconfig);
function App() {
  async function handleClick() {
    await Auth.signOut();
  }

  return (
    <div>

    <Navbar bg="dark" variant="dark" className="justify-content-between" >
    <Navbar.Brand>Techcorp    </Navbar.Brand>
    <Navbar.Brand>
      Feedback portal
    </Navbar.Brand>
    <Button variant="secondary"   onClick={handleClick} >Log Out</Button>
    </Navbar>
      <div className="background">

          <header>
          
          </header>
          
          
          <Compose />
          <Display />
      </div>
      </div>
  );
}

export default withAuthenticator(App);
//<h1 className="large">Welcome to feedback portal !</h1>