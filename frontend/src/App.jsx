import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Navigation from "./components/Navigation.jsx";

import CreateAccount from "./pages/Auth/CreateAccount.jsx";
import CompleteProfile from "./pages/Auth/CompleteProfile.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";

import InventoryHome from "./pages/Inventory/InventoryHome.jsx";

import { GlobalProvider } from "./context/GlobalContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

import { getFromLocalStorage, saveToLocalStorage } from "./utils/browserStorage.js";



function App() {

  const [isSignedIn, setIsSignedIn] = useState(getFromLocalStorage("isSignedIn") || false);


  const onSignInSuccess = () => {
    saveToLocalStorage("isSignedIn", true);
    setIsSignedIn(true)
  }

  return (
    <GlobalProvider>
      <UserProvider>
        {!isSignedIn ? (
          <Routes>
            <Route
              path="/signin"
              element={<SignIn onSignInSuccess={onSignInSuccess} />}
            />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-account/complete-profile" element={<CompleteProfile onSignInSuccess={onSignInSuccess} />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        ) : (
          <>
            <Navigation setIsSignedIn={setIsSignedIn} />
            <main>
              <Header />
              <section className="main-body">
                <Routes>
                  <Route path="/profile" element={<UserLayout />} />
                  <Route path="/inventory" element={<InventoryHome />} />
                  <Route path="/inventory/new" element={<InventoryHome />} />
                  <Route path="*" element={<Navigate to="/inventory" />} />
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
