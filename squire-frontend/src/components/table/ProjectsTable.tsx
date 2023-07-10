import { ActionIcon, Menu, Table } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ProjectDisplayType } from "../../types/projectTypes";

interface IProjectsTable {
  projects: ProjectDisplayType[];
}

const ProjectsTable: React.FC<IProjectsTable> = ({ projects }) => {
  const navigate = useNavigate();
  const formatDateTime = (dateTime: Timestamp): string => {
    const datetime = dateTime.toDate();
    return `${datetime.getDate()}/${
      datetime.getMonth() + 1
    }/${datetime.getFullYear()}`;
  };
  return (
    <Table verticalSpacing={"xs"} highlightOnHover className="select-none">
      <thead>
        <tr className="text-pink-600">
          <th>Title</th>
          <th>Created On</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {projects.map((item) => {
          return (
            <tr onDoubleClick={() => navigate(`/projects/${item.id}`)}>
              <td className="text-gray-600">{item.name}</td>
              <td className="text-gray-400">
                {formatDateTime(item.createdOn as Timestamp)}
              </td>
              <td>
                <Menu width={200} position="bottom-start">
                  <Menu.Target>
                    <ActionIcon>
                      <IconDotsVertical />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconTrash />} color="red">
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default ProjectsTable;
