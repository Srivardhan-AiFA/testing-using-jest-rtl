import type { RootState } from "@/app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

export default function TableCustom() {
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.accounts
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Holder</TableHead>
            <TableHead className="text-center">Last Transfer</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-red-500">
                {error}
              </TableCell>
            </TableRow>
          )}
          {!loading && !error && transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No transactions found
              </TableCell>
            </TableRow>
          )}
          {transactions.map((tx, index) => (
            <TableRow key={index} className="border-b-0">
              <TableCell>{tx.friendName}</TableCell>
              <TableCell className="text-center">
                {new Date(tx.transactionDate).toLocaleDateString()}{" "}
                {new Date(tx.transactionDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell className="text-right">${tx.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
