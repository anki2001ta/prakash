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
import EditManager from "@/Components/EditManager";

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
  const [openAddCountryAdminModal, setOpenAddCountryAdminModal] =
    useState<boolean>(false);
  const [openEditManagerModal, setOpenEditManagerModal] =
    useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [manager, setManager] = useState<string>(() => {
    const storedManager = localStorage.getItem("username");
    return storedManager !== null ? storedManager : "";
  });
  const [country, setCountry] = useState<string>("");
  const [managerId, setManagerId] = useState<string>("");
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)
  const handleDeleteModal = (id: string) => {
    setIsOpenDeleteModal(true);
    setUserId(id)
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditItem = (data: any) => {
    console.log("data is", data);
  };

  const [editForm, setEditForm]= useState<any>({

  })

  // useEffect(()=>{

  // },[])
const handleDeleteAdmin =async()=> {
    try {
      setIsModalLoading(true)
      const url = `https://fun2fun.live/admin/remove/country-admin`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // Pass userId in the body
        body: JSON.stringify({ userId: userid }),
      });
  
      if (response.ok) {
        console.log("User deleted successfully");
        toast.success("Data deleted");
        setIsOpenDeleteModal(false)
        setIsModalLoading(false)
        // Refetch data after deletion
        fetchData();
      } else {
        console.log("Error deleting user");
        toast.error("Error while deleting data");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error while deleting data");
      setIsModalLoading(false)
    }
  
}

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://fun2fun.live/admin/country-admin/getall`
      );
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

  const handleActive = async (checked: boolean, id: string) => {
    try {
      const response = await fetch("https://fun2fun.live/admin/manager/ban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          is_active: checked,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();

      // Find the index of the user in the existing userData array
      const index = userData.findIndex(
        (user: any) => user.userId === updatedData.data.userId
      );

      if (index !== -1) {
        setUserData((prevUserData: any) => {
          const newData = [...prevUserData];
          newData[index] = {
            ...newData[index], // Keep existing properties
            is_active: updatedData?.data?.is_active, // Update is_active
            status: updatedData?.data?.is_active ? "Active" : "Inactive", // Update status
          };
          return newData;
        });
      } else {
        console.error(
          `User with userId ${updatedData.data.userId} not found in userData array.`
        );
      }
    } catch (error) {
      console.error("Error toggling user ban status:", error);
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
      key: "countryCode",
      label: "Country Code",
    },



    {
      key: "status",
      label: "Status",
      renderCell: (rowData: UserData) => (
        <span className={`${rowData?.is_active ? "text-green-500" : "text-red-500"}`}>
          {rowData?.is_active ? "Active":"InActive"}
        </span>
      ),
    },
    {
      key: "is_active",
      label: "Action",
      renderCell: (rowData: UserData) => (
        <div className="flex gap-2">
          {/* <div onClick={() => setOpenEditManagerModal(true)} >
            <Edit className="cursor-pointer  text-gray-600" />
          </div> */}
          <div onClick={()=>handleDeleteModal(rowData?.userId)}>
            <Delete className="cursor-pointer text-red-600" />
          </div>
        </div>
      ),
    },
    
  ];

  const handleOnAdd = () => {
    setOpenAddCountryAdminModal(true);
  };

  const handleAddCountryModal = async () => {
    try {
      setIsModalLoading(true);
      const response = await fetch(
        `https://fun2fun.live/admin/make/country-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            userId: userid,
            password: password,
            countryCode: country,
            createdBy: manager,
          }),
        }
      );
      if (response.ok) {
        // Request was successful
        const data = await response.json();
        console.log("Country added successfully:", data);
        fetchData();
        setIsModalLoading(false)
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
      setIsModalLoading(false)
    } finally {
      fetchData();
      setOpenAddCountryAdminModal(false); // Close the modal regardless of success or failure
    }
  };

  return (
    <>
      <TableComponent
        onAdd={handleOnAdd}
        isLoading={isLoading}
        data={userData}
        headers={headerData}
        addButtonLabel="Add Country Admin"
        isAdd
        title="View Country Admins"
      />
      <ModalComponent
        onAction={handleDeleteAdmin}
        isOpen={openDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        size="2xl"
        actionLabel="Delete"
        loading={isModalLoading}
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
       loading={isModalLoading}
        onAction={handleAddCountryModal}
        isOpen={openAddCountryAdminModal}
        setIsOpen={setOpenAddCountryAdminModal}
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
            id="country"
            placeholder="Country Code"
            label="Country"
            variant="default"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            id="manager"
            placeholder=""
            label="Created By"
            variant="default"
            value={manager}
            disabled
            onChange={(e) => setManager(e.target.value)}
          />
          <Input
            id="password"
            placeholder=""
            label="Password"
            variant="default"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </ModalComponent>
      <ModalComponent
        loading={isModalLoading}
        onAction={() => {}}
        isOpen={openEditManagerModal}
        setIsOpen={setOpenEditManagerModal}
        size="2xl"
      >
        {/* <div>
          <div className="p-12 flex justify-center w-full  text-white text-[20px]">
            <p className="text-white text-[20px]">
              Are You Sure You Want to Delete?
            </p>
          </div>
        </div> */}
        <div>Edit Modal</div>
      </ModalComponent>
    </>
  );
};

export default ViewUser;
