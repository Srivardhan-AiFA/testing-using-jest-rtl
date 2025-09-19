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
            <TableHead>Last Transfer</TableHead>
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
              <TableCell>{`${
                tx.friendName[0].toUpperCase() + tx.friendName.slice(1)
              }`}</TableCell>
              <TableCell>
                {(() => {
                  const now = new Date();
                  const txDate = new Date(tx.transactionDate);

                  // normalize both dates to midnight
                  const startOfToday = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                  );
                  const startOfTxDay = new Date(
                    txDate.getFullYear(),
                    txDate.getMonth(),
                    txDate.getDate()
                  );

                  const diffTime =
                    startOfToday.getTime() - startOfTxDay.getTime();
                  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                  if (diffDays === 0) return "Today";
                  if (diffDays === 1) return "Yesterday";
                  return `${diffDays} days ago`;
                })()}
              </TableCell>

              <TableCell className="text-right">${tx.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
