import { Divider, Text } from "@mantine/core";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoDocument } from "react-icons/io5";
import DashboardAddModal from "../../components/modal/DashboardAddModal";
import CircleProgress from "../../components/progress/CircleProgress";
import ProjectsTable from "../../components/table/ProjectsTable";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { db } from "../../firebase/base";
import { ProjectType, ProjectDisplayType } from "../../types/projectTypes";
// const mockData = [
//   {
//     title: "Product Recommendation Engine",
//     lastUpdated: "23/04/2023",
//     id: "1234",
//     status: true,
//   },
//   {
//     title: "Wine Recommendation Engine",
//     lastUpdated: "23/04/2023",
//     id: "1234",
//     status: true,
//   },
//   {
//     title: "Wine Recommendation Engine",
//     lastUpdated: "23/04/2023",
//     id: "1234",
//     status: true,
//   },
// ];
const DashboardPage = () => {
  const auth = useAuth();
  const [projects, setProjects] = useState<ProjectDisplayType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const queryForProjects = query(
      collection(db, "projects"),
      where("createdBy", "==", auth)
    );

    onSnapshot(queryForProjects, (querySnapshot) => {
      let currProjects: ProjectDisplayType[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        currProjects.push({ id: doc.id, ...doc.data() } as ProjectDisplayType);
      });
      setProjects(currProjects);
      setLoading(false);
    });
  }, []);
  return (
    <div className="w-full h-full pb-24">
      <div className="w-full flex flex-row">
        <p className="text-gray-700 text-3xl font-bold flex-grow">
          <Text
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            fz="2xl"
            fw={700}
          >
            Your Projects
          </Text>
        </p>
        <DashboardAddModal />
      </div>
      <p className="text-gray-500">
        {" "}
        Supercharge your business by building recommendation engines ⚡️
      </p>
      <Divider className="my-4"></Divider>
      <div className="w-full h-full flex flex-col">
        {loading ? (
          <div className="m-auto">
            <CircleProgress className="w-10 h-10 text-pink-300" />
          </div>
        ) : (
          <>
            {projects.length > 0 ? (
              <ProjectsTable projects={projects} />
            ) : (
              <div className="w-full h-full flex flex-col">
                <div className="m-auto flex flex-col gap-2">
                  <IoDocument className="w-8 h-8 text-slate-300 m-auto" />
                  <p className="font-mono w-96 m-auto text-center text-slate-400 text-sm">
                    Looks like you've not created any projects!
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
