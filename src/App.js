import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Base64_Route from './Routes/Base64/Base64_Route';
import NotFound from './Routes/NotFound/NotFound';
import URL_Route from './Routes/URL_Encode/URL_Encode';
import JSON_Route from './Routes/JSON_Minify/JSON_Minify';
import JS_Route from './Routes/JS_Minify/JS_Minify';
import CSS_Route from './Routes/CSS_Minify/CSS_Minify';

function App() {
  return (
    <div className="App">
      <Router> {/* needed for routing the pages, specifies paths to components, and allows routing to be executed */}
      <Header />
        <Switch>
          <Route path="/urlencode" exact component={URL_Route} />
          <Route path="/jsonminify" exact component={JSON_Route} />
          <Route path="/jsminify" exact component={JS_Route} />
          <Route path="/cssminify" exact component={CSS_Route} />
          <Route path="/" exact component={Base64_Route} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
