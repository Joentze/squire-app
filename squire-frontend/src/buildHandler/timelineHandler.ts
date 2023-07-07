import { Timestamp } from "firebase/firestore";
import { TimelineBuildItem } from "../components/timeline/BuildTimeline";
import { BuildType } from "../types/buildTypes";
import { BuildDisplayType } from "./buildHandler";

export const buildsToTimeline = (builds: BuildType[]): TimelineBuildItem[] => {
  let buildItems: TimelineBuildItem[] = [];
  let dateCollection: any = {};
  for (let build of builds) {
    console.log(build);
    const dateString = (build.createdOn as Timestamp).toDate();
    const ddmmyyyy = `${dateString.getDate()}/${
      dateString.getMonth() + 1
    }/${dateString.getFullYear()}`;
    if (Object.keys(dateCollection).includes(ddmmyyyy)) {
      dateCollection[ddmmyyyy].push(build as BuildType);
    } else {
      dateCollection[ddmmyyyy] = [build];
    }
  }
  for (const [key, value] of Object.entries(dateCollection)) {
    buildItems.push({
      dateString: key,
      allBuilds: value as BuildDisplayType[],
    });
  }
  return buildItems.reverse();
};
