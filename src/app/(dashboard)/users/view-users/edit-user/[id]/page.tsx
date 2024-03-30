"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";
import { useRouter } from "next/navigation";
import { Alerts, Button, Input, Title } from "@/components/atomics";
import { PencilSimpleIcon } from "@/assets/icons";

const Page = ({ params }: { params: { id: string } }) => {
  console.log("parmas id is", params);
  // @ts-ignore
  const [data, setData] = useState(null);
  const [badges, setBadges] = useState<any>([]);
  const [selectedBadges, setSelectedBadges] = useState<any>([]);
  const [name, setName] = useState<string>();
  const [vehicle, setVehicle] = useState<any>([]);
  const [frame, setFrame] = useState<any>([]);
  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    mobile: 0,
    beans: 0,
    diamonds: "",
    bio: "",
    roomName: "",
    images: [],
  });
  const [selectedframe, setSelectedframe] = useState<any>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>([]);
  const [wallpaper, setWallpaper] = useState<any>([]);
  const [lockRoom, setLockRoom] = useState<any>([]);
  const [chatProfile, setChatProfile] = useState<any>([]);
  const [specialId, setSpecialId] = useState<any>([]);
  const [vip, setVip] = useState<any>([]);
  const [sVip, setSVip] = useState<any>([]);
  const [agency, setAgency] = useState<any>([]);
  const [extraSeat, setExtraSeat] = useState<any>([]);
  const [selectedadmin, setSelectedadmin] = useState<any>([]);
  const [admin, setAdmin] = useState<any>([]);
  const [subAdmin, setSubAdmin] = useState<any>([]);
  const [selectedsubAdmin, setSelectedsubAdmin] = useState<any>([]);
  const [selectedagency, setSelectedagency] = useState<any>([]);
  const [selectedchatProfile, setSelectedchatProfile] = useState<any>([]);
  const [selectedextraSeat, setSelectedextraSeat] = useState<any>([]);
  const [selectedlockRoom, setSelectedlockRoom] = useState<any>([]);
  const [selectedspecialId, setSelectedspecialId] = useState<any>([]);
  const [selectedsvip, setSelectedsvip] = useState<any>([]);
  const [selectedvip, setSelectedvip] = useState<any>([]);
  const [selectedwallpaper, setSelectedwallpaper] = useState<any>([]);
  const [openAlertsSuccess, setOpenAlertsSuccess] = useState<boolean>(false)

  const [previousIsActive, setPreviousIsActive] = useState(false);
  const [liveBanData, setLiveBanData] = useState(false);

  const fetchBadges = async () => {
    try {
      const response = await fetch("https://fun2fun.live/admin/tags/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setBadges(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch("https://fun2fun.live/admin/vehicle/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setVehicle(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchWallpaper = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/wallpaper/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setWallpaper(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };
  const fetchFrame = async () => {
    try {
      const response = await fetch("https://fun2fun.live/admin/frame/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setFrame(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchChatProfile = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/chatBubble/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setChatProfile(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };
  const fetchVipList = async () => {
    try {
      const response = await fetch("https://fun2fun.live/admin/vip/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setVip(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchSvip = async () => {
    try {
      const response = await fetch("https://fun2fun.live/admin/svip/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setSVip(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchLockRoom = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/lockRoom/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setLockRoom(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchExtraSeat = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/extraSeat/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setExtraSeat(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchSpecialId = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/specialId/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setSpecialId(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/adminuser/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setAdmin(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const fetchAgency = async () => {
    try {
      const response = await fetch("https://fun2fun.live/admin/agency/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setAgency(jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };
  useEffect(() => {
    fetchBadges();
    fetchFrame();
    fetchVehicles();
    fetchWallpaper();
    fetchChatProfile();
    fetchExtraSeat();
    fetchData();
    fetchVipList();
    fetchLockRoom();
    fetchSpecialId();
    fetchAdmin();
    fetchSvip();
    fetchSpecialId();
    fetchExtraSeat();
    fetchSubAdmin();
  }, []);

  useEffect(() => {
    if (data) {
      setPreviousIsActive(data?.is_active_userId);
      setLiveBanData(data?.is_active_live);
    }
  }, [data]);

  const fetchSubAdmin = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/subAdminUser/getall"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setSubAdmin(jsonData.data);
      console.log("Fetched Badges:", jsonData.data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };
  console.log("user data", userData);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://fun2fun.live/user/getbyid/${params?.id}`
      );
      const jsonData = await response.json();
      const { data } = jsonData;

      // Set individual states using destructured data object
      setUserData(data);
      setSelectedframe(data?.frame);
      setSelectedBadges(data.tags);
      setSelectedVehicle(data.vehicle);
      setSelectedadmin(data.admin);
      setSelectedsubAdmin(data.subAdmin);
      setSelectedagency(data.agency);
      setSelectedchatProfile(data.profileCard);
      setSelectedextraSeat(data.extraSeat);
      setSelectedlockRoom(data.lockRoom);
      setSelectedspecialId(data.special_id);
      setSelectedsvip(data.svip);
      setSelectedvip(data.vip);
      setSelectedwallpaper(data.roomWallpaper);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserData((prevUserData: any) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const modifyOptions = (item: any) => {
    const data = item?.map((d: any) => ({
      label: d?.label,
      value: d?.value,
    }));
    return data;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) return;

    // Assuming you have a function to upload the image
    // Implement your image uploading logic here
    // For example, you can use FormData to send the image to your server
    const formData = new FormData();
    formData.append("image", file);

    // Then make a POST request to your server to upload the image
    // Example:
    // fetch("YOUR_UPLOAD_ENDPOINT", {
    //   method: "POST",
    //   body: formData,
    // }).then(response => {
    //   // Handle response
    // }).catch(error => {
    //   console.error("Error uploading image:", error);
    // });

    // Once uploaded, you can update the state with the new image URL
    const imageURL = URL.createObjectURL(file);
    setUserData((prevUserData: any) => ({
      ...prevUserData,
      images: [imageURL, ...prevUserData.images],
    }));
  };
  const handleImageRemove = (index: number) => {
    const updatedImages = [...userData.images];
    updatedImages.splice(index, 1);
    setUserData((prevUserData: any) => ({
      ...prevUserData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://fun2fun.live/admin/user/update/${userData?.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData?.name,
            email: userData?.email,
            diamonds: userData?.diamonds,
            coins: userData?.coins,
            beans: userData?.beans,
            roomName: userData?.roomName,
            bio: userData?.bio,
            mobile: userData?.mobile,
            tags: selectedBadges,
            vehicle: selectedVehicle,
            frame: selectedframe,
            roomWallpaper: selectedwallpaper,
            profileCard: selectedchatProfile,
            vip: selectedvip,
            svip: selectedsvip,
            lockRoom: selectedlockRoom,
            extraSeat: selectedextraSeat,
            agency: selectedagency,
            admin: selectedadmin,
            subAdmin: selectedsubAdmin,
            special_id: selectedspecialId,
          }),
        }
      );

      if (response.ok) {
        console.log("User data updated successfully");
        toast.success("Data Successfully edited");
        setOpenAlertsSuccess(true)
        fetchData();
      } else {
        console.error("Error updating user data");
        toast.error("Error while editing");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <div className="relative h-[calc(100vh_-_80px)] p-6">
        <div className="space-y-6">
          <h1 className="text-heading-sm font-semibold">Edit</h1>
          <section className="relative space-y-6 rounded-lg-10 bg-white p-6">
            <div className="flex w-full justify-between items-center">
              <Title size="lg" variant="default">
                User Information
              </Title>
              <Button
                size="md"
                variant="primary-bg"
              onClick={handleSubmit}
              >
                <PencilSimpleIcon className="h-4 w-4 stroke-[4px]" />
                Edit
              </Button>
            </div>
            <div className="mt-[...]">
              {/* Display user images */}
              <div className="relative">
                {userData.images.map((image: string, index: number) => (
                  <div key={index} className="relative inline-block mr-2">
                    <img
                      className="h-56 w-56 rounded-[50%] object-contain"
                      src={image}
                      alt="User Avatar"
                    />
                    {/* Button to remove image */}

                    <div className="absolute top-0 left-56 ">
                      <div className="flex gap-4">
                        <div className="">
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            {/* Icon or text for adding/changing image */}
                            <span className="text-blue-500">Change</span>
                          </label>
                          <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="grid grid-cols-2 gap-x-5 gap-y-8">
              <Input
                id="name"
                placeholder="Enter name"
                label="Name"
                variant="default"
                value={userData?.name}
                onChange={handleChange}
              />

              <Input
                id="email"
                placeholder="Enter email address"
                label="Email Adress"
                variant="default"
                value={userData?.email}
                onChange={handleChange}
              />
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                label="Phone Number"
                variant="default"
                value={userData?.mobile}
                onChange={handleChange}
              />

              <Input
                id="complete-address"
                placeholder="Enter complete adress"
                label="Complete Address"
                variant="default"
                onChange={handleChange}
              />
              <Input
                id="beans"
                label="Beans"
                variant="default"
                placeholder="Beans"
                value={userData?.beans}
              />
              <Input
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
              />
            </form>
          </section>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8">
            <div className="flex flex-col py-2 gap-2 mt-2">
              <label>Tags</label>
              <Select
                placeholder="Select Tag"
                value={selectedBadges} // Selected values should match one of the options exactly
                onChange={(selectedOptions) => {
                  setSelectedBadges(selectedOptions);
                }}
                options={modifyOptions(badges)}
                isMulti
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Vehicles</label>
              <Select
                isMulti
                placeholder="Select Vehicle"
                value={selectedVehicle}
                onChange={(selectedOptions) => {
                  setSelectedVehicle(selectedOptions);
                }}
                options={modifyOptions(vehicle)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Room Wallpaper</label>
              <Select
                placeholder="Select Room Wallpaper"
                onChange={(selectedOptions) => {
                  setSelectedwallpaper(selectedOptions);
                }}
                isMulti
                value={selectedwallpaper}
                options={modifyOptions(wallpaper)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Frame</label>
              <Select
                placeholder="Select Frame"
                onChange={(selectedOptions) => {
                  setSelectedframe(selectedOptions);
                }}
                isMulti
                value={selectedframe}
                options={modifyOptions(frame)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Chat Profile</label>
              <Select
                placeholder="Select Chat Profile"
                onChange={(selectedOptions) => {
                  setSelectedchatProfile(selectedOptions);
                }}
                isMulti
                value={selectedchatProfile}
                options={modifyOptions(chatProfile)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Vip</label>
              <Select
                onChange={(selectedOptions) => {
                  setSelectedvip(selectedOptions);
                }}
                placeholder="Select VIP"
                isMulti
                value={selectedvip}
                options={modifyOptions(vip)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>SVip</label>
              <Select
                placeholder="Select SVIP"
                onChange={(selectedOptions) => {
                  setSelectedsvip(selectedOptions);
                }}
                isMulti
                value={selectedsvip}
                options={modifyOptions(sVip)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Lock Room</label>
              <Select
                placeholder="Select Lock Room"
                onChange={(selectedOptions) => {
                  setSelectedlockRoom(selectedOptions);
                }}
                value={selectedlockRoom}
                options={modifyOptions(lockRoom)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Extra Seat</label>
              <Select
                placeholder="Select Extra Seat"
                onChange={(selectedOptions) => {
                  setSelectedextraSeat(selectedOptions);
                }}
                value={selectedextraSeat}
                isMulti
                options={modifyOptions(extraSeat)}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 mt-2">
              <label>Special Id</label>
              <Select
                placeholder="Select Special Id"
                onChange={(selectedOptions) => {
                  setSelectedspecialId(selectedOptions);
                }}
                isMulti
                value={selectedspecialId}
                options={modifyOptions(specialId)}
              />
            </div>
            <div className="user-badges">
              <label htmlFor="user-badges">Admin</label>
              <Select
                value={selectedadmin}
                onChange={(e) => {
                  setSelectedadmin(e);
                }}
                placeholder="Select Id"
                options={admin}
                classNamePrefix="select2-selection"
                required
              />
            </div>
            <div className="user-badges">
              <label htmlFor="user-badges">Sub Admin</label>
              <Select
                value={selectedsubAdmin}
                onChange={(e) => {
                  setSelectedsubAdmin(e);
                }}
                placeholder="Select Sub Admin"
                options={subAdmin}
                classNamePrefix="select2-selection"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          <div className="flex flex-col gap-2 py-2 mt-4">
            <label htmlFor="">Entry Validity</label>
            <select>
              <option value="someOption">1 Day</option>
              <option value="otherOption">2 Day</option>
              <option value="otherOption">3 Day</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-2 mt-4">
            <label htmlFor="">Room Validity</label>
            <select>
              <option value="someOption">1 Day</option>
              <option value="otherOption">2 Day</option>
              <option value="otherOption">3 Day</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-2 mt-4">
            <label htmlFor="">Frame Validity</label>
            <select>
              <option value="someOption">1 Day</option>
              <option value="otherOption">2 Day</option>
              <option value="otherOption">3 Day</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-2 mt-4">
            <label htmlFor="">Chat Profile Validity</label>
            <select>
              <option value="someOption">1 Day</option>
              <option value="otherOption">2 Day</option>
              <option value="otherOption">3 Day</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-2 mt-4">
            <label htmlFor="">Vip Validity</label>
            <select>
              <option value="someOption">1 Day</option>
              <option value="otherOption">2 Day</option>
              <option value="otherOption">3 Day</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-2 mt-4">
            <label htmlFor="">Svip Validity</label>
            <select>
              <option value="someOption">1 Day</option>
              <option value="otherOption">2 Day</option>
              <option value="otherOption">3 Day</option>
            </select>
          </div>
        </div>
      </div>
      <Alerts
        variant='success'
        open={openAlertsSuccess}
        setOpen={setOpenAlertsSuccess}  
        title='Edit'
        desc='Data is Edited Successfully!'
      />
    </>
  );
};

export default Page;
