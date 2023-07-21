import { Divider, Input, Select, Text, ActionIcon } from "@mantine/core";
import { Action } from "@remix-run/router";
import { IoSend } from "react-icons/io5";

const PlaygroundPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Text weight={"bold"} color="pink" size="xl" mb={8}>
        Chat with Your Data
      </Text>
      <Text weight={"light"} color="dimmed" size="sm" mb={8}>
        Ask questions about your data with AI 🤖
      </Text>
      <Divider />
      <div className="w-full h-full  flex flex-col">
        <div className="flex-grow w-full"></div>
        <Divider mb={14} />
        <div className="w-full flex flex-row gap-4">
          <Select data={["hello", "world"]} size="lg" />
          <Select data={["hello", "world"]} size="lg" />
          <Input
            className="flex-grow "
            size={"lg"}
            placeholder="Ask AI..."
            rightSection={
              <ActionIcon>
                <IoSend />
              </ActionIcon>
            }
          />
        </div>
      </div>
    </div>
  );
};
export default PlaygroundPage;
