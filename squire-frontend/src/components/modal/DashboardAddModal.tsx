import { useDisclosure } from "@mantine/hooks";
import { Modal, Input, ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const DashboardAddModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="text-gray-700">
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title={
          <p className="text-xl font-bold text-gray-700 -mb-2">
            Create a New Recommendation Engine
          </p>
        }
        centered
      >
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="Engine Title"
          description="Give your engine a name."
        >
          <Input id="input-demo" placeholder="Engine Name" />
        </Input.Wrapper>
        <br></br>
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="Engine Description"
          description="Give your engine a description."
        >
          <Input id="input-demo" placeholder="Sports Products etc." />
        </Input.Wrapper>
        <br></br>
        <div className="flex flex-row">
          <div className="flex-grow"></div>
          <Button variant={"light"} color="pink">
            Confirm
          </Button>
        </div>
      </Modal>

      <ActionIcon className="mt-2" onClick={open}>
        <IconPlus size="2.125rem" />
      </ActionIcon>
    </div>
  );
};
export default DashboardAddModal;
