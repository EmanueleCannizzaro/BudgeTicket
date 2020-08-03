import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signIn } from "../reducks/users/operations";
import { TextInput, Button } from "../components/atoms";
import Box from '@material-ui/core/Box';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <div>
      <h2>Sign In</h2>

      <TextInput
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"Password"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <Box p={1} bgcolor="background.paper" />
      <Button
        label={"Sign In"}
        color="primary"
        onClick={() => dispatch(signIn(email, password))}
      />
      <p onClick={() => dispatch(push("/signup"))}>Create new account</p>
      <p onClick={() => dispatch(push("/signin/reset"))}>Reset password</p>
    </div>
  );
};

export default SignIn;
