import type { AppDispatch, RootState } from "@/app/store";
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
import { getUsers } from "@/features/notes/noteSlice";

export default function DisplayUsers() {
  const users = useSelector((state: RootState) => state.notes.users);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!users || users.length === 0) {
    return <p className="text-gray-500">No users found</p>;
  }
  const roleOrder = ["user", "admin", "moderator"];

  const groupedUsers = roleOrder.reduce<Record<string, getUsersType[]>>(
    (acc, role) => {
      acc[role] = users.filter(
        (user) => user.role === role && user.email !== "mod@gmail.com"
      );
      return acc;
    },
    {}
  );

  return (
    <div className="w-full mt-5 overflow-x-auto">
      <Table className="w-full">
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        {Object.keys(groupedUsers).map((role, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell
                colSpan={3}
                className="font-bold uppercase text-center"
              >
                {role}s
              </TableCell>
            </TableRow>
            {groupedUsers[role].map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <ChangeRole userdata={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
