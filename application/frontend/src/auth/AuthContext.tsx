import React, { createContext, useState, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
/* eslint import/no-relative-packages: "off" */
import apiClient from "../sdk/safetyHubAPI/ApiClient";
import { IProfile } from "../sdk/safetyHubAPI/auth/types";

interface AuthContextData {
  user: IProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  login: () => {},
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  logout: () => {},
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  fetchUser: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IProfile | null>(null);
  const toast = useToast();
  const nav = useNavigate();

  function fetchUser() {
    apiClient.auth
      .getProfile()
      .then((userData) => {
        setUser(userData);
        nav("/Map");
      })
      .catch(() => {
        setUser(null);
      });
  }
  const login = (email: string, password: string) => {
    apiClient.auth
      .login(email, password)
      .then(() => {
        fetchUser();
        toast({
          title: `Login successfully welcome ${email}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `${error.response.status} ${error.response.statusText}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const logout = () => {
    apiClient.auth
      .logout()
      .then(() => {
        setUser(null);

        toast({
          title: `Logout success`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `${error.response.status} ${error.response.statusText}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
