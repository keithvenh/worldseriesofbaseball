import { BrowserRouter as Router } from 'react-router-dom';

import Header from './header/Header';

import CreateRoutes from './Routes.jsx';

export default function App() {
  const routes = CreateRoutes();

  return (
    <Router>
      <div className='App'>

        <Header />

        <main>

          { routes }
        
        </main>

        <footer>

        </footer>

      </div>
    </Router>
  );
}