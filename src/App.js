import React from 'react';
import './App.css';
import VideoChat from './VideoChat';

import DebateCardList from './components/DebateCardList';
import DebateTopicList from './components/DebateTopicList';
import DebateDetails from './components/DebateDetails';
import DebateCreation from './components/DebateCreation';
import DebateSignUp from './components/DebateSignUp';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

let colors = ["#fcf8ec", "#d0e8f2", "#79a3b1", "#456268"]

const App = () => {
  return (
    <div className="app">
      <main>
        <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/topics' component={() => <DebateTopicList colors={colors}/>} exact />
        <Route path='/topics/:topicName' component={() =><DebateCardList colors={colors}/>} exact />
        <Route path='/topics/:topicid/:id/details' component={() =><DebateDetails colors={colors}/>}  exact/>
        <Route path='/topics/:topicid/:title/signup' component={() =><DebateSignUp/>} exact />
        <Route path='/newDebate' component={() =><DebateCreation/>} />
        <Route path='/debateStream' component={() =><VideoChat />} />
      </Switch>
      </main>
    </div>
  );
};

export default App;
