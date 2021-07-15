
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'



import { Route, Switch } from 'react-router-dom'
import EditStudent from './Components/EditStudent';
import HomePage from './Components/HomePage';

function App() {



  return (
    <div className="App">

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/studentEdit/:student" component={EditStudent} />
      </Switch>
    </div>
  );
}

export default withAuthenticator(App);
