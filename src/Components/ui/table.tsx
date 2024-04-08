import React, { useState } from "react";
import { Button, Title } from "@/components/atomics";
import { PencilSimpleIcon, PlusIcon, SortAscendingIcon } from "@/assets/icons";
import ButtonLoader from "../Loaders/buttonLoader";
import { FormControl, InputLabel, MenuItem, Pagination, Select, useMediaQuery } from "@mui/material";
import { countriesOptions } from "@/utils/country";

interface TableProps {
  data: {
    [key: string]: string | JSX.Element | any;
  }[];
  headers: Header[];
  title: string;
  isLoading?: boolean;
  isAdd?: boolean;
  onAdd?: () => void;
  addButtonLabel?: string;
  isFilter?:boolean;
  filterAction?: (roles?: string) => Promise<void>
  setCountrySelect?: React.Dispatch<React.SetStateAction<boolean>>
  setCountryCode?:React.Dispatch<React.SetStateAction<string>>
  setPayload?: React.Dispatch<any>
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
  addButtonLabel,
  isFilter=false,
  filterAction,
  setCountrySelect,
  setCountryCode,
  setPayload
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

  const isMobile = useMediaQuery("(max-width: 568px)");

 
  const [selectedCountry, setSelectedCountry] = useState(""); // State for selected value

  console.log("selected country",selectedCountry)
  const handleChange = (event: any) => {
    const selectedValue = event.target.value as string;
    setSelectedCountry(selectedValue);
    // Check if setCountrySelect exists and is a function before calling it
    if (setPayload && typeof setPayload === 'function') {
      setPayload({
        countryCode:selectedValue,
        role: localStorage.getItem("role")?.toLowerCase(),
        userId: localStorage.getItem("userId"),
      })
    }

    if( setPayload && selectedValue==='all'){
      setPayload({
        role: "all",
        userId: localStorage.getItem("userId"),
      })
    }
    // // Call filterAction if it's provided
    // if (filterAction) {
    //   // debugger
    //   filterAction(selectedValue);
    // }
  };


  console.log("daatata", typeof data)
  
  return (
    <>
      <div className="h-screen py-8 mb-12">
   {
    data?.length===0&&(   <div className="flex gap-2 items-center justify-end w-full">
    <Button
     size="sm"
     variant="default-bg"
     className="bg-netral-25"
     onClick={onAdd}
   >
     {addButtonLabel}
     <PlusIcon className="w-4 h-4 stroke-2" />
   </Button>
</div>)
   }
       {
        data?.length>0 ? (
          <section className="p-6  bg-white rounded-lg">
          <nav className="mb-8 flex flex-col items-start gap-8 md:flex-row md:items-center justify-between">
           
            <div>
            <Title size="sm" variant="default" className="text-netral-25">
              {title}
            </Title>
            </div>
          
            <div className="flex gap-2 items-center">
              {data?.length > 0 && (
                <Button className="" size="sm" variant="primary-bg" onClick={convertToCSV}>
                  Export CSV
                  <SortAscendingIcon className="w-4 h-4 stroke-2" />
                </Button>
              )}
              {isAdd && (
             <div className="flex gap-2 items-center">
                 <Button
                  size="sm"
                  variant="default-bg"
                  className="bg-netral-25"
                  onClick={onAdd}
                >
                  {addButtonLabel}
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </Button>
             </div>
              )}
            </div>
          </nav>
          <div className="flex flex-col gap-4 sm:flex-row justify-start md:justify-end mb-6 sm:gap-4">
          {data?.length > 0 && (
              <input
                type="text"
                autoComplete="email"
                required
                placeholder="Search Here"
                className="w-72 px-2 py-2 rounded-md border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-netral-25 sm:text-sm"
              />

            )}
          {
        isFilter &&(
          <FormControl className="w-72 md:w-44">
          <InputLabel id="demo-simple-select-label">
            Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={selectedCountry}
            label="Select Filter"
            sx={{
              "&:focus": {
                borderColor: "#000",
              },
            }}
            inputProps={{
              className: "!px-2 py-3", // Add your custom class here
            }}
            onChange={handleChange} // Handle change event
          >
            <MenuItem value="">Select a country</MenuItem>
            {countriesOptions?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
              )
            }
   
            
          </div>
          <div className="overflow-x-auto">
                <table
                  className={`w-full table-auto  ${
                    isLoading ? "h-[400px]" : ""
                  }`}
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
                      <tr >
                        <td
                          colSpan={headers.length}
                          className="px-4 py-4  text-center"
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
                            <td key={header.key} className="px-4 py-4 ">
                              {header.renderCell
                                ? renderCell(item, header)
                                : item[header.key]}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
          </div>
          <div className="w-full flex justify-center mt-12 mb-12">
          <Pagination
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#9acd32 !important", // Set background color for selected button
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "transparent", // Set background color to none on hover
                    color: "#000",
                  },
                }}
                count={10}
                color="primary"
                size={isMobile ? "small":"large"}
              />
                </div>
        </section>
        ):
        <div className="h-full w-full flex items-center justify-center">
       {
        isLoading ? (<ButtonLoader/>):<p>No Data Available</p>
       }
      </div>
       }
      </div>
    </>
  );
};

export default TableComponent;
