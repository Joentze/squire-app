import { Button, Divider, Input, MultiSelect, Text } from "@mantine/core";
import { IconChartBubble, IconPencil, IconTag } from "@tabler/icons-react";
import {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  useEffect,
  useState,
} from "react";
import { IoArrowDown } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBuildComment,
  setChunkNo,
  setStatus,
  writeAllChunks,
} from "../../buildHandler/buildHandler";
import {
  ExcelSupabaseWrite,
  formatExcelToPost,
} from "../../buildHandler/excelHandler";
import ExcelFileDrop from "../../components/fileInput/ExcelFileDrop";
import CircleProgress from "../../components/progress/CircleProgress";
import ResultTable from "../../components/table/ResultTable";
import { getProjectDetails } from "../../projectHandler/projectHandler";
import { BuildStatus } from "../../types/buildTypes";
import { ProjectDisplayType, ProjectType } from "../../types/projectTypes";

interface MantineMultiType {
  label: string;
  value: string;
}

// const toMantineMultiSelectDataFormat = (
//   colKeys: string[]
// ): MantineMultiType[] => {
//   const data: MantineMultiType[] = [];
//   colKeys.forEach((item) => data.push({ value: item, label: item }));
//   return data;
// };

const BuildPage = () => {
  const { projectId, buildId } = useParams();
  const [rows, setRows] = useState<object[]>([]);
  const [colLabels, setColLabels] = useState<string[]>([""]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [comments, setComments] = useState<string>("");
  const [project, setProject] = useState<ProjectType>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const uploadChunk = async () => {
    try {
      const newChunks = formatExcelToPost(rows, selectedLabels);
      setLoading(true);
      const chunkNo = await writeAllChunks(
        newChunks,
        projectId as string,
        buildId as string
      );
      await setChunkNo(buildId as string, chunkNo);
      await addBuildComment(buildId as string, comments);
      await setStatus(buildId as string, BuildStatus.COMPLETED);
      navigate(`/build/${buildId}/log`);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (projectId) {
      const getProject = async (): Promise<void> => {
        const projectDetails = await getProjectDetails(projectId);
        setProject(projectDetails);
      };
      getProject();
    }
  }, []);

  useEffect(() => {
    // console.log(rows);
    if (rows.length > 0) {
      const colStrKeys = Object.keys(rows[0]).sort();
      // const colKeys = toMantineMultiSelectDataFormat(colStrKeys);
      // console.log(colKeys);
      setColLabels(colStrKeys);
    }
  }, [rows]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <Text weight={"bolder"} size="lg" color={"pink"}>
          {project?.name}
        </Text>
        <div className="flex-grow"></div>
        {loading ? (
          <CircleProgress className="text-pink-600" />
        ) : (
          <Button
            color={"pink"}
            onClick={uploadChunk}
            variant={"filled"}
            className="bg-pink-600"
            disabled={
              !(
                rows.length > 0 &&
                selectedLabels.length > 0 &&
                comments.length > 0
              )
            }
          >
            Build Engine 🔨
          </Button>
        )}
      </div>
      <Text color="dimmed">{project?.description}</Text>
      <Divider />
      <>
        {rows.length === 0 ? (
          <div className="h-full w-full flex flex-col gap-2">
            <ExcelFileDrop setRows={setRows} />
            <div className="bg-gray-100 w-full h-full rounded-md"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Input.Wrapper
              label="Build Message"
              required
              size={"md"}
              description="Write comment about build"
            >
              <Input
                placeholder="Example: 'Added new products'"
                icon={<IconPencil />}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setComments(event.target.value)
                }
              />
            </Input.Wrapper>
            <MultiSelect
              icon={<IconTag />}
              onChange={setSelectedLabels}
              limit={5}
              withAsterisk
              className="border-1 border-pink-100 "
              searchable
              data={colLabels}
              label="Labels"
              placeholder="Labels"
              size={"md"}
              description="Pick at least one column label to base your recommendations on"
            />
            <Text weight="">Items</Text>
            <ResultTable
              selectedLabels={selectedLabels}
              values={rows.slice(0, 20)}
            />
            <div className="m-auto flex flex-col">
              <p className="m-auto text-gray-400">First 20 rows</p>
              <IoArrowDown className="m-auto text-gray-400" />
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default BuildPage;
