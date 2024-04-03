"use client";
import { Button, Title, Badge } from "@/Components/atomics";
import { PencilSimpleIcon } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonLoader from "@/Components/Loaders/buttonLoader";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";
import withAuth from "@/Components/withAuth";
import { ArrowBack } from "@mui/icons-material";

const  Page=({ params }: { params: { id: string } })=> {
  const [data, setData] = useState<any>(null);
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
        "https://fun2fun.live/admin/user/banUserId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: params?.id,
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

  const handleRemoveDP = () => {
    // Define the functionality for removing display picture
  };

  const router=useRouter();

  useEffect(() => {
    fetchData();
  }, []);


  
  return (
    <div>
      <section className="rounded-lg-10 bg-white mt-24 p-6">
       <div className="md:hidden" onClick={()=>router.back()}>
       <ArrowBack className="h-8 text-netral-25 w-8"/>
       </div>
        <nav className="mb-8 mt-[28px] md:mt-0 flex items-center justify-between">
          <Title className="" size="lg" variant="default">
            Personal Details
          </Title>

         <div className="flex gap-2 items-center">
         <Button
            size="md"
            variant="primary-bg"
            className="py-[13px] px-6"
            onClick={()=>router.push(`/users/view-users/edit-user/${params?.id}`)}
          >
            Edit
          </Button>
          <Button
                  size="sm"
                  variant="default-bg"
                  className="hidden md:inline-flex bg-netral-25 py-[13px] px-6 text-[20px]"
                  onClick={()=>router.back()}
                >
               Back
                </Button>
         </div>
        </nav>

        <section className="flex flex-col gap-2 lg:flex-row items-center lg:gap-5">
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

          <div className="space-y-1 lg:space-y-7">
            <h3 className="text-heading-sm font-semibold text-center xl:text-left text-blue-600">{data?.name}</h3>

            <section className="flex  flex-col gap-2 xl:flex-row items-start xl:gap-40">
              <div className="w-72 space-y-1 lg:space-y-1.5">
                <div className="flex gap-4"></div>
                <h1 className=" text-netral-50 mt-16">Bio</h1>
                <p className="text-[12px] mt-4 md:mt-0">{data?.bio}</p>
               
              </div>

              <div className="w-72 space-y-1  lg:space-y-1.5">
                <h5 className="text-body-sm uppercase text-netral-50">
                  Phone Number
                </h5>
                {!data?.mobile ? (
                  <p>No Number</p>
                ) : (
                  <p className="text-body-base font-medium">{data?.mobile}</p>
                )}
              </div>
              <div className="flex flex-col">
              <h5 className="text-body-sm uppercase text-nowrap text-netral-50">
                  Email Address
                </h5>
                {!data?.email ? (
                  <p>No Email</p>
                ) : (
                  <p className="text-body-base font-medium">{data?.email}</p>
                )}
                </div>
            </section>
          </div>
        </section>
        <div className="mt-8">
        <div className="border-t border-gray-300"></div>

        </div>
        <section className="rounded-lg-10 bg-white p-0  lg:p-6 mt-6 ">
        <div className="w-full flex flex-col  lg:flex-row gap-2">
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <p className="text-sm lg:text-md">Device Type</p>
              <p className="text-sm lg:text-md">Device ID</p>
              <p className="text-sm lg:text-md">Is Email Verified</p>
              <p className="text-sm lg:text-md">User Type</p>
              <p className="text-sm lg:text-md">Login OTP</p>
              <p className="text-sm lg:text-md">User(Ban/Unban)</p>
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-sm lg:text-md">{data?.device_type?.length > 0 ? data?.device_type : "NO"}</p>
              <p className="text-sm lg:text-md">{data?.device_id?.length > 0 ? data?.device_id : "NO"}</p>
              <p className="text-sm lg:text-md">{data?.status?.length > 0 ? data?.status : "NA"}</p>
              <p className="text-sm lg:text-md">{data?.user_type?.length > 0 ? data?.user_type : "NO"}</p>
              <p className="text-sm lg:text-md">{data?.loginOtp}</p>
              <Switch
                checked={data?.is_active_live}
                onChange={handleBanLive}
                className={`${data?.is_active_live  ? "bg-[#9ACD31]" : "bg-gray-400"}
          relative inline-flex  w-[50px]  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span
                  aria-hidden="true"
                  className={`${data?.is_active_live  ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <p className="text-sm lg:text-md"> Followers</p>
              <p className="text-sm lg:text-md">Following</p>
              <p className="text-sm lg:text-md"> likes</p>
              <p className="text-sm lg:text-md"> comment</p>
              <p className="text-sm lg:text-md"> views</p>
              <p className="text-sm lg:text-md"> Block User</p>
              {/* <p className="   mt-2">Device</p> */}
             
            </div>
            <div className="flex flex-col gap-8">
         <p className="text-sm lg:text-md">{data?.followers?.length   }</p>
         <p className="text-sm lg:text-md">{data?.following?.length   }</p>
              <p className="text-sm lg:text-md">{ data?.likes}</p>
              <p className="text-sm lg:text-md">{data?.comments}</p>
              <p className="text-sm lg:text-md">{data?.views}</p>
              <p className="text-sm lg:text-md">{data?.block_users}</p>
  
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <p className="text-sm lg:text-md"> Account</p>
             
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-sm lg:text-md">{data?.accounts}</p> 
            </div>
          </div>
        </div>
        </section>
      </section>
    </div>
  );
}


export default withAuth(Page);