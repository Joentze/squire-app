import { Timeline, Text, Divider} from "@mantine/core";
import { IconHammer } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { BuildDisplayType } from "../../buildHandler/buildHandler";
import { BuildStatus } from "../../types/buildTypes";

export interface TimelineBuildItem {
  dateString: string;
  allBuilds: BuildDisplayType[];
}

export interface IBuildTimeline {
  builds: TimelineBuildItem[];
}

const BuildTimeline: React.FC<IBuildTimeline> = ({ builds }) => {
  const navigate = useNavigate();
  const chipStatus = {
    [BuildStatus.COMPLETED]: (
      <span className="bg-green-400 text-white text-xs p-2 py-1 rounded-full">
        {BuildStatus.COMPLETED}
      </span>
    ),
    [BuildStatus.INCOMPLETE]: (
      <span className="bg-red-400 text-white text-xs p-2 py-1 rounded-full">
        {BuildStatus.INCOMPLETE}
      </span>
    ),
  };
  return (
    <Timeline color={"pink"} active={builds.length}>
      {builds.map((chunk) => {
        return (
          <Timeline.Item
            bulletSize={24}
            color={"pink"}
            title={`Builds on ${chunk.dateString}`}
            bullet={<IconHammer />}
          >
            {chunk.allBuilds.map((build) => {
              return (
                <>
                  <div
                    className="flex flex-row mt-4 hover:cursor-pointer"
                    onDoubleClick={() => {
                      const nextLink =
                        build.status === BuildStatus.COMPLETED
                          ? `/build/${build.id}/log`
                          : `/project/${build.projectId}/build/${build.id}`;
                      navigate(nextLink);
                    }}
                  >
                    <div>
                      <Text>
                        {build.comments === undefined
                          ? "No Comments"
                          : build.comments}
                      </Text>
                      <Text color="dimmed" size="xs">
                        {build.id}
                      </Text>
                    </div>
                    <div className="flex-grow" />
                    <div className="">{chipStatus[build.status]}</div>
                  </div>
                  <Divider />
                </>
              );
            })}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default BuildTimeline;
