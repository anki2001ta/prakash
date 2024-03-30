"use client";
import React, { useEffect, useState, Fragment } from "react";
import TableComponent from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ModalComponent from "@/Components/Modal/Modal";
import { Menu, Transition } from "@headlessui/react";
import { Input } from "@/Components/atomics";

interface UserData {
  userId: string;
  is_active: boolean;
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
        toast.success("Data deleted");
        fetchall();
      } else {
        console.log("Error deleting user");
        toast.error("Error while deleting data");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderImageCell = (rowData: UserData) => {
  return rowData.images?.map((image: string, index: number) => (
    <div key={index} style={{ display: "flex", alignItems: "center" }}>
      {image && (
        <Image
          src={image}
          alt="User"
          width={50}
          height={50}
          style={{ marginRight: "5px" }}
        />
      )}
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
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [openDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [openAddManagerModal, setOpenAddManagerModal] =
    useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const handleDeleteModal = (id: string) => {
    setIsOpenDeleteModal(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://fun2fun.live/admin/manager/getall`);
      const data = await response?.json();
      console.log("data is", data);
      const modifiedData = data?.data?.map((user: UserData, index: number) => ({
        ...user,
        "sr.no": index + 1,
        name: user.name || "-",
        mobile: user.mobile || "-",
        status: user.is_active == true ? "Active" : "Inactive",
        userid: user.userId || "-",
      }));

      const clonedData = [
        {
          "sr.no": 2,
          name: "ddd",
          mobile: "33",
          status: true,
          userid: "343",
        },
        {
          "sr.no": 3,
          name: "ddd",
          mobile: "33",
          status: true,
          userid: "343",
        },
        {
          "sr.no": 4,
          name: "ddd",
          mobile: "33",
          status: true,
          userid: "343",
        },
        {
          "sr.no": 5,
          name: "ddd",
          mobile: "33",
          status: true,
          userid: "343",
        },
      ];
      setUserData([...modifiedData, ...clonedData]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const renderActionCell = (index: number, user: any) => {
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
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
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
          <Menu.Items
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm w-full text-left`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                    onClick={() =>
                      handleDeleteModal(deleteUserHandler(user?.userId))
                    }
                  >
                    Add
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm w-full text-left`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={() =>
                      router.push(`/users/view-users/view-user/${user?._id}`)
                    }
                  >
                    View
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm w-full text-left`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                    onClick={() =>
                      router.push(`/users/view-users/edit-user/${user?._id}`)
                    }

                    // onClick={()=>{setIsOpenEditModal(true)}}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm w-full text-left`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                    onClick={() =>
                      handleDeleteModal(deleteUserHandler(user?.userId))
                    }
                  >
                    Delete
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
      key: "userid",
      label: "UserId",
    },
    {
      key: "username",
      label: "UserName",
    },
    {
      key: "countryCode",
      label: "CountryCode",
    },
    {
      key: "is_active",
      label: "Status",
      renderCell: (rowData: UserData) => (
        <span
          className={`${
            rowData?.is_active ? "text-green-500" : "text-red-500"
          }`}
        >
          {rowData?.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      renderCell: (_, index) => renderActionCell(index, _),
    },
  ];

  const handleOnAdd = () => {
    setOpenAddManagerModal(true);
  };

  const handleAddManager = async () => {
    try {
      const response = await fetch(`https://fun2fun.live/admin/make/manager`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          userId: userid,
          password: password,
          // countrycode: country,
        }),
      });
      if (response.ok) {
        // Request was successful
        const data = await response.json();
        console.log("Manager added successfully:", data);
        fetchData();
        // Optionally, perform any actions after successful addition
      } else {
        // Request failed
        console.error("Failed to add manager:", response.statusText);
        // Optionally, handle error scenario
      }
    } catch (error) {
      // Network error or other error occurred
      console.error("Error adding manager:", error);
      // Optionally, handle error scenario
    } finally {
      fetchData();
      setOpenAddManagerModal(false); // Close the modal regardless of success or failure
    }
  };

  return (
    <>
      <TableComponent
        onAdd={handleOnAdd}
        isLoading={isLoading}
        data={userData}
        isAdd={true}
        headers={headerData}
        title="View Managers"
      />
      <ModalComponent
        onAction={() => {}}
        isOpen={openDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        size="2xl"
      >
        <div>
          <div className="p-12 flex justify-center w-full  text-white text-[20px]">
            <p className="text-white text-[20px]">
              Are You Sure You Want to Delete?
            </p>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        onAction={handleAddManager}
        isOpen={openAddManagerModal}
        setIsOpen={setOpenAddManagerModal}
        size="4xl"
      >
        <div className="px-8 py-4 grid grid-cols-2 gap-x-5 gap-y-8">
          <Input
            id="username"
            placeholder="Enter User Name"
            label="User Name"
            variant="default"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input
            id="userid"
            placeholder="Enter email address"
            label="Enter User Id"
            variant="default"
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            id="password"
            placeholder="Password"
            label="Password"
            variant="default"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            id="country-code"
            placeholder="Enter country code"
            label="Country Code"
            variant="default"
            onChange={(e) => setCountry(e.target.value)}
          />
          {/* <Input
                id="beans"
                label="Beans"
                variant="default"
                placeholder="Beans"
                value={userData?.beans}
              /> */}
          {/* <Input
                id="diamonds"
                onChange={handleChange}
                value={userData?.diamonds}
                label="Diamonds"
                placeholder="Diamnonds"
              />
              <Input
                value={userData?.bio}
                id="bio"
                label="Bio"
                placeholder="Bio"
              />
              <Input
                value={userData?.roomName}
                onChange={handleChange}
                id="roomName"
                label="Room Name"
                placeholder="Room Name"
              /> */}
        </div>
      </ModalComponent>
    </>
  );
};

export default ViewUser;
