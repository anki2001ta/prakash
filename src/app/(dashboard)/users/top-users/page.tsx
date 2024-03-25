"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "@/components/ui/table";
import Image from "next/image";
import ModalComponent from "@/Components/Modal/Modal";
import { Delete } from "@mui/icons-material";

interface UserData {
  images?: string[];
  name: string;
  email: string;
  mobile: string;
}

const PageComponent: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteUserDetails, setDeleteUserDetails] = useState<any>();

  console.log("dlete user details", deleteUserDetails?._id);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://fun2fun.live/user/topUser`);
      const data = await response.json();
      const modifiedData = data.data.map((user: UserData, index: number) => ({
        ...user,
        "sr.no": index + 1,
        name: user.name || "-",
        email: user.email.includes("@") ? user.email : "-",
        mobile: user.mobile || "-",
      }));
      setUserData(modifiedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const renderImageCell = (rowData: UserData) => {
    return rowData.images?.map((image: string, index: number) => (
      <div key={index} style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={image}
          alt="User"
          width={50}
          height={50}
          style={{ marginRight: "5px" }}
        />
      </div>
    ));
  };

  const handleRemoveUser = (data: any) => {
    console.log("data", data);

    if (data) {
      setDeleteUserDetails(data);
      setOpenDeleteModal(true);
    }
    // Implement the logic to remove the user from the data
    // const updatedData = [...userData];
    // updatedData.splice(index, 1);
    // setUserData(updatedData);
  };

  const renderActionCell = (data: any) => {
    return (
      <button
        onClick={() => handleRemoveUser(data)}
        style={{ color: "red" }} // Adding inline style for red color
      >
        Remove
      </button>
    );
  };

  const handleDeleteAction = async () => {
    try {
      const res = await fetch(
        `https://fun2fun.live/user/topUser/${deleteUserDetails?._id}`,
        {
          method: "DELETE",
        }
      );
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
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
      key: "email",
      label: "Email",
    },
    {
      key: "mobile",
      label: "Phone Number",
    },
    {
      key: "action",
      label: "Action",
      renderCell: (data: any) => renderActionCell(data),
    },
  ];

  return (
    <div>
      <TableComponent
        data={userData}
        isLoading={isLoading}
        headers={headerData}
        title="Top Users"
      />
      <ModalComponent
        onAction={handleDeleteAction}
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
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
    </div>
  );
};

export default PageComponent;
