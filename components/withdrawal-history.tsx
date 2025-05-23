"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Withdrawal {
  id: string
  date: string
  amount: string
  currency: string
  status: "completed" | "pending" | "failed"
  txHash: string
}

export function WithdrawalHistory() {
  const withdrawals: Withdrawal[] = [
    {
      id: "1",
      date: "2025-05-20",
      amount: "500.00",
      currency: "USDC",
      status: "completed",
      txHash: "0x1a2b3c4d5e6f...",
    },
    {
      id: "2",
      date: "2025-05-15",
      amount: "0.25",
      currency: "ETH",
      status: "completed",
      txHash: "0x7a8b9c0d1e2f...",
    },
    {
      id: "3",
      date: "2025-05-10",
      amount: "750.00",
      currency: "USDC",
      status: "completed",
      txHash: "0x3a4b5c6d7e8f...",
    },
    {
      id: "4",
      date: "2025-05-05",
      amount: "5000",
      currency: "PENGU",
      status: "completed",
      txHash: "0x9a0b1c2d3e4f...",
    },
    {
      id: "5",
      date: "2025-05-01",
      amount: "0.15",
      currency: "ETH",
      status: "completed",
      txHash: "0x5a6b7c8d9e0f...",
    },
  ]

  const columns: ColumnDef<Withdrawal>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.date)
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.original.amount} {row.original.currency}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge variant={status === "completed" ? "default" : status === "pending" ? "outline" : "destructive"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "txHash",
      header: "Transaction",
      cell: ({ row }) => {
        return (
          <a
            href={`https://etherscan.io/tx/${row.original.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {row.original.txHash.substring(0, 10)}...
          </a>
        )
      },
    },
  ]

  const table = useReactTable({
    data: withdrawals,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No withdrawal history.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
