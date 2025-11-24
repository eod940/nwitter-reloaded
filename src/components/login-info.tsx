import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function LoginInfo() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "로그인 정보 없음");
      }
    });
    return () => unsubscribe()
  }, [])

  return (
      <>
        <h2>{userEmail}</h2>
        <Outlet/>
      </>);
}
