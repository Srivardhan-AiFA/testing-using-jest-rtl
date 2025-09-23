import type { AppDispatch, RootState } from "@/app/store";
import { getUsers } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { getUsersType } from "@/types/user.type";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeRole } from "./change-role";

export default function DisplayUsers() {
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!users || users.length === 0) {
    return <p className="text-gray-500">No users found</p>;
  }

  return (
    <div className="w-full mt-5 overflow-x-auto">
      <h4 className="uppercase font-semibold inter text-center text-sm border-b-2">
        {users[0].role}s
      </h4>
      <Table className="w-full">
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: getUsersType) =>
            user.email === "mod@gmail.com" ? null : (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <ChangeRole userdata={user} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
