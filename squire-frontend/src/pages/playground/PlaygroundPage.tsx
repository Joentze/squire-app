import { Divider, Input, Select, Text, ActionIcon } from "@mantine/core";
import { Action } from "@remix-run/router";
import { projectID } from "firebase-functions/params";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoChatbox, IoSend } from "react-icons/io5";
import { getBuildAllDetails } from "../../buildHandler/buildHandler";
import { writeChat } from "../../chatHandler/chatHandler";
import { validateMessage } from "../../chatHandler/chatValidator";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { db } from "../../firebase/base";
import {
  NotificationType,
  showNotification,
} from "../../notifications/notificationHandler";
import { BuildType } from "../../types/buildTypes";
import { ProjectDisplayType } from "../../types/projectTypes";

interface ISelectValues {
  value: string;
  label: string;
}

const PlaygroundPage = () => {
  const auth = useAuth();
  const [projects, setProjects] = useState<ISelectValues[]>([]);
  const [builds, setBuilds] = useState<ISelectValues[]>([]);
  const [currProject, setCurrProject] = useState<string | null>();
  const [currBuild, setCurrBuild] = useState<string | null>();
  const [message, setMessage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const returnPressCallback = useCallback(async (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Enter" && message !== undefined) {
      await sendMessage();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", returnPressCallback);
    return () => {
      window.removeEventListener("keydown", returnPressCallback);
    };
  }, []);

  useEffect(() => {
    const queryForProjects = query(
      collection(db, "projects"),
      where("createdBy", "==", auth)
    );

    onSnapshot(queryForProjects, (querySnapshot) => {
      let currProjects: ISelectValues[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const { name } = doc.data();
        currProjects.push({
          value: doc.id as string,
          label: name as string,
        } as ISelectValues);
      });
      setProjects(currProjects);
    });
  }, []);
  useEffect(() => {
    if (currProject) {
      setCurrBuild(null);
      const getBuilds = async (): Promise<void> => {
        const buildDetails = await getBuildAllDetails(currProject);
        // setBuilds(buildDetails);
        let buildSelectValues: ISelectValues[] = [];
        for (let thisBuild of buildDetails) {
          const { id, comments } = thisBuild;
          buildSelectValues.push({ value: id, label: comments as string });
        }
        setBuilds(buildSelectValues);
      };

      getBuilds();
    }
  }, [currProject]);
  const sendMessage = async () => {
    try {
      validateMessage(currProject, currBuild, message);

      await writeChat(
        auth as string,
        currProject as string,
        currBuild as string,
        message as string
      );
      (inputRef.current as HTMLInputElement).value = "";
      setMessage(undefined);
    } catch (e) {
      showNotification(
        NotificationType.ERROR,
        "AI Error",
        (e as Error).message
      );
    }
  };
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
        <div className="w-full flex flex-row gap-4 ">
          <Select
            data={projects}
            size="lg"
            className=""
            placeholder="Projects"
            onChange={setCurrProject}
          />
          <Select
            value={currBuild}
            placeholder="Builds"
            data={builds}
            disabled={builds.length === 0}
            size="lg"
            onChange={setCurrBuild}
          />
          <Input
            ref={inputRef}
            className="flex-grow"
            size={"lg"}
            placeholder="Ask AI..."
            icon={<IoChatbox />}
            disabled={!(currProject && currBuild)}
            // defaultValue={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            rightSection={
              <ActionIcon
                color={"pink"}
                variant="subtle"
                disabled={!(currProject && currBuild && message)}
                onClick={sendMessage}
              >
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
