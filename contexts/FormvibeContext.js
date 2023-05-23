import React, { createContext, useContext } from "react";

const FormVibeContext = createContext(null);

function FormvibeContextProvider({ children }) {
  const login = async () => {};

  const loginWithGithub = async () => {};

  const logout = async () => {};

  const signup = async () => {};

  const exposedValues = {
    login,
    loginWithGithub,
    logout,
    signup,
  };

  return (
    <FormVibeContext.Provider value={exposedValues}>
      {children}
    </FormVibeContext.Provider>
  );
}

export default FormvibeContext;

export const useFormVibeContext = () => useContext(FormVibeContext);
