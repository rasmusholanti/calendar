import { MantineProvider, AppShell } from '@mantine/core';
import { CalendarComponent } from './components/Calendar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  console.log('App component rendered');
  
  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
        <Header />
        <AppShell.Main>
          <div style={{ padding: '2rem' }}>
            <CalendarComponent />
          </div>
        </AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
