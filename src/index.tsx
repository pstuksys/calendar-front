import App from './App';
import ReactDOM from 'react-dom/client';
import '../public/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Modal from 'react-modal';
import ModalLayout from './ModalLayout';
import CustomLocalizationProvider from './components/custom/localization-provider';

import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const rootElement = document.getElementById('root');
Modal.setAppElement('#root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure the <div id="root"></div> exists in your HTML.');
}
  
  const root = ReactDOM.createRoot(rootElement);

  
  root.render(
   <CustomLocalizationProvider>
    <Provider store={store}>
      <ModalLayout>
        <App />
      </ModalLayout>
    </Provider>
   </CustomLocalizationProvider>
  );

  