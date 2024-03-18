import React from "react";
import { Button, Title } from "@/components/atomics";
import { SortAscendingIcon } from "@/assets/icons";
import ButtonLoader from '../Loaders/buttonLoader'
import Image from "next/image";

interface TableProps {
  data: {
    [key: string]: string | JSX.Element | any;
  }[];
  headers: Header[];
  title: string;
  isLoading?:boolean;
}

interface Header {
  key: string;
  label: string;
  renderCell?: (rowData: any) => JSX.Element | null;
}

const TableComponent: React.FC<TableProps> = ({ data, headers, title, isLoading }) => {
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


  return (
    <>
      
   <div className="relative p-6 space-y-6">
      <section className="relative p-6 bg-white rounded-lg"> ̰
        <nav className="flex items-center justify-between mb-8">
          <Title size="sm" variant="default" className="text-netral-25">
            {title}
          </Title>
          <Button size="sm" variant="primary-bg" onClick={convertToCSV}>
            Export CSV
            <SortAscendingIcon className="w-4 h-4 stroke-2" />
          </Button>
        </nav>
        <div className="flex justify-end mb-6">
          <input
            type="text"
            autoComplete="email"
            required
            placeholder="Search Here"
            className="w-72 px-4 py-2 rounded-md border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-netral-25 sm:text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
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
              
              {
              
              isLoading ? <div className=" w-full flex justify-center">
                 <ButtonLoader/> 
              </div> :
              
              
              data?.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      className="px-4 py-4 "
                    >
                      {header.renderCell
                        ? renderCell(item, header)
                        : item[header.key]}
                    </td>
                  ))}
                </tr>
              ))
              
              
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
    
    </>
  );
};

export default TableComponent;
