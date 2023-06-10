"use client";

import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function NavigationBar() {
  const { logout, retrieveUser, getFilePreview } = useFormVibeContext();
  const [userInfo, setUserInfo] = useState({});
  const [userProfilePic, setUserProfilePic] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    if (typeof window !== undefined) {
      let userObj = JSON.parse(
        window.localStorage.getItem("FormVibeUser") ?? "{}"
      );

      if (Object.keys(userObj).length > 0) {
        let userId = userObj?.$id;
        const res = await retrieveUser(userId);
        console.log(res);
        let doc = res?.documents?.[0];
        setUserInfo(doc);
        if (doc?.profile_pic && !doc?.profile_pic.includes("http")) {
          let profile_pic = await getFilePreview(doc?.profile_pic);
          setUserProfilePic(profile_pic);
        }
      }
    }
  };

  return (
    <div className="flex justify-between w-full h-16 px-8 py-4 border-b border-zinc-300">
      <Link href="/">
        <div className="flex gap-4 items-center cursor-pointer">
          <img src="/assets/Icon.png" width={32} alt="App Logo" />
          <span>FormVibe</span>
        </div>
      </Link>
      <div>
        <div
          onClick={logout}
          className="text-xs cursor-pointer flex justify-center items-center rounded-full border border-zinc-300 w-9 h-9"
        >
          {userInfo?.profile_pic && !userInfo?.profile_pic.includes("http") ? (
            <img
              className="w-full h-full object-cover rounded-full"
              src={userProfilePic ?? ""}
              alt="Profile pic"
            />
          ) : (
            <div>
              <span>
                {userInfo?.name
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase())
                  .join("")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
