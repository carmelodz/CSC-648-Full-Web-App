// withRoleProtection.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

interface WithRoleProtectionProps {
  allowedRoles: string[];
}

export const withRoleProtection = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WrappedComponent: React.ComponentType<any>,
  options: WithRoleProtectionProps
) => {
  // eslint-disable-next-line react/display-name,@typescript-eslint/no-explicit-any
  return (props: any) => {
    const { user } = useContext(AuthContext);

    if (user === null) {
      return <Navigate to="/SignIn" />;
    }

    if (options.allowedRoles.includes(user.role)) {
      return <WrappedComponent {...props} />;
    }

    return <Navigate to="/" />;
  };
};
