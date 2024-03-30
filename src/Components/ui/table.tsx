import React, { useState } from "react";
import { Button, Title } from "@/components/atomics";
import { PencilSimpleIcon, PlusIcon, SortAscendingIcon } from "@/assets/icons";
import ButtonLoader from "../Loaders/buttonLoader";

interface TableProps {
  data: {
    [key: string]: string | JSX.Element | any;
  }[];
  headers: Header[];
  title: string;
  isLoading?: boolean;
  isAdd?: boolean;
  onAdd?:()=>void;
  handleSearch?: (term: string) => void;
}

interface Header {
  key: string;
  label: string;
  renderCell?: (rowData: any) => JSX.Element | null;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  headers,
  title,
  isLoading,
  isAdd = false,
  onAdd,
  handleSearch
}) => {
  const convertToCSV = () => {
    if (!data) return;

    const csv = [
      headers.map((header) => header.label).join(","),
      ...data.map((item) =>
        headers.map((header) => item[header.key] ?? "").join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderCell = (rowData: any, header: Header) => {
    if (header.renderCell) {
      return header.renderCell(rowData);
    }
    return rowData[header.key];
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as any;
    setSearchTerm(value);
    if(handleSearch)   handleSearch(value); 
  // Pass the search term to the parent component
  };


  return (
    <>
      <div className="relative p-6 space-y-6">
        <section className="relativ min-h-screen p-6 bg-white rounded-lg">
          <nav className="flex items-center justify-between mb-8">
            <Title size="sm" variant="default" className="text-netral-25">
              {title}
            </Title>
            <div className="flex gap-2 items-center">
              <Button size="sm" variant="primary-bg" onClick={convertToCSV}>
                Export CSV
                <SortAscendingIcon className="w-4 h-4 stroke-2" />
              </Button>
              {isAdd && (
                <Button size="sm" variant="default-bg"  className="bg-netral-25" onClick={onAdd}>
                  Add Manager
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </Button>
              )}
            </div>
          </nav>
          <div className="flex justify-end mb-6">
            <input
              type="text"
              required
              placeholder="Search Here"
              onChange={handleInputChange}
              value={searchTerm}
              className="w-72 px-4 py-2 rounded-md border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-netral-25 sm:text-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <table
              className={`w-full table-auto ${isLoading ? "h-[400px]" : ""}`}
            >
              <thead className="font-semibold text-left bg-netral-15  w-[400px]">
                <tr>
                  {headers?.map((header) => (
                    <th
                      key={header.key}
                      className={`px-4 py-3 whitespace-nowrap`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-netral-20">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-4 py-4 text-center"
                    >
                      <div className="relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <ButtonLoader />
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header) => (
                     <td key={header.key} className="px-4 py-4 w-[100px] text-clip overflow-hidden ">
                     {header.renderCell ? renderCell(item, header) : item[header.key]}
                   </td>
                   
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default TableComponent;
