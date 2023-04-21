import { ActionIcon, Table, Chip, Divider, Text } from "@mantine/core";
import {
  IconAdjustments,
  IconDotsVertical,
  IconPlus,
} from "@tabler/icons-react";
import React from "react";
import DashboardAddModal from "../../components/modal/DashboardAddModal";
const mockData = [
  {
    title: "Product Recommendation Engine",
    lastUpdated: "23/04/2023",
    id: "1234",
    status: true,
  },
  {
    title: "Wine Recommendation Engine",
    lastUpdated: "23/04/2023",
    id: "1234",
    status: true,
  },
  {
    title: "Wine Recommendation Engine",
    lastUpdated: "23/04/2023",
    id: "1234",
    status: true,
  },
];
const DashboardPage = () => {
  return (
    <div className="w-full h-full pb-24">
      <div className="w-full flex flex-row">
        <p className="text-gray-700 text-3xl font-bold flex-grow">
          <Text
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            fz="3xl"
            fw={700}
          >
            Dashboard
          </Text>
        </p>
        <DashboardAddModal />
      </div>
      <p className="mt-2 text-gray-500">
        {" "}
        Supercharge your business by building recommendation engines ⚡️
      </p>
      <Divider className="my-8"></Divider>
      <div className="w-full h-full">
        {mockData.length > 0 ? (
          <Table
            verticalSpacing={"sm"}
            highlightOnHover
            className="select-none"
          >
            <thead>
              <tr className="text-pink-600">
                <th>Title</th>
                <th>Last Updated</th>
                <th className="flex">
                  <div className="m-auto">Status</div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => {
                return (
                  <tr>
                    <td className="text-gray-600">{item.title}</td>
                    <td className="text-gray-400">{item.lastUpdated}</td>
                    <td className="flex">
                      {item.status ? (
                        <div className="w-fit h-fit px-2 rounded-full bg-green-200 text-green-600 m-auto">
                          ONLINE
                        </div>
                      ) : (
                        <div className="w-fit h-fit px-2 rounded-full bg-red-200 text-red-500 m-auto">
                          OFFLINE
                        </div>
                      )}
                    </td>
                    <td>
                      <ActionIcon>
                        <IconDotsVertical />
                      </ActionIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
