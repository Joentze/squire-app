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
import { Link } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io5";

const LoginPage = () => {
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
        <Link to={"register"}>
          <Anchor size="sm" component="button" color={"pink"}>
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <div></div>
          <Anchor component="button" size="sm" color={"pink"}>
            Forgot password?
          </Anchor>
        </Group>

        <button className="w-full h-10 rounded-md bg-pink-600 text-white my-4 font-bold active:bg-pink-700 ">
          Sign in
        </button>
        <br></br>
        <Divider label="Or" labelPosition="center" color={"gray"} />
        <br></br>
        <ActionIcon color={"pink"} className="m-auto" size={"xl"}>
          <IoLogoGoogle></IoLogoGoogle>
        </ActionIcon>
      </Paper>
    </Container>
  );
};
export default LoginPage;
