import {auth} from "./firebase.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut()
    .then(() => navigate("/"))
    .catch((e) => console.log("로그아웃 실패:", e))
    // signOut() 용법 참조
    // https://firebase.google.com/docs/auth/web/password-auth?hl=ko
  };

  useEffect(() => {
    console.log("useEffect 동작 시작");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged 실행: " ,user);
      if (user === null) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate])
  return (
      <h1>R
        <button onClick={logOut}>Logout</button>
      </h1>
  );
}