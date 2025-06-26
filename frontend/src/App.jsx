import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Navigation from "./components/Navigation.jsx";

import CreateAccount from "./pages/Auth/CreateAccount.jsx";
import CompleteProfile from "./pages/Auth/CompleteProfile.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";

import ProductList from "./pages/Inventory/ProdcutList.jsx";

import { GlobalProvider } from "./context/GlobalContext.jsx";
import { UserContext, UserProvider } from "./context/UserContext.jsx";

import { getCookie, getFromLocalStorage, setCookie } from "./utils/browserStorage.js";
import ProductView from "./pages/Inventory/ProductView.jsx";
import ProductStock from "./pages/Inventory/ProductStock.jsx"
import ProductCreate from "./pages/Inventory/ProductCreate.jsx";



function App() {

  const [isSignedIn, setIsSignedIn] = useState(getCookie("isSignedIn") || false);


  const onSignInSuccess = () => {
    setCookie("isSignedIn", true);
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
            <Route path="/create-account" element={<CreateAccount onSignInSuccess={onSignInSuccess} />} />
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
                  <Route path="/inventory" element={<ProductList />} />
                  <Route path="/inventory/product/:id" element={<ProductView />} />
                  <Route path="/inventory/product/:id/stock" element={<ProductStock />} />
                  <Route path="/inventory/new" element={<ProductCreate />} />
                  <Route path="*" element={<Navigate to="/inventory/" />} />
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
