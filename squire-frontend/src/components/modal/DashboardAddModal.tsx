import { useDisclosure } from "@mantine/hooks";
import { Modal, Input, ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import CircleProgress from "../progress/CircleProgress";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { createProject } from "../../projectHandler/projectHandler";
import { useNavigate } from "react-router-dom";
import { validateProjectAdder } from "../../projectHandler/projectValidator";

const DashboardAddModal = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>();
  const [projectDescription, setProjectDescription] = useState<string>();
  const onButtonClicked = async () => {
    try {
      setLoading(true);
      validateProjectAdder(projectName, projectDescription, auth);
      const projectId = await createProject(
        projectName as string,
        projectDescription as string,
        auth as string
      );
      navigate(`/projects/${projectId}`);
    } catch (e) {
      console.error(e as string);
      setLoading(false);
    }
  };
  return (
    <div className="text-gray-700">
      <Modal
        color="pink"
        size={"lg"}
        opened={opened}
        onClose={close}
        title={
          <p className="text-xl font-bold text-pink-500 -mb-2">
            Create a New Project
          </p>
        }
        centered
      >
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="Project Name"
          description="Give your project a name"
        >
          <Input
            id="input-demo"
            placeholder="Example: Google Search Engine"
            color="pink"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setProjectName(event.target.value)
            }
          />
        </Input.Wrapper>
        <br></br>
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="Project Description"
          description="Give your project a description"
        >
          <Input
            id="input-demo"
            placeholder="Example: Best search engine ever!"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setProjectDescription(event.target.value)
            }
          />
        </Input.Wrapper>
        <br></br>
        <div className="flex flex-row">
          <div className="flex-grow"></div>
          <>
            {loading ? (
              <CircleProgress className="text-pink-600 mr-2 my-2" />
            ) : (
              <Button variant={"light"} color="pink" onClick={onButtonClicked}>
                Confirm
              </Button>
            )}
          </>
        </div>
      </Modal>

      <ActionIcon className="mt-2" onClick={open}>
        <IconPlus size="2.125rem" />
      </ActionIcon>
    </div>
  );
};
export default DashboardAddModal;
