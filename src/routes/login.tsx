import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FirebaseError} from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase.ts";
import {Form, Input, Switcher, Title, Wrapper, Error} from "../components/auth-components.ts";
import GithubButton from "../components/github-btn.tsx";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password).catch();
      navigate("/");
      if (isLoading || email === "" || password === "") {
        return;
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return <Wrapper>
    <Title>𝕏 로그인</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email"
             required/>
      <Input onChange={onChange} name="password" value={password} placeholder="Password"
             type="password" required/>
      <Input type="submit" value={isLoading ? "Loading..." : "Login"}
             disabled={isLoading}/>
    </Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
      계정이 없으신가요? &nbsp;
      <Link to="/create-account">회원가입하러 가기 &rarr;</Link>
    </Switcher>
    <GithubButton/>
  </Wrapper>;
};