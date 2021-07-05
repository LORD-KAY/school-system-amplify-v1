
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'

import Header from './Components/Header';

import { Route, Switch } from 'react-router-dom'
import EditStudent from './Components/EditStudent';
import HomePage from './Components/HomePage';
function App() {



  return (
    <div className="App">
      <Header />


      {/* App routes */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/studentEdit/:student" component={EditStudent} />
      </Switch>

      {/* </div> */}

    </div>
  );
}

export default withAuthenticator(App);
