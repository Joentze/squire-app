import { Outlet } from "react-router-dom";

const NavFrame = () => {
  return (
    <>
      <p>Navigation Bar</p>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};
export default NavFrame;
