import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableCustom() {
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
          <TableRow className="border-b-0">
            <TableCell>Emma Johnson</TableCell>
            <TableCell>2 days ago</TableCell>
            <TableCell className="text-right">$1,200.00</TableCell>
          </TableRow>
          <TableRow className="border-b-0">
            <TableCell>Michael Brown</TableCell>
            <TableCell>5 days ago</TableCell>
            <TableCell className="text-right">$450.50</TableCell>
          </TableRow>
          <TableRow className="border-b-0">
            <TableCell>Sophia Williams</TableCell>
            <TableCell>1 week ago</TableCell>
            <TableCell className="text-right">$980.00</TableCell>
          </TableRow>
          <TableRow className="border-b-0">
            <TableCell>Liam Davis</TableCell>
            <TableCell>10 days ago</TableCell>
            <TableCell className="text-right">$300.00</TableCell>
          </TableRow>
          <TableRow className="border-b-0">
            <TableCell>Olivia Miller</TableCell>
            <TableCell>14 days ago</TableCell>
            <TableCell className="text-right">$2,150.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
