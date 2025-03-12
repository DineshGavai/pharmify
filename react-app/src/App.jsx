import { GlobalProvider } from "./context/GlobalContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Navigation from "./components/Navigation.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";

function App() {

  return (
    <>
      <GlobalProvider >
        <UserProvider >
          <Navigation />
          <main>
            <Header />
            <section className="main-body">
              <UserLayout />
            </section>
          </main>
        </UserProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
