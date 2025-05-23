"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Style {
  id: string
  title: string
  status: "published" | "draft" | "deprecated"
  coverImage: string
  generations: number
  revenue: number
  conversionRate: number
  createdAt: string
}

export function StylesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const data: Style[] = [
    {
      id: "1",
      title: "Neon Dreams",
      status: "published",
      coverImage: "/images/cyberpunk-neon.png",
      generations: 1243,
      revenue: 1250.45,
      conversionRate: 4.8,
      createdAt: "2025-04-15",
    },
    {
      id: "2",
      title: "Vintage Film",
      status: "published",
      coverImage: "/images/vintage-film.png",
      generations: 982,
      revenue: 980.2,
      conversionRate: 3.9,
      createdAt: "2025-04-20",
    },
    {
      id: "3",
      title: "Abstract Waves",
      status: "published",
      coverImage: "/images/abstract-waves.png",
      generations: 756,
      revenue: 720.8,
      conversionRate: 3.2,
      createdAt: "2025-04-25",
    },
    {
      id: "4",
      title: "Pixel Art",
      status: "published",
      coverImage: "/images/pixel-art.png",
      generations: 1089,
      revenue: 1100.5,
      conversionRate: 4.5,
      createdAt: "2025-04-28",
    },
    {
      id: "5",
      title: "Watercolor Dreams",
      status: "published",
      coverImage: "/images/watercolor.png",
      generations: 876,
      revenue: 850.3,
      conversionRate: 3.7,
      createdAt: "2025-05-02",
    },
    {
      id: "6",
      title: "Sci-Fi Worlds",
      status: "published",
      coverImage: "/images/scifi-world.png",
      generations: 654,
      revenue: 630.9,
      conversionRate: 2.9,
      createdAt: "2025-05-05",
    },
    {
      id: "7",
      title: "Anime Portraits",
      status: "draft",
      coverImage: "/images/anime-portrait.png",
      generations: 0,
      revenue: 0,
      conversionRate: 0,
      createdAt: "2025-05-10",
    },
    {
      id: "8",
      title: "Minimal Lines",
      status: "deprecated",
      coverImage: "/images/minimal-lines.png",
      generations: 321,
      revenue: 290.5,
      conversionRate: 1.8,
      createdAt: "2025-03-15",
    },
  ]

  const columns: ColumnDef<Style>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Style",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded overflow-hidden">
            <img
              src={row.original.coverImage || "/placeholder.svg"}
              alt={row.original.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.original.title}</div>
            <div className="text-xs text-muted-foreground">
              Created {new Date(row.original.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge variant={status === "published" ? "default" : status === "draft" ? "outline" : "secondary"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "generations",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Generations
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right">{row.original.generations.toLocaleString()}</div>,
    },
    {
      accessorKey: "revenue",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Revenue
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="text-right">
          ${row.original.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      accessorKey: "conversionRate",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Conversion
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right">{row.original.conversionRate.toFixed(1)}%</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const style = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => (window.location.href = `/style/${style.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/edit-style/${style.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/clone-style/${style.id}`)}>
                <Copy className="mr-2 h-4 w-4" />
                Clone
              </DropdownMenuItem>
              {style.status !== "deprecated" && (
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deprecate
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter styles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="sm">
            Bulk Actions
          </Button>
        </div>
      </div>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No styles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
