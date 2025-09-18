import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableCustom() {
  const rows = [
    { name: "Emma Johnson", transfer: "2 days ago", amount: "$1,200.00" },
    { name: "Michael Brown", transfer: "5 days ago", amount: "$450.50" },
    { name: "Sophia Williams", transfer: "1 week ago", amount: "$980.00" },
    { name: "Liam Davis", transfer: "10 days ago", amount: "$300.00" },
    { name: "Olivia Miller", transfer: "14 days ago", amount: "$2,150.00" },
  ];

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
          {rows.map((row, idx) => (
            <TableRow key={idx} className="border-b-0">
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-center">{row.transfer}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
