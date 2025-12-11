import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Content from './components/Content';
import store from './store/store';

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
