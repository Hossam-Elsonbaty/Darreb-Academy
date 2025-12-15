import { NavLink, Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-4">
        <p className="font-bold mb-4">test</p>

        <NavLink to="profile">Profile</NavLink><br />
        <NavLink to="photo">Photo</NavLink><br />
        <NavLink to="security">Security</NavLink> <br />
        <NavLink to="DeleteAccount">Delete Account</NavLink>
      </div>

      
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>

    </div>
  );
}
