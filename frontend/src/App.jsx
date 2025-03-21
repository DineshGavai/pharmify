import { GlobalProvider } from "./context/GlobalContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Header from "./components/Header";
import Navigation from "./components/Navigation.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";
import { useState, useEffect } from "react";
import SignIn from "./pages/Auth/SignIn.jsx";
import CreateAccount from "./pages/Auth/CreateAccount.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("isSignedIn") === "true"
  );

  // Handle Sign-In
  const handleSignInSuccess = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true");
  };

  // Handle Sign-Out
  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("isSignedIn");
  };

  return (
    <GoogleOAuthProvider clientId="452648896308-f63luqd4l007jbd0i334ubejqssus4om.apps.googleusercontent.com">
      <GlobalProvider>
        <UserProvider>
          {/* If Not Signed In */}
          {!isSignedIn ? (
            <>
              <SignIn onSignInSuccess={handleSignInSuccess} />
              <CreateAccount />
            </>
          ) : (
            // If Signed In
            <>
              <Navigation />
              <main>
                <Header />
                <section className="main-body">
                  <UserLayout />
                </section>
                {/* Add Sign-Out Button */}
                <button onClick={handleSignOut} className="logout-btn">
                  Sign Out
                </button>
              </main>
            </>
          )}
        </UserProvider>
      </GlobalProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
