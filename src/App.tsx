import { Provider } from 'react-redux';
import { MantineProvider, AppShell } from '@mantine/core';
import { store } from './store/store';
import { CalendarComponent } from './components/Calendar';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  console.log('App component rendered');
  
  return (
    <Provider store={store}>
      <MantineProvider>
        <AppShell>
          <CalendarComponent />
        </AppShell>
      </MantineProvider>
    </Provider>
  );
}

export default App;
