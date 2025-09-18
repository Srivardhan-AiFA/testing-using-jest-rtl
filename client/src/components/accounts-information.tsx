import { PlusCircle } from "lucide-react";
import TableCustom from "./table-custom";

export default function AccountsInformation() {
  return (
    <div>
      <div className="flex justify-between mt-5">
        <h5 className="text-sm font-semibold">Send Money to</h5>
        <p className="flex items-center text-blue-900">
          <PlusCircle size={15} />{" "}
          <p className="text-xs cursor-pointer">Add New Wallet</p>
        </p>
      </div>
      <div>
        <TableCustom />
      </div>
    </div>
  );
}
