import { Outlet } from "react-router-dom";

const NavFrame = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full flex h-16 border border-b-2"></div>
      <div className="grid grid-cols-9 w-full flex-grow">
        <div className="">
          <div className="w-20 h-full border border-r-2 flex flex-col gap-2"></div>
        </div>
        <div id="detail" className="col-span-7 py-12 w-full h-full">
          <Outlet />
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default NavFrame;
