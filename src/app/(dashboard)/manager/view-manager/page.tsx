"use client";
import React, { useEffect, useState, Fragment } from "react";
import TableComponent from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ModalComponent from "@/Components/Modal/Modal";
import { Menu, Transition } from "@headlessui/react";
import { Input } from "@/Components/atomics";
import { Delete, Edit } from "@mui/icons-material";

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
  const [openEditManagerModal, setOpenEditManagerModal] =useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [managerId, setManagerId] = useState<string>("");
  const handleDeleteModal = (id: string) => {
    setIsOpenDeleteModal(true);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleEditItem=(data:any)=>{
    console.log("data is",data)
  
  }


  const handleDeleteManager=()=> {
    console.log("amager id", managerId)
  }

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

      setUserData([...modifiedData]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
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
      renderCell: (rowData:any) =>(
        <div className="flex gap-2">
          <div className="cursor-pointer" onClick={()=>handleEditItem(rowData)}><Edit/></div>
          <div className="cursor-pointer" onClick={()=>{
            setIsOpenDeleteModal(true)
            setManagerId(rowData.userId);
          }}><Delete/></div>
        </div>
      ),
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
        size="2xl"
      >
        <div className="px-8 py-4 grid grid-cols-1 gap-x-5 gap-y-8">
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
        </div>
      </ModalComponent>
      <ModalComponent
        onAction={handleDeleteManager}
        isOpen={openAddManagerModal}
        setIsOpen={setOpenAddManagerModal}
        size="2xl"
      >
        <div className="px-8 py-4 grid grid-cols-1 gap-x-5 gap-y-8">
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
            placeholder="Enter User Id"
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
        </div>
      </ModalComponent>
    </>
  );
};

export default ViewUser;
