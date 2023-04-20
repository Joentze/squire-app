import { ActionIcon } from "@mantine/core";
import { IconAdjustments, IconPlus } from "@tabler/icons-react";
import React from "react";
const DashboardPage = () => {
  return (
    <div className="w-full h-full pb-16">
      <div className="w-full flex flex-row">
        <p className="text-gray-700 text-3xl font-bold flex-grow">Dashboard</p>
        <ActionIcon className="mt-2">
          <IconPlus size="2.125rem" />
        </ActionIcon>
      </div>
      <p className="mt-2 text-gray-500">
        {" "}
        Supercharge your business by building recommendation engines.
      </p>
      <div className="w-full bg-gray-200 h-full mt-4"></div>
    </div>
  );
};
export default DashboardPage;
