"use client";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from "react-select";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";

const Viewuser = ({ params }: { params: { id: string } }) => {
    // @ts-ignore
  const [data, setData] = useState(null);
    const router = useRouter();
    const _id = params.id;



  const [previousIsActive, setPreviousIsActive] = useState(false);
  const [liveBanData, setLiveBanData] = useState(false);








  const handleRemoveDP = async () => {
    try {
      const response = await fetch(
        `https://techc2.be/admin/user/removeDp/${_id}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedData = await response.json();
      setData(updatedData.data);
      console.log("DP Removed:", updatedData.data);
      toast.success("DP removed");

      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://techc2.be/user/getbyid/${_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setData(jsonData.data);
          console.log("Fetched Data:", jsonData.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error removing DP:", error);
      toast.error("Error while removing DP");
    }
  };


  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://techc2.be/user/getbyid/${_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log("Fetched Data:", jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Ban User
  const handleBanUser = async () => {
    try {
      const response = await fetch("https://techc2.be/admin/user/banUserId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          is_active_userId: !data?.is_active_userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setData(updatedData.data);
      console.log("User ban status updated:", updatedData.data);
      toast.success(`User ${data?.is_active_userId ? "banned" : "unbanned"}`);
    } catch (error) {
      console.error("Error toggling user ban:", error);
      toast.error("Error toggling user ban");
    }
  };

  //Ban Live
  const handleBanLive = async () => {
    try {
      const response = await fetch("https://techc2.be/admin/user/banUserLive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          is_active_live: !data?.is_active_live,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setData(updatedData.data);
      console.log("User Live ban status updated:", updatedData.data);
      toast.success(`User ${data?.is_active_live ? "Live Unbanned" : "Live Banned"}`);
    } catch (error) {
      console.error("Error toggling user Live ban:", error);
      toast.error("Error toggling user Live ban");
    }
  };



  useEffect(() => {
    fetchData();

  }, [])


  useEffect(() => {
    if (data) {
      setPreviousIsActive(data?.is_active_userId);
      setLiveBanData(data?.is_active_live)
    }
  }, [data]);


  console.log(data, "data");
  return (
    <>
      <h1 className="text-2xl">View User</h1>
      <div className="flex font-[12px] leading-16">
        {data ? (
          <div className="flex w-[50%]">
            <div className="w-[50%]">
              <div className="user-name">
                <p>User Name</p>
              </div>
              <div className="user-email">
                <p>Email</p>
              </div>
              <div className="user-number">
                <p>Mobile</p>
              </div>
              <div className="user-status1">
                <p>Status</p>
              </div>
              <div className="user-varify-email">
                <p>Is Email varified</p>
              </div>
              <div className="user-type">
                <p>User Type</p>
              </div>
              <div className="user-device-id">
                <p>Device ID</p>
              </div>
              <div className="user-device-type">
                <p>Device Type</p>
              </div>
              <div className="live-hotlist">
                <label htmlFor="live-hotlist">
                  Login Otp

                </label>
              </div>
              <div className="user-id-ban">
                <label htmlFor="user-ban">
                  User ID(Ban/Unban)
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={data ? data?.is_active_userId : false}
                      onChange={handleBanUser}
                    />
                    <span className="slider round"></span>
                  </label>
                </label>
              </div>

              <div className="live-hotlist">
                <label htmlFor="live-hotlist">
                  Live Hotlist
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </label>
              </div>
            </div>
            {data && (
              <div key={data?._id} className="user-values">
                <div className="user-name">
                  <p>{data?.name}</p>
                </div>
                <div className="user-email">
                  <p>{data?.name}</p>
                </div>
                <div className="user-number">
                  <p>{data?.mobile}</p>
                </div>
                <div className="user-status1">
                  <p>{data?.status}</p>
                </div>
                <div className="user-varify-email">
                  <p>{data?.status}</p>
                </div>
                <div className="user-type">
                  <p>{data?.user_type}</p>
                </div>
                <div className="user-device-id">
                  <p>{data?._id}</p>
                </div>
                <div className="user-device-type">
                  <p>{data?.device || "Android"}</p>
                </div>
                <div className="user-deviceid-ban"><b>{data?.loginOtp}</b></div>
              </div>
            )}
          </div>
        ) : (
          <h2><SyncLoader color="#f403fc" /></h2>
        )}
        {data ? (
          <div className="view-user2">
            <div className="user-keys">
              <div className="user-follower">
                <p>No of Followers</p>
              </div>
              <div className="user-following">
                <p>No of Following</p>
              </div>
              <div className="user-likes">
                <p>No of Likes</p>
              </div>
              <div className="user-comment">
                <p>No of Comment</p>
              </div>
              <div className="user-viewsno">
                <p>No of views</p>
              </div>
              <div className="user-blocklist">
                <p>No of Block User</p>
              </div>
              <div className="user-account">
                <p>No of Account</p>
              </div>
              <div className="user-live">
                <label htmlFor="user-live">
                  Live(Ban/Unban)
                  <label className="switch">
                    <input type="checkbox"
                      checked={data ? data?.is_active_live : false}
                      onChange={handleBanLive}
                    />
                    <span className="slider round"></span>
                  </label>
                </label>
              </div>
              <div className="user-deviceid-ban">
                <label htmlFor="user-deviceban">
                  Device ID(Ban/Unban)
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </label>
              </div>

              <div>
                {
                  data && data?.images[0] === "" ? <span>No Dp</span> : <button variant="danger" onClick={handleRemoveDP}>
                    Remove DP
                  </button>
                }
              </div>





            </div>
            {data && (
              <div key={data?._id} className="user-values">
                <div className="user-follower">
                  <p>{data?.followers || 0}</p>
                </div>
                <div className="user-following">
                  <p>{data?.following || 0}</p>
                </div>
                <div className="user-likes">
                  <p>{data?.likes}</p>
                </div>
                <div className="user-comment">
                  <p>{data?.comments}</p>
                </div>
                <div className="user-viewsno">
                  <p>{data?.views}</p>
                </div>
                <div className="user-blocklist">
                  <p>{data?.block_users}</p>
                </div>
                <div className="user-account">
                  <p>{data?.accounts}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default Viewuser;
