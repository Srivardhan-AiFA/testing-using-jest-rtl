import type { AppDispatch, RootState } from "@/app/store";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { addTransaction } from "@/features/accounts/accountsSlice";
import type { SelectedUser } from "@/types/user.type";

export default function SearchUser() {
  const users = useSelector((state: RootState) => state.services.users);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({
    username: "",
    amount: 0,
  });

  const dispatch = useDispatch<AppDispatch>();
  const createTransaction = (friendName: string, amount: number) => {
    dispatch(addTransaction({ friendName, amount }));
  };

  return (
    <div>
      <Command>
        <CommandInput placeholder="Search user" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Users">
            {users.map((user, index) => (
              <CommandItem
                key={index}
                onSelect={() =>
                  setSelectedUser({ ...selectedUser, username: user })
                }
              >
                {`${user[0].toUpperCase() + user.slice(1)}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <Separator />
      <div className="px-1 mt-5">
        <Input
          type="number"
          id="amount"
          placeholder="amount"
          className="outline-0"
          onChange={(e) => {
            setSelectedUser({
              ...selectedUser,
              amount: Number(e.target.value),
            });
          }}
        />
      </div>

      {selectedUser.username && (
        <div className="mt-4 p-2">
          <Separator />
          <h3 className="text-xs mt-2 text-gray-400">Selected User</h3>
          <p className="text-gray-700 text-sm">
            {`${
              selectedUser.username[0].toUpperCase() +
              selectedUser.username.slice(1)
            }`}
          </p>
          <h3 className="text-xs mt-2 text-gray-400">Amount</h3>
          <p className="text-gray-700 text-sm">{selectedUser.amount}</p>
        </div>
      )}

      <Button
        className="w-full rounded-full cursor-pointer mt-3"
        onClick={() => {
          createTransaction(selectedUser.username, selectedUser.amount);
        }}
      >
        Create
      </Button>
    </div>
  );
}
