import { ActionIcon } from "@mantine/core";
import { IconAdjustments, IconPlus } from "@tabler/icons-react";
import React from "react";
import DashboardAddModal from "../../components/modal/DashboardAddModal";
const DashboardPage = () => {
  return (
    <div className="w-full h-full pb-16">
      <div className="w-full flex flex-row">
        <p className="text-gray-700 text-3xl font-bold flex-grow">Dashboard</p>
        <DashboardAddModal />
      </div>
      <p className="mt-2 text-gray-500">
        {" "}
        Supercharge your business by building recommendation engines.
      </p>
      <div className="w-full bg-gray-100 h-full mt-4"></div>
    </div>
  );
};
export default DashboardPage;
