import TableCustom from "./table-custom";
import AddNewTranasction from "./add-new-tranasction";

export default function AccountsInformation() {
  return (
    <div>
      <div className="flex justify-between mt-5">
        <h5 className="text-sm font-semibold">Send Money to</h5>
        <AddNewTranasction />
      </div>
      <div>
        <TableCustom />
      </div>
    </div>
  );
}
