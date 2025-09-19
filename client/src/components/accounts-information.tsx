import TableCustom from "./table-custom";
import AddNewTranasction from "./add-new-tranasction";

export default function AccountsInformation() {
  return (
    <div>
      <div className="flex justify-between mt-5 px-1">
        <h5 className="text-sm font-semibold">Send Money to</h5>
        <AddNewTranasction />
      </div>

      <div className="max-h-64 overflow-y-auto mt-3 rounded-md border">
        <TableCustom />
      </div>
    </div>
  );
}
