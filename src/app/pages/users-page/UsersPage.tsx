import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink } from "../../../_metronic/layout/core";
import { UsersListWrapper } from "../../modules/apps/user-management/users-list/UsersList";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "User Management",
    path: "/user-management/users",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="users"
          element={
            <>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/user-management/users" />} />
    </Routes>
  );
};

export default UsersPage;
