import {auth} from "./firebase.ts";

export default function Home() {
  const logOut = () => {
    auth.signOut().then(() => {
      window.location.reload();  // 새로고침 안하면 화면이 안바뀜
    });
    // signOut() 용법 참조
    // https://firebase.google.com/docs/auth/web/password-auth?hl=ko
  };
  return (
      <h1>
        <button onClick={logOut}>Logout</button>
      </h1>
  );
}