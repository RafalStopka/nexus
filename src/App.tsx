import { MainContainer } from './containers/mainContainer';
import { UserDataProvider } from './hooks/useUserData';

function App() {
  return (
    <UserDataProvider>
      <MainContainer />
    </UserDataProvider>
  );
}

export default App;
