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

const SignUpPage = () => {
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
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Password"
          required
          mt="md"
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          required
          mt="md"
        />

        <button className="w-full h-10 rounded-md bg-pink-600 text-white my-4 font-bold active:bg-pink-700 ">
          Create Account
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
export default SignUpPage;