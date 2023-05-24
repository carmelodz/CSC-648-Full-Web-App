import React, { useContext, useEffect } from "react";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ChakraProps,
} from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { mode } from "@chakra-ui/theme-tools";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import MapPage from "./components/pages/map/MapPage";
import AlertAdminPanel from "./components/pages/admin/AdminPanel";
import AboutPage from "./components/pages/about-us/About";
import AboutPeople from "./components/pages/about-us/AboutPeople";
import SignIn from "./components/pages/login/SignIn";
import Register from "./components/pages/register/Register";
import PasswordChange from "./components/pages/password_change/PasswordChange";
import { Home } from "./components/pages/home/Home";
import { Contact } from "./components/pages/contact/Contact";
import { History } from "./components/pages/history/History";
import { AuthContext } from "./auth/AuthContext";
import { withRoleProtection } from "./auth/ProtectedRoute";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  styles: {
    global: (props: ChakraProps) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
        color: mode("gray.900", "gray.50")(props),
      },
    }),
  },
});

const ProtectedAlertAdminPanel = withRoleProtection(AlertAdminPanel, {
  allowedRoles: ["ADMIN", "DIRECTOR_COUNTY"],
});

const ProtectedMapPage = withRoleProtection(MapPage, {
  allowedRoles: ["USER", "ADMIN", "DIRECTOR_COUNTY"],
});

function App() {
  const location = useLocation();
  const isMapPage = location.pathname === "/Map";
  const { fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<ProtectedAlertAdminPanel />} />
          <Route path="/History" element={<History />} />
          <Route path="/Map" element={<ProtectedMapPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/PasswordChange" element={<PasswordChange />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/about-us/:id" element={<AboutPeople />} />
        </Routes>
        {isMapPage ? null : <Footer />}
      </ChakraProvider>
    </>
  );
}

export default App;
