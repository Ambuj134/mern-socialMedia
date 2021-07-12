import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  user: {
    _id: "60e3ecebe2dfb638b4e6e281",
    profilePicture: "person/11.jpg",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
    username: "ambuj kumar",
    email: "ambuj@gmail.com",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
