"use client";
import React,{ useEffect, useState,Fragment } from "react";
import TableComponent from "@/components/ui/table";
import Image from "next/image";
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UserData {
  userId: string;
  is_active_userId: boolean;
  images?: string[];
  name: string;
  email: string;
  mobile: string;
} 

const deleteUserHandler = (userId: any) => {
  const url = `https://techc2.be/admin/user/delete/${userId}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("User deleted successfully");
        toast.success("Data deleted")
        fetchall();
      } else {
        console.log("Error deleting user");
        toast.error("Error while deleting data")
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderImageCell = (rowData: UserData) => {
  return rowData.images?.map((image: string, index: number) => (
    <div key={index} style={{ display: "flex", alignItems: "center" }}>
      {image && 
      <Image
        src={image}
        alt="User"
        width={50}
        height={50}
        style={{ marginRight: "5px" }}
      />}
    </div>
  ));
};

// const headerData = [
//   {
//     key: "sr.no",
//     label: "Sr no",
//   },
//   {
//     key: "images",
//     label: "Image",
//     renderCell: renderImageCell,
//   },
//   {
//     key: "name",
//     label: "Username",
//   },
//   {
//     key: "userid",
//     label: "User Id",
//   },
//   {
//     key: "mobile",
//     label: "Phone",
//   },
//   {
//     key: "diamonds",
//     label: "Diamonds",
//   },
//   {
//     key: "status",
//     label: "Status",
//     renderCell: (rowData: UserData) => (
//       <span className={`${rowData?.status === "Active" ? "text-green-500" : "text-red-500"}`}>
//         {rowData?.status}
//       </span>
//     ),
//   },
  
//   {
//     key: "action",
//     label: "Action",
//     renderCell: (_, index : any) => renderActionCell(index),
//   }
// ];



const ViewUser = () => {
  const [userData,setUserData] = useState<any>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://techc2.be/user/getall`);
      const data = await response?.json();
      const modifiedData = data?.data?.map((user: UserData, index: number) => ({
        ...user,
        "sr.no": index + 1,
        name: user.name || "-",
        mobile: user.mobile || "-",
        status: user.is_active_userId == true ? 'Active' : 'Inactive',
        userid: user.userId || "-"
      }));
      setUserData(modifiedData);
      setIsLoading(false);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const renderActionCell = (index: number,user:any) => {
    return (
      // <div className="relative inline-block text-left">
      //   <div>
      //                   <button
      //                     className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      //                     type="button"
      //                     id="menu-button" aria-expanded="true" aria-haspopup="true"
      //                   >
      //                     <span>Action</span>
      //                     <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      //   <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      // </svg>
      //                   </button>
      //                   </div>
      //                   <ul className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      //                     role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
      //                   >
      //                     <div className="py-1" role="none">
      //                     <li 
      //                     className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0"
      //                     >
      //                       <button
      //                         // className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0"
      //                         // href={`/view-user/${user?._id}`}
      //                       >
      //                         View
      //                       </button>
      //                     </li>
      //                     <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">
      //                       <button
      //                         className="dropdown-item"
      //                         // href={`/edit-user/${user?._id}`}
      //                       >
      //                         Edit
      //                       </button>
      //                     </li>
      //                     <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">
      //                       <button
      //                         className="dropdown-item"
      //                         onClick={() => handleDelete(user?._id)}
      //                       >
      //                         Delete
      //                       </button>
      //                     </li>
      //                     <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">
      //                       <button
      //                         className="dropdown-item"
      //                         // href={`/recieved-gift-history/${user?._id}`}
      //                       >
      //                         Recieved Gift History
      //                       </button>
      //                     </li>
      //                     <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">
      //                       <button
      //                         className="dropdown-item"
      //                         // href={`/send-gift-history/${user?._id}`}
      //                       >
      //                         Send Gift History
      //                       </button>
      //                     </li>
      //                     <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">
      //                       <button
      //                         className="dropdown-item"
      //                         // href={`/mannage-purchased-coin-history/${user?._id}`}
      //                       >
      //                         Coin History
      //                       </button>
      //                     </li>
      //                     <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">
      //                       <button
      //                         className="dropdown-item"
      //                         // href={`/mannage-live-user-history/${user?._id}`}
      //                       >
      //                         Live History
      //                       </button>
      //                     </li>
      //                     </div>
      //                   </ul>
      //                 </div>
      <Menu as="div" className="relative inline-block text-left">
  <div>
    <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lime-400">
      <span>Action</span>
      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </Menu.Button>
  </div>
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
      <div className="py-1" role="none">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => router.push(`/users/view-users/view-user/${user?._id}`)}
            >
              View
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
              onClick={() => router.push(`/users/view-users/edit-user/${user?._id}`)}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
              onClick={() => deleteUserHandler(user?.userId)}
            >
              Delete
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3"
              onClick={() => router.push(`/recieved-gift-history/${user?._id}`)}
            >
              Recieved Gift History
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-4"
              onClick={() => router.push(`/send-gift-history/${user?._id}`)}
            >
              Send Gift History
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-5"
              onClick={() => router.push(`/mannage-purchased-coin-history/${user?._id}`)}
            >
              Coin History
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-6"
              onClick={() => router.push(`/mannage-live-user-history/${user?._id}`)}
            >
              Live History
            </button>
          )}
        </Menu.Item>
        
      </div>
    </Menu.Items>
  </Transition>
</Menu>

    );
  };
  
  const headerData = [
    {
      key: "sr.no",
      label: "Sr no",
    },
    {
      key: "images",
      label: "Image",
      renderCell: renderImageCell,
    },
    {
      key: "name",
      label: "Username",
    },
    {
      key: "userid",
      label: "User Id",
    },
    {
      key: "mobile",
      label: "Phone",
    },
    {
      key: "diamonds",
      label: "Diamonds",
    },
     {
    key: "status",
    label: "Status",
    renderCell: (rowData: UserData) => (
      <span className={`${rowData?.status === "Active" ? "text-green-500" : "text-red-500"}`}>
        {rowData?.status}
      </span>
    ),
  },
    {
      key: "action",
      label: "Action",
      renderCell: (_, index) => renderActionCell(index,_),
    }
  ];

  return (<>
    <TableComponent isLoading={isLoading} data={userData} headers={headerData} title="View Users" />
    </>
  );
};

export default ViewUser;
