//render page
//client/index.js
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { DarkModeProvider } from './DarkModeContext';

const root = createRoot(document.getElementById('root'));
root.render( <DarkModeProvider><App /></DarkModeProvider>);

