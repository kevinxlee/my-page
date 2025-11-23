import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/portfolio-website"> {/* Add basename prop */}
    <App />
  </BrowserRouter>,
)