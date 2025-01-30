import App from './App';
import ReactDOM from 'react-dom/client';
import '../public/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Modal from 'react-modal';

const rootElement = document.getElementById('root');
Modal.setAppElement('#root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure the <div id="root"></div> exists in your HTML.');
}
  
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  