import {useState} from "react";
import {auth} from "./firebase.ts";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {FirebaseError} from "firebase/app";
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
      if (isLoading || email === "" || password === "") {
        return;
      }
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
    console.log(email, password);
  }

  return <Wrapper>
    <Title>𝕏 계정 만들기</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email"
             required/>
      <Input onChange={onChange} name="password" value={password} placeholder="Password"
             type="password" required/>
      <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}
             disabled={isLoading}/>
    </Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
      계정이 있으신가요? &nbsp;
      <Link to="/login">로그인하러 가기 &rarr;</Link>
    </Switcher>
    <GithubButton/>
  </Wrapper>;
};