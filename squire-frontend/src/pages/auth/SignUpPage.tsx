import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoLogoGoogle } from "react-icons/io5";
import {
  IconArrowRight,
  IconArrowRightTail,
  IconBrandGoogle,
} from "@tabler/icons-react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const SignUpPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        alert ("Sign up successful!")
        const user = userCredential.user;
        console.log(user);
        navigate("/login")
    })
    .catch((error) => {
        alert ("error.message");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
    });
  };

  return (
    
    <Container size={420} my={40} color="pink">
      <Title
        align="center"
        sx={(theme) => ({
          fontWeight: 900,
        })}
      >
        <Text
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          ta="center"
          fz="3xl"
          fw={700}
        >
          Squire
        </Text>
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            required
            mt="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={onSubmit}
            className="w-full h-10 rounded-md bg-pink-600 text-white my-4 font-bold active:bg-pink-700"
          >
            Create Account
          </button>
          <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <NavLink to="/login" >
            <Anchor size="sm" component="button" color={"pink"}>
              Sign in
            </Anchor>
            </NavLink>
            </Text>
          
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpPage;