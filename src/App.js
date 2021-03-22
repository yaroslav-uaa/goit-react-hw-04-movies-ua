import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation';
import Container from './components/Container';

import Loader from './components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const HomeView = lazy(() => import('./views/HomeView/HomeView'));
const MoviesView = lazy(() => import('./views/MoviesView/MoviesView'));
const MoviesDetailsView = lazy(() =>
  import('./views/MoviesDetailsView/MoviesDetailsView'),
);

function App() {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MoviesDetailsView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={2000} />
    </Container>
  );
}

export default App;
