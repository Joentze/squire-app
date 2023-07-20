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
import {
  IconArrowRight,
  IconArrowRightTail,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io5";
import { signInWithGoogle } from "../../firebase/auth/signInWithGoogle";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(auth);
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard");
        console.log(user);
      })
      .catch((error) => {
        alert("error.message");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link to={"/register"}>
          <Anchor size="sm" component="button" color={"pink"}>
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Group position="apart" mt="lg">
          <div></div>
          <Anchor component="button" size="sm" color={"pink"}>
            Forgot password?
          </Anchor>
        </Group>

        <button
          className="w-full h-10 rounded-md bg-pink-600 text-white my-4 font-bold active:bg-pink-700 "
          onClick={onLogin}
        >
          Sign in
        </button>
        <br></br>
        <Divider label="Or" labelPosition="center" color={"gray"} />
        <br></br>
        <ActionIcon
          color={"pink"}
          className="m-auto"
          size={"xl"}
          onClick={signInWithGoogle}
        >
          <IoLogoGoogle></IoLogoGoogle>
        </ActionIcon>
      </Paper>
    </Container>
  );
};
export default LoginPage;
