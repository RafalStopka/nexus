import { Grid } from './components/grid';
import { UserData } from './containers/userData';
import { UserDataProvider } from './hooks/useUserData';

function App() {
  return (
    <UserDataProvider>
      <UserData />
      <Grid />
    </UserDataProvider>
  );
}

export default App;
