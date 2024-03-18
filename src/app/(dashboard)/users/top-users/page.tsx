"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "@/components/ui/table";
import Image from "next/image";

interface UserData {
  images?: string[];
  name: string;
  email: string;
  mobile: string;
}

const PageComponent: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://techc2.be/user/topUser`);
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

  const handleRemoveUser = (index: number) => {
    // Implement the logic to remove the user from the data
    const updatedData = [...userData];
    updatedData.splice(index, 1);
    setUserData(updatedData);
  };

  const renderActionCell = (index: number) => {
    return (
      <button
        onClick={() => handleRemoveUser(index)}
        style={{ color: 'red' }} // Adding inline style for red color
      >
        Remove
      </button>
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
      renderCell: (_, index) => renderActionCell(index),
    }
  ];

  return (
    <div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TableComponent
            data={userData}
            headers={headerData}
            title="Top Users"
          />
        </>
      )}
    </div>
  );
};

export default PageComponent;
