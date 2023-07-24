import {
  ActionIcon,
  Button,
  Code,
  Divider,
  Input,
  JsonInput,
  NumberInput,
  Progress,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  and,
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoCheckbox, IoCheckboxOutline, IoClipboard } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { getBuildDetails } from "../../buildHandler/buildHandler";
import CircleProgress from "../../components/progress/CircleProgress";
import { db } from "../../firebase/base";
import {
  NotificationType,
  showNotification,
} from "../../notifications/notificationHandler";
import { Chunk } from "../../types/documentTypes";
import { validateApiArgs } from "../../validators/recommendationApiValidator";

const BuildLogPage = () => {
  const SQUIRE_API_URL = process.env.REACT_APP_SQUIRE_API_URL;
  const { buildId } = useParams();
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const [chunkNo, setChunkNo] = useState<number>(0);
  // const [completed, setCompleted] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>("");
  const [queryNo, setQueryNo] = useState<number>(5);
  const [getUrl, setGetUrl] = useState<string>("");
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const makeApiCall = async () => {
    try {
      setResult(undefined);
      setLoading(true);
      validateApiArgs(queryText, queryNo, projectId, buildId as string);
      const response = await fetch(getUrl, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      const responseJson = JSON.stringify(await response.json());
      setResult(responseJson);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showNotification(
        NotificationType.ERROR,
        "There was an Argument Error",
        (e as Error).message as string
      );
    }
  };
  useEffect(() => {
    const getBuild = async () => {
      const buildDetails = await getBuildDetails(buildId as string);
      setChunkNo(buildDetails.chunkNo as number);
      setProjectId(buildDetails.projectId as string);
    };
    getBuild();
  }, []);
  useEffect(() => {
    const queryForChunks = query(
      collection(db, "chunks"),
      and(
        where("build_id", "==", buildId as string),
        where("status", "==", "SUCCESS")
      )
    );
    let newChunks: Chunk[] = [];
    onSnapshot(queryForChunks, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("data: ", doc.data());
        newChunks.push((doc as DocumentData).data());
      });

      setChunks(newChunks);
    });
  }, []);

  useEffect(() => {
    const url = `${SQUIRE_API_URL}/api?build_id=${buildId}&project_id=${projectId}&query=${queryText}&number_of_matches=${queryNo}`;
    setGetUrl(url);
  }, [queryText, queryNo]);
  return (
    <>
      {chunks.length >= chunkNo ? (
        <div className="flex flex-col w-full h-fit">
          <div className="m-auto w-full flex flex-col h-fit">
            <IoCheckbox className="w-20 h-20 text-green-400 m-auto" />
            <br></br>
            <p className="text-center font-mono text-gray-600 font-bold text-2xl">
              Build Successful
            </p>
            <br></br>
            <p className="text-center font-mono text-gray-400 text-md">
              {`${chunks.length}/${chunkNo} Chunks Successfully Built`}
            </p>
            <Divider mt={10} />
            <div className="flex flex-row w-full h-full">
              <div className="w-1/3 border-r-2 pt-4 ">
                <Text weight={"bold"} size={"xl"} color="pink">
                  Try Recommendation API
                </Text>
                <Text weight={"normal"} color="dimmed">
                  Change the arguments of the Recommendation{" "}
                  <Code color={"pink"}>GET</Code> request
                </Text>
                <br></br>
                <Input.Wrapper label="Project ID" required maw={320} mx="auto">
                  <Input disabled value={projectId} />
                </Input.Wrapper>
                <Input.Wrapper label="Build ID" required maw={320} mx="auto">
                  <Input disabled value={buildId} />
                </Input.Wrapper>
                <Input.Wrapper label="Query Text" required maw={320} mx="auto">
                  <Input
                    placeholder="Example: 'Air Force Ones'"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setQueryText(event.target.value)
                    }
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="No. of Returns"
                  required
                  maw={320}
                  mx="auto"
                >
                  <NumberInput
                    type={"number"}
                    defaultValue={queryNo}
                    min={1}
                    onChange={(num: number) => setQueryNo(num)}
                  />
                </Input.Wrapper>
              </div>
              <div className="w-full p-4">
                <Input.Wrapper
                  label={
                    <Text weight="bold" mb={2} color="pink">
                      Request <Code color={"pink"}>URL</Code>
                    </Text>
                  }
                >
                  <Input
                    value={getUrl}
                    rightSection={
                      <Tooltip label="Copy to Clipboard">
                        <ActionIcon
                          onClick={() => navigator.clipboard.writeText(getUrl)}
                        >
                          <IoClipboard />
                        </ActionIcon>
                      </Tooltip>
                    }
                  ></Input>
                </Input.Wrapper>
                <br></br>
                <Input.Wrapper
                  label={
                    <Text color={"pink"} weight="bold">
                      <Code color={"pink"}>JSON</Code> Response
                    </Text>
                  }
                >
                  <JsonInput
                    formatOnBlur
                    minRows={20}
                    value={result}
                    disabled={result === undefined}
                    rightSection={
                      <Tooltip label="Copy to Clipboard">
                        <ActionIcon
                          onClick={() =>
                            navigator.clipboard.writeText(result as string)
                          }
                        >
                          <IoClipboard />
                        </ActionIcon>
                      </Tooltip>
                    }
                  />
                </Input.Wrapper>
                <div className="flex flex-row w-full py-2">
                  <div className="flex-grow"></div>
                  <>
                    {loading ? (
                      <CircleProgress className="w-4 h-4 text-pink-600 " />
                    ) : (
                      <Button
                        className="bg-pink-600"
                        color={"pink"}
                        onClick={makeApiCall}
                      >
                        Submit
                      </Button>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="m-auto">
            <Progress
              className="w-full"
              color={"pink"}
              animate
              value={((chunks.length * 100) / (chunkNo as number)) as number}
            ></Progress>
            <p className="font-mono text-sm text-gray-400">{`${chunks.length}/${
              chunkNo as number
            } Chunks Uploaded...`}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BuildLogPage;
