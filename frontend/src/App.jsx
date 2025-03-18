import { GlobalProvider } from "./context/GlobalContext.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import Header from "./components/Header";
import Navigation from "./components/Navigation.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";
import { useState } from "react";
import SignIn from "./pages/Auth/SignIn.jsx";
import CreateAccount from "./pages/Auth/CreateAccount.jsx";
import CompleteProfile from "./pages/Auth/CompleteProfile.jsx";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("isSignedIn") === "true"
  );


  return (
    <GlobalProvider>
      <UserProvider>
        {!isSignedIn ? (
          <Routes>
            <Route
              path="/signin"
              element={<SignIn onSignInSuccess={() => {
                setIsSignedIn(true)
                localStorage.setItem("isSignedIn", "true");
              }} />}
            />
            <Route path="/create-account" element={<CreateAccount />} />
<<<<<<< HEAD
=======
            <Route path="/create-account/complete-profile" element={<CompleteProfile />} />
>>>>>>> 50dce2a (Sign In session handling, react router, and create account pages UI)
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        ) : (
          <>
            <Navigation setIsSignedIn={setIsSignedIn} />
            <main>
              <Header />
              <section className="main-body">
                <Routes>
                  <Route path="/" element={<UserLayout />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </section>
            </main>
          </>
        )}
      </UserProvider>
    </GlobalProvider>
  );
}

export default App;
