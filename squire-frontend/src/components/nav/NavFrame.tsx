import { ActionIcon, Tooltip, Text, Menu } from "@mantine/core";
import { iconSizes } from "@mantine/core/lib/Stepper/Step/Step.styles";
import { signOut } from "firebase/auth";
import {
  Icon3dCubeSphere,
  IconDotsVertical,
  IconLayoutDashboard,
  IconListCheck,
} from "@tabler/icons-react";
import { IoLogOut } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../firebase/base";

const navContent = [
  { path: "/dashboard", title: "Dashboard", icon: <IconLayoutDashboard /> },
  { path: "/logs", title: "Build Logs", icon: <IconListCheck /> },
];

const NavFrame = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full flex flex-row h-16 border border-b-2 p-4">
        <Text
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          ta="center"
          fz="3xl"
          fw={700}
          className="ml-2 text-xl"
        >
          Squire.
        </Text>
        <div className="flex-grow"></div>
        <Menu width={200}>
          <Menu.Target>
            <ActionIcon className="my-auto" size={"lg"}>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IoLogOut />}
              color="red"
              onClick={() => signOut(auth)}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="grid grid-cols-9 w-full flex-grow">
        <div className="w-20 h-full border border-r-2 flex">
          <div className="flex flex-col gap-4 h-fit mx-auto mt-4">
            {navContent.map((item) => {
              return (
                <>
                  <Tooltip
                    label={item.title}
                    position="right"
                    openDelay={300}
                    withArrow
                  >
                    <Link to={item.path}>
                      <ActionIcon
                        size={"xl"}
                        color={pathname.includes(item.path) ? "pink" : "gray"}
                      >
                        {item.icon}
                      </ActionIcon>
                    </Link>
                  </Tooltip>
                </>
              );
            })}
          </div>
        </div>
        <div id="detail" className="col-span-7 pb-12 pt-8 w-full h-full">
          <Outlet />
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default NavFrame;
