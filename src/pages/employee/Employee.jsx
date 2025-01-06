import './employee.css';
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FlecheAsc from '../../assets/sort_asc.png';
import FlecheDesc from '../../assets/sort_desc.png';

/* import ReactDOM from "react-dom/client" */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable
} from "@tanstack/react-table"

// A TanStack fork of Kent C. Dodds' match-sorter library that provides ranking information
import { rankItem, compareItems } from "@tanstack/match-sorter-utils"

import { makeData } from "./makeData"

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}


function Employee() {
  
  /* const employees = JSON.parse(localStorage.getItem('employees')); // récupère le tableau employees qui contient les clients crées
  console.log(employees); */
  const employees = useSelector((state) => state.auth.user);
  console.log('Liste des employés :', employees);

  /* const rerender = React.useReducer(() => ({}), {})[1] */

  const [columnFilters, setColumnFilters] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  const columns = React.useMemo(
    () => [
      /* {
        accessorKey: "id",
        filterFn: "equalsString" //note: normal non-fuzzy filter column - exact match required
      }, */
      {
        accessorKey: "firstName",
        header: "First Name",
        cell: info => info.getValue(),
        filterFn: "includesStringSensitive" //note: normal non-fuzzy filter column
      },
      {
        accessorFn: row => row.lastName, //note: normal non-fuzzy filter column - case sensitive
        id: "lastName",
        cell: info => info.getValue(),
        header: "Last Name",
        filterFn: "includesString" //note: normal non-fuzzy filter column - case insensitive
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: info => info.getValue()
      },
      { 
        accessorKey: "birthDate",
        header: "Date of Birth",
        cell: info => info.getValue()
      },
      {
        accessorKey: "street",
        header: "Street",
        cell: info => info.getValue()
      },
      {
        accessorKey: "city",
        header: "City",
        cell: info => info.getValue()
      },
      {
        accessorKey: "state",
        header: "State",
        cell: info => info.getValue()
      },
      {
        accessorKey: "zipCode",
        header: "Zip Code",
        cell: info => info.getValue()
      }
    ],
    []
  )

  /* const [data, setData] = React.useState(() => makeData(5_000)) */
  const [data, setData] = React.useState(employees);
  /* const refreshData = () => setData(_old => makeData(50_000)) //stress test */

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  })

  //apply the fuzzy sort if the fullName column is being filtered
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  return (
    <main>
      <h1>Current Employees</h1>
      <div className="p-2">
        <div className='entries-search-position'>
          <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 25, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize} entries
                </option>
              ))}
            </select>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={value => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search"
          />
        </div>
        <div className="h-2" />
        <table className="table-padding">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className='column-padding'>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler()
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                             {header.column.getIsSorted() === "asc" ? (
                                <img src={FlecheAsc} alt="Asc" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <img src={FlecheDesc} alt="Desc" />
                              ) : null}
                            {/* {{
                              asc: " 🔼",
                              desc: " 🔽"
                            }[header.column.getIsSorted()] ?? null} */}
                          </div>
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="h-2" />
        <div className="flex items-center gap-2 bottom-table-info">
          <span className="flex items-center gap-1 page-number">
            <div className='page-number-text'>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
      <NavLink to='/'>Home</NavLink>
    </main>
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export default Employee;
