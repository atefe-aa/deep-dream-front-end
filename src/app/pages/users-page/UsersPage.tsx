import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { UsersListWrapper } from "../../modules/apps/user-management/users-list/UsersList";


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
