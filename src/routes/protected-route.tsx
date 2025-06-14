import * as React from "react";
import {auth} from "./firebase.ts";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children} : {children:React.ReactNode}) {

  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
};