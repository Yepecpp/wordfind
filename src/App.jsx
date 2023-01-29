import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';
import Index from './pages/Index.p';
import Match from './pages/Match.p';
import CreateMatch from './pages/CreateMatch.p';
import NoPage from './pages/NoPage.p';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create" element={<CreateMatch />} />
        <Route path="/match" element={<Match />} />
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NoPage />} />
      </Switch>
    </Router>
  );
};

export default App;
