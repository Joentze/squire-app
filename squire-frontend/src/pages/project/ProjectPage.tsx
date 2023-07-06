import { ActionIcon, Divider, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { getBuildAllDetails } from "../../buildHandler/buildHandler";
import { buildsToTimeline } from "../../buildHandler/timelineHandler";
import BuildTimeline, {
  TimelineBuildItem,
} from "../../components/timeline/BuildTimeline";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { getProjectDetails } from "../../projectHandler/projectHandler";
import { BuildType } from "../../types/buildTypes";
import { ProjectType } from "../../types/projectTypes";

const ProjectPage = () => {
  const uid = useAuth();
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectType>();
  const [builds, setBuilds] = useState<BuildType[]>([]);
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
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="flex flex-row">
          <Text weight={"bold"} color="pink">
            {project?.name}
          </Text>
          <div className="flex-grow"></div>
          <ActionIcon className="">
            <IconPlus size="2.125rem" />
          </ActionIcon>
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
