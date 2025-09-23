import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeRoleState } from "@/features/auth/authSlice";
import type { getUsersType } from "@/types/user.type";
import { useState } from "react";
import { useDispatch } from "react-redux";

type ChangeRoleProps = {
  userdata: getUsersType;
};

export function ChangeRole({ userdata }: ChangeRoleProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [role, setRole] = useState<string>(userdata.role);

  const changeRole = () => {
    dispatch(changeRoleState({ email: userdata.email, role }));
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            {userdata.role}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <p>
                User present role{" "}
                <span className="font-semibold">"{userdata.role}"</span>
              </p>
            </div>
            <Select value={role} onValueChange={(val: string) => setRole(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={userdata.role} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={changeRole}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
