import App from './App';
import ReactDOM from 'react-dom/client';
import '../public/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Modal from 'react-modal';
import Layout from './Layout';
import CustomLocalizationProvider from './components/custom/localization-provider';

const rootElement = document.getElementById('root');
Modal.setAppElement('#root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure the <div id="root"></div> exists in your HTML.');
}
  
  const root = ReactDOM.createRoot(rootElement);

  
  root.render(
   <CustomLocalizationProvider>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
   </CustomLocalizationProvider>
  );

  