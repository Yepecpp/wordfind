import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';
import Index from './pages/Index.p';
import Match from './pages/Match.p';
import CreateMatch from './pages/CreateMatch.p';
import NoPage from './pages/NoPage.p';
import GameRoutes from './components/routes/match.routes';
import { MatchProvider } from './contexts/match';
const App = () => {
  return (
    <MatchProvider>
      <Router>
        <Switch>
          <Route element={<GameRoutes />}>
            <Route path="/match" element={<Match />} />
          </Route>
          <Route path="/create" element={<CreateMatch />} />
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NoPage />} />
        </Switch>
      </Router>
    </MatchProvider>
  );
};

export default App;
