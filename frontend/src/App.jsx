import { GlobalProvider, GlobalContext } from "./context/GlobalContext.jsx";
import { UserContext, UserProvider } from "./context/UserContext.jsx";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Navigation from "./components/Navigation.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";
import { useState } from "react";
import { useContext } from "react";
import SignIn from "./pages/Auth/SignIn.jsx";
import CreateAccount from "./pages/Auth/CreateAccount.jsx";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <GlobalProvider >
        <UserProvider >
          {/* If not Signed In */}
          {
            !isSignedIn &&
            <>
              <SignIn />
              <CreateAccount />
            </>
          }

          {/* If Signed In */}
          {
            isSignedIn &&
            <>
              <Navigation />
              <main>
                <Header />
                <section className="main-body">
                  <UserLayout />
                </section>
              </main>
            </>
          }
        </UserProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
