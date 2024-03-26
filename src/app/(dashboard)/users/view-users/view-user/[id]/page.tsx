"use client";
import { Button, Title, Badge } from "@/Components/atomics";
import { PencilSimpleIcon } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonLoader from "@/Components/Loaders/buttonLoader";
import { SyncLoader } from "react-spinners";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState(null);
  console.log("data comes like", data?.loginOtp);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://fun2fun.live/user/getbyid/${params?.id}`
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Network response was not ok");
      }
      setIsLoading(false);
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleBanUser = () => {
    // Define the functionality for banning/unbanning user
  };

  const handleBanLive = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/user/banUserLive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: params?.id,
            is_active_live: !data.is_active_live,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setData(updatedData.data);
    } catch (error) {
      console.error("Error toggling user Live ban:", error);
    }
  };
  const handleUserIdActive = async () => {
    try {
      const response = await fetch(
        "https://fun2fun.live/admin/user/user/banUserId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: params?.id,
            is_active_live: !data.is_active_userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setData(updatedData.data);
    } catch (error) {
      console.error("Error toggling user Live ban:", error);
    }
  };

  const handleRemoveDP = () => {
    // Define the functionality for removing display picture
  };

  const router=useRouter();

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <section className="relative rounded-lg-10 bg-white p-6">
        <nav className="mb-8 flex items-center justify-between">
          <Title size="lg" variant="default">
            Personal Details
          </Title>

          <Button
            size="md"
            variant="primary-bg"
          onClick={()=>router.push(`/users/view-users/edit-user/${params?.id}`)}
          >
            <PencilSimpleIcon className="h-4 w-4 stroke-[4px]" />
            Edit
          </Button>
        </nav>

        <section className="flex flex-row items-center gap-5">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <ButtonLoader />
            </div>
          ) : (
            <div className="relative h-[8.25rem] w-[8.25rem] overflow-hidden rounded-full">
              {data?.images[0] ? (
                <Image
                  src={data?.images[0]}
                  className="h-full w-full object-cover"
                  alt="Avatar"
                  fill
                />
              ) : (
                <div className="h-full w-full bg-gray-200"></div>
              )}
            </div>
          )}

          <div className="space-y-7">
            <h3 className="text-heading-sm font-semibold">Samanta Legend</h3>

            <section className="flex flex-row items-start gap-2.5">
              <div className="w-72 space-y-1.5">
                <div className="flex gap-4"></div>
                <h1>Bio</h1>
                <p>{data?.bio}</p>
                <h5 className="text-body-sm uppercase text-netral-50">
                  Email Address
                </h5>
                {!data?.email ? (
                  <p>No Email</p>
                ) : (
                  <p className="text-body-base font-medium">{data?.email}</p>
                )}
              </div>

              <div className="w-72 space-y-1.5">
                <h5 className="text-body-sm uppercase text-netral-50">
                  Phone Number
                </h5>
                {!data?.mobile ? (
                  <p>No Number</p>
                ) : (
                  <p className="text-body-base font-medium">{data?.mobile}</p>
                )}
              </div>
            </section>
          </div>
        </section>
        <section className="rounded-lg-10 bg-white p-6 mt-6 ">
        <div className="w-full  flex gap-2">
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <p className="">Device Type</p>
              <p>Device ID</p>
              <p>Is Email Verified</p>
              <p>User Type</p>
              <p>Login OTP</p>
              <p className=" mt-2  ">User ID(Ban/Unban)</p>
              <p className=" mt-2  ">Live Hotlist</p>
              <p className=" mt-6  ">Live(Ban/Unban)</p>
              <p className=" mt-4 ">ID (Ban/Unban)</p>
            </div>
            <div className="flex flex-col gap-8 ">
              <p>{data?.device_type?.length > 0 ? data?.device_type : "NO"}</p>
              <p>{data?.device_id?.length > 0 ? data?.device_id : "NO"}</p>
              <p>{data?.status?.length > 0 ? data?.status : "NA"}</p>
              <p>{data?.user_type?.length > 0 ? data?.user_type : "NO"}</p>
              <p>{data?.loginOtp}</p>
              <Switch
                checked={data?.is_active_userId}
                onChange={handleUserIdActive}
                className={`${data?.is_active_userId  ? "bg-[#9ACD31]" : "bg-[#9ACD31]/[0.6]"}
          relative inline-flex  w-[74px]  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span
                  aria-hidden="true"
                  className={`${data?.is_active_live  ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <Switch
                checked={data ? data?.is_active_live : false}
                onChange={handleBanLive}
                className={`${data?.is_active_live ? "bg-[#9ACD31]" : "bg-[#9ACD31]/[0.6]"}
          relative inline-flex h-[38px] w-[74px]  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${data?.is_active_live  ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <Switch
                checked={data ? data?.is_active_live : false}
                onChange={handleBanLive}
                className={`${data?.is_active_live ? "bg-[#9ACD31]" : "bg-[#9ACD31]/[0.6]"}
          relative inline-flex h-[38px] w-[74px]  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${data?.is_active_live  ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <Switch
                checked={data ? data?.is_active_live : false}
                onChange={handleBanLive}
                className={`${data?.is_active_live ? "bg-[#9ACD31]" : "bg-[#9ACD31]/[0.6]"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${data?.is_active_live  ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <p className="">No of Followers</p>
              <p>Number of Following</p>
              <p>No of likes</p>
              <p>No of comment</p>
              <p>No of views</p>
              <p>No of Block User</p>
              <p>No of Account</p>
              <p className="   mt-2">Device</p>
             
            </div>
            <div className="flex flex-col gap-8">
         <p>{data?.followers?.[0]   }</p>
         <p>{data?.following?.[0]   }</p>
              <p>{ data?.likes}</p>
              <p>{data?.comments}</p>
              <p>{data?.views}</p>
              <p>{data?.block_users}</p>
              <p>{data?.accounts}</p>
              <Switch
                checked={data ? data?.is_active_live : false}
                onChange={handleBanLive}
                className={`${data?.is_active_live ? "bg-[#9ACD31]" : "bg-[#9ACD31]/[0.6]"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${data?.is_active_live  ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
  
            </div>
          </div>
        </div>
        </section>
      </section>
    </div>
  );
}
