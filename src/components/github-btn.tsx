import {styled} from "styled-components";
import {GithubAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../routes/firebase";
import {useNavigate} from "react-router-dom";

const Button = styled.span`
  display: flex;
  background-color: white;
  margin-top: 20px;
  width: 100%;
  color: black;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider).then();
      // await signInWithRedirect(auth, provider).then();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={onClick}>
    <Logo src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="github"/>
    Github로 계속하기
  </Button>;
};