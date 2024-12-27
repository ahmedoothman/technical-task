import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/navbar';
import { Provider } from 'react-redux';
import store from '@/store';
import Notification from '@/components/Notification';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Notification />
      <Component {...pageProps} />
    </Provider>
  );
}
