import { ActionIcon, Divider, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewBuild,
  getBuildAllDetails,
} from "../../buildHandler/buildHandler";
import { buildsToTimeline } from "../../buildHandler/timelineHandler";
import CircleProgress from "../../components/progress/CircleProgress";
import BuildTimeline, {
  TimelineBuildItem,
} from "../../components/timeline/BuildTimeline";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { getProjectDetails } from "../../projectHandler/projectHandler";
import { BuildType } from "../../types/buildTypes";
import { ProjectType } from "../../types/projectTypes";

const ProjectPage = () => {
  const uid = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectType>();
  const [builds, setBuilds] = useState<BuildType[]>([]);
  const navigate = useNavigate();
  const [timelineItems, setTimelineItems] = useState<TimelineBuildItem[]>([]);
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
    if (projectId) {
      const getBuilds = async (): Promise<void> => {
        const buildDetails = await getBuildAllDetails(projectId);
        setBuilds(buildDetails);
        // console.log(buildDetails);
        const timeline = buildsToTimeline(buildDetails);
        setTimelineItems(timeline);
      };

      getBuilds();
    }
  }, []);
  const createBuild = async () => {
    setLoading(true);
    try {
      const buildId = await createNewBuild(projectId as string, uid as string);
      console.log(buildId);
      navigate(`/project/${projectId}/build/${buildId}`);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row">
          <Text weight={"bold"} color="pink">
            {project?.name}
          </Text>
          <div className="flex-grow"></div>
          <>
            {loading ? (
              <CircleProgress className="text-pink-600 mr-2 my-2" />
            ) : (
              <Tooltip label="Start a Build" position="bottom" mt={2}>
                <ActionIcon
                  className=""
                  onClick={async () => {
                    await createBuild();
                  }}
                >
                  <IconPlus size="2.125rem" />
                </ActionIcon>
              </Tooltip>
            )}
          </>
        </div>
        <Text size={"sm"} weight={"normal"} color="dimmed">
          {project?.description}
        </Text>
        <Divider />
        <div className="mt-2 w-full h-full flex flex-col">
          {timelineItems.length > 0 ? (
            <BuildTimeline builds={timelineItems}></BuildTimeline>
          ) : (
            <div className="w-full h-full flex flex-col text-slate-300">
              <div className="m-auto flex flex-col">
                <IoSearch className="m-auto w-10 h-10" />
                <p>No builds have been created!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProjectPage;
