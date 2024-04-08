"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ModalComponent from "@/Components/Modal/Modal";
import { Menu, Transition } from "@headlessui/react";
import { Button, Input } from "@/Components/atomics";
import { Delete, Edit } from "@mui/icons-material";
import withAuth from "@/Components/withAuth";
import { countriesOptions } from "@/utils/country";
import Select from "react-select";
import EditManager, { EditFormData } from "@/Components/EditManager";
import { PlusIcon } from "@/assets/icons";
import axios from "axios";
import EditAdmin from "@/Components/EditAdmin";
import { Avatar } from "@nextui-org/react";

interface UserData {
  userId: string;
  is_active: boolean;
  images?: string[];
  name: string;
  email: string;
  mobile: string;
  countryCode: string;
  _id?: string;
}

const ViewSubAdmin = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [openDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [countrySelect, setCountrySelect] = useState<boolean>(false);
  const [openAddCountryAdminModal, setOpenAddCountryAdminModal] =
    useState<boolean>(false);
  const [openEditManagerModal, setOpenEditManagerModal] =
    useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<string>("");
  const [countryFieldOption, setIsCountryFieldOptions] =
    useState<boolean>(true);
  const [useCountryCode, setUseCountryCode] = useState(() => {
    const storedManager = localStorage.getItem("countryCode");
    return storedManager !== null ? storedManager : "";
  });
  const [editFormDetails, setEditFormDetails] = useState<
    EditFormData | undefined
  >(undefined);
  const [managerId, setManagerId] = useState<string>(() => {
    const storedManager = localStorage.getItem("userId");
    return storedManager !== null ? storedManager : "";
  });
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [manager, setManager] = useState<string>(() => {
    const storedManager = localStorage.getItem("role");
    return storedManager !== null ? storedManager : "";
  });
  const [isFilter, setIsFilter] = useState<boolean>();
  const [payload, setPayload] = useState<any>({
    role: localStorage.getItem("role")?.toLowerCase(),
    userId: localStorage.getItem("userId"),
  });
  const [photo, setPhoto] = useState<File | null>(null);

  const [agency, setAgency] = useState<string>("");
  const [imageFormdata, setImageFormData] = useState()

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleDeleteModal = (id: string) => {
    setIsOpenDeleteModal(true);
    setUserId(id);
  };

  useEffect(() => {
    fetchData();
  }, [payload]);

  useEffect(() => {
    if (manager === "Country Admin") {
      setIsCountryFieldOptions(false);
    }
  }, [manager]);

  const handleEditModal = (data: UserData) => {
    if (data?._id) {
      setEditFormDetails({
        userId: "",
        username: "",
        password: "",
        id: data._id,
      });
      setOpenEditManagerModal(true);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await axios.post(
        "https://fun2fun.live/admin/bd/getByRole",
        payload
      );
      console.log("data response", data);
      const modifiedData = data?.data?.data?.map(
        (user: UserData, index: number) => ({
          ...user,
          "sr.no": index + 1,
          name: user.name || "-",
          mobile: user.mobile || "-",
          status: user.is_active ? "Active" : "Inactive",
          userid: user.userId || "-",
        })
      );
      setUserData([...modifiedData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnAdd = () => {
    setOpenAddCountryAdminModal(true);
  };

  const handleAddCountryModal = async () => {
    
    debugger
    try {
        const formData = new FormData();
        if (photo) {
          formData.append("photo", photo);
        }
        formData.append("username", username);
        formData.append("userId", userid);
        formData.append("password", password);
        formData.append("agency", agency);
        formData.append(
          "countryCode",
          manager === "Country Admin" ? useCountryCode : selectedCountry?.value
        );
        formData.append(
          "createdBy",
          JSON.stringify({
            role: manager.toLowerCase(),
            userId: managerId,
          })
        );
    
        // Debug FormData
        console.log("FormData:", formData);

    //   const response = await axios.post(
    //     "https://fun2fun.live/admin/make/bd",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   if (response.status >= 200 && response.status < 300) {
    //     const data = response.data;
    //     console.log("Country added successfully:", data);
    //     setUserName("");
    //     setUserId("");
    //     setSelectedCountry(null);
    //     setPassword("");
    //     setOpenAddCountryAdminModal(false);
    //     fetchData();
    //     toast.success("Country added successfully");
    //   } else {
    //     console.error("Failed to add country:", response.statusText);
    //     toast.error("Failed to add country");
    //   }
    } catch (error) {
      console.error("Error adding country:", error);
      toast.error("Error adding country");
    } finally {
      setIsModalLoading(false);
      setUserName("");
      setUserId("");
      setSelectedCountry(null);
      setPassword("");
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      setIsModalLoading(true);
      const url = `https://fun2fun.live/admin/remove/official`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userid }),
      });
      if (response.ok) {
        console.log("User deleted successfully");
        toast.success("Data deleted");
        setIsOpenDeleteModal(false);
        fetchData();
      } else {
        console.error("Error deleting user");
        toast.error("Error while deleting data");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error while deleting data");
    } finally {
      setIsModalLoading(false);
    }
  };

  useEffect(() => {
    if (manager === "Master" || manager === "Manager") {
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  }, [manager]);

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
        <span
          className={`${
            rowData?.is_active ? "text-green-500" : "text-red-500"
          }`}
        >
          {rowData?.is_active ? "Active" : "InActive"}
        </span>
      ),
    },
    {
      key: "is_active",
      label: "Action",
      renderCell: (rowData: UserData) => (
        <div className="flex gap-2">
          <div onClick={() => handleEditModal(rowData)}>
            <Edit className="cursor-pointer text-gray-600" />
          </div>
          <div onClick={() => handleDeleteModal(rowData?.userId)}>
            <Delete className="cursor-pointer text-red-600" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-24 p-4">
      <TableComponent
        onAdd={handleOnAdd}
        isLoading={isLoading}
        data={userData}
        headers={headerData}
        addButtonLabel="Add Sub Admin"
        isAdd
        isFilter={isFilter}
        filterAction={fetchData}
        title="View Sub Admins"
        setCountrySelect={setCountrySelect}
        setCountryCode={setCountryCode}
        setPayload={setPayload}
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
        title="Add"
      >
        <div className="p-8">
          {photo ? (
            <div className="mb-8 flex justify-center">
              <Image
                src={URL.createObjectURL(photo)}
                alt="Uploaded Image"
                width={150}
                height={150}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full">
              <Avatar className="h-24 w-24" />
            </div>
          )}
          <div className="mb-4 flex justify-center">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Input
              id="username"
              placeholder="Enter User Name"
              label="User Name"
              variant="default"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              modal
            />
            <Input
              id="userid"
              placeholder="Enter User Id"
              label="Enter User Id"
              variant="default"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
              modal
            />
            {countryFieldOption && (
              <div className="w-full">
                <label className="text-white text-body-base font-semibold mb-2">
                  Country
                </label>
                <Select
                  placeholder="Select Country"
                  value={selectedCountry}
                  onChange={(selectedOptions) =>
                    setSelectedCountry(selectedOptions)
                  }
                  options={countriesOptions}
                />
              </div>
            )}
            <Input
              id="password"
              placeholder=""
              label="Password"
              variant="default"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              modal
            />
            <Input
              id="agency"
              placeholder="Enter Agency"
              label="Agency"
              variant="default"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              modal
            />
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        loading={isModalLoading}
        onAction={() => {}}
        isOpen={openEditManagerModal}
        setIsOpen={setOpenEditManagerModal}
        size="2xl"
        hideButtons
        title="Edit"
      >
        <EditAdmin
          fetchData={fetchData}
          setOpenEditManagerModal={setOpenEditManagerModal}
          formData={editFormDetails}
        />
      </ModalComponent>
    </div>
  );
};

export default withAuth(ViewSubAdmin);
