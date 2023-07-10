import { ActionIcon, Menu, Table } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  showNotification,
  NotificationType,
} from "../../notifications/notificationHandler";
import { deleteProject } from "../../projectHandler/projectHandler";
import { ProjectDisplayType } from "../../types/projectTypes";

interface IProjectsTable {
  projects: ProjectDisplayType[];
}

const ProjectsTable: React.FC<IProjectsTable> = ({ projects }) => {
  const navigate = useNavigate();
  const deleteProjectRow = async (projectId: string) => {
    await deleteProject(projectId);
    showNotification(
      NotificationType.SUCCESS,
      "Successfully Deleted",
      "Project selected was successfully deleted!"
    );
    try {
    } catch (e) {
      showNotification(
        NotificationType.ERROR,
        "There was an error",
        e as string
      );
    }
  };
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
                    <Menu.Item
                      icon={<IconTrash />}
                      onClick={async () => deleteProjectRow(item.id)}
                      color="red"
                    >
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
