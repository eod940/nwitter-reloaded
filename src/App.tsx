import {createBrowserRouter} from "react-router"
import Layout from "./components/layout.tsx";
import Home from "./routes/home.tsx";
import Profile from "./routes/profile.tsx";
import {RouterProvider} from "react-router-dom";
import Login from "./routes/login.tsx";
import CreateAccount from "./routes/create-account.tsx";
import {createGlobalStyle, styled} from "styled-components";
import reset from "styled-reset";
import {useEffect, useState} from "react";
import LoadingScreen from "./components/loading-screen.tsx";
import {auth} from "./routes/firebase.ts";
import ProtectedRoute from "./routes/protected-route.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>),
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/create-account",
    element: <CreateAccount/>
  }
]);

const GlobalStyle = createGlobalStyle`
  ${reset}

  ;
  * {
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystenFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady()
    setTimeout(() => setLoading(false), 0);
  };
  useEffect(() => {
    init().then(r => console.log(r));
  }, []);

  return <>
    <Wrapper>
      <GlobalStyle/>
      {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
    </Wrapper>
  </>;
}

export default App;