import { Timeline, Text, Divider } from "@mantine/core";
import { IconHammer } from "@tabler/icons-react";
import { BuildDisplayType } from "../../buildHandler/buildHandler";

export interface TimelineBuildItem {
  dateString: string;
  allBuilds: BuildDisplayType[];
}

export interface IBuildTimeline {
  builds: TimelineBuildItem[];
}

const BuildTimeline: React.FC<IBuildTimeline> = ({ builds }) => {
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
                  <Text>{build.id}</Text>
                  <Text color="dimmed" size="xs">
                    {build.comments === undefined
                      ? "No Comments"
                      : build.comments}
                  </Text>
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
