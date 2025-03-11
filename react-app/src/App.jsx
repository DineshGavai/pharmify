import { GlobalProvider } from "./context/GlobalContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Navigation from "./components/Navigation.jsx";

function App() {

  return (
    <>
      <GlobalProvider >
        <UserProvider >
          <Header />
          <Navigation />
        </UserProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
