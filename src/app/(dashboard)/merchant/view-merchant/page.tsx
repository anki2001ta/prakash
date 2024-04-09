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
import EditMerchant from "@/Components/EditMerchant";

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

const ViewAdmin = () => {
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

  const filteredOptions = [
    {
      label: manager,
      value: manager,
    },
    {
      label: "All",
      value: "all",
    },
  ];

  const [selectedCountryByValue, setSelectCountryByValue] = useState<any>(
    filteredOptions[0] || {}
  );

  const handleDeleteModal = (id: any) => {
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

  const handleEditModal = (data: any) => {
    setEditFormDetails({
      userId: "",
      username: "",
      password: "",
      id: data?._id,
    });
    setOpenEditManagerModal(true);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await axios.post(
        "https://fun2fun.live/admin/merchent/getByRole",
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

  console.log("use country code", useCountryCode)

  const handleAddCountryModal = async () => {
    try {
      setIsModalLoading(true);
      const response = await fetch(`https://fun2fun.live/admin/make/merchent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          userId: userid,
          password: password,
          countryCode: manager==="Country Admin" ? useCountryCode:selectedCountry?.value,
          createdBy: {
            role: manager.toLowerCase(),
            userId: managerId,
          },
        }),
      });
      fetchData();
      if (response.ok) {
        const data = await response.json();
        console.log("Country added successfully:", data);
        setUserName("");
        setUserId("");
        selectedCountry({});
        setPassword("");

        fetchData();
      } else {
        console.error("Failed to add manager:", response.statusText);
        setUserName("");
        setUserId("");
        setSelectedCountry({ label: "", value: "" });
        setPassword("");
      }
    } catch (error) {
      fetchData();
      console.error("Error adding manager:", error);
      setUserName("");
      setUserId("");
      setSelectedCountry({ label: "", value: "" });
      setPassword("");
    } finally {
      fetchData();
      setIsModalLoading(false);
      setOpenAddCountryAdminModal(false);
      setUserName("");
      setUserId("");
      setSelectedCountry({ label: "", value: "" });
      setPassword("");
    }
  };

  const handleDeleteAdmin = async () => {

    console.log("user id", userid)
    try {
      setIsModalLoading(true);
      const url = `https://fun2fun.live/admin/remove/merchent`;
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
      {/* <div className="w-full">
            <label className="text-white text-body-base font-semibold mb-6">Country</label>
            <Select
            className='w-[20%]'
              placeholder="Select Country"
              value={selectedCountryByValue} // Selected values should match one of the options exactly
              onChange={(selectedOptions) => {
              setSelectCountryByValue(selectedOptions);
              }}
              options={filteredOptions}
            />
            </div> */}

      <div className="flex gap-2 items-center">
        {/* <Button
          size="sm"
          variant="default-bg"
          className="bg-netral-25"
          onClick={getAllDetails}
        >
          Get All Countries
        </Button> */}
      </div>

      <TableComponent
        onAdd={handleOnAdd}
        isLoading={isLoading}
        data={userData}
        headers={headerData}
        addButtonLabel="Add Merchant"
        isAdd
        isFilter={isFilter}
        filterAction={fetchData}
        title="View Merhcants"
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
        <div className="px-8 py-4 grid grid-cols-1 gap-x-5 gap-y-8">
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
              <label className="text-white text-body-base font-semibold mb-6">
                Country
              </label>
              <Select
                placeholder="Select Country"
                value={selectedCountry} // Selected values should match one of the options exactly
                onChange={(selectedOptions) => {
                  setSelectedCountry(selectedOptions);
                }}
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
        <EditMerchant
          fetchData={fetchData}
          setOpenEditManagerModal={setOpenEditManagerModal}
          formData={editFormDetails}
        />
      </ModalComponent>
    </div>
  );
};

export default withAuth(ViewAdmin);
