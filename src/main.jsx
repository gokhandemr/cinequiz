import { createRoot } from 'react-dom/client';
// Style
import './global.css';
// Router DOM
import { BrowserRouter } from 'react-router-dom';
// Components
import Header from './components/header/index.jsx';
import App from './App.jsx';
import Footer from './components/footer/index.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <main>
      <App />
    </main>
    <Footer />
  </BrowserRouter>
);
