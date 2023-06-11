"use client";
import React, { useEffect, useState } from "react";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

function MyAccount() {
  const [userInfo, setUserInfo] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { retrieveUser, storeFile, getFilePreview, isLoading, updateUser } =
    useFormVibeContext();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
        setNewProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicPreview("");
      setNewProfilePic("");
      setProfilePic("");
    }
  };

  const handleSave = async () => {
    let id = "";
    if (newProfilePic) {
      const file = document.getElementById("profilePic").files[0];
      id = await storeFile(file);
      setProfilePicPreview("");
    }

    await updateUser(userInfo?.$id, {
      name,
      email,
      profile_pic: id ? id : userInfo?.profile_pic,
    });
    await fetchUser();
  };

  const fetchUser = async () => {
    let user =
      (typeof window !== undefined &&
        window.localStorage.getItem("FormVibeUser")) ??
      "{}";
    let userInfo = JSON.parse(user);

    const res = await retrieveUser(userInfo?.$id);
    console.log(res);
    let doc = res?.documents?.[0];
    setUserInfo(doc);
    setName(doc?.name);
    setEmail(doc?.email);
    if (doc?.profile_pic) {
      let url = await getFilePreview(doc?.profile_pic);
      setProfilePic(url);
      setProfilePicPreview(url);
    } else {
      setProfilePic("");
    }
  };

  return (
    <div className="flex flex-col p-6 md:p-12 gap-6 w-full">
      <h1>My Account</h1>

      <div className="w-full h-auto md:h-96 border border-zinc-200 rounded p-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="relative cursor-pointer hover:bg-slate-200 rounded-full h-44 w-44 border border-zinc-300 flex justify-center items-center">
            {profilePicPreview && (
              <img
                src={profilePicPreview}
                alt="Profile pic preview"
                className="w-full h-full rounded-full object-cover object-center"
              />
            )}

            <Pencil className="w-4 h-4" />
            <input
              type="file"
              id="profilePic"
              className="inset-0 absolute w-full h-full opacity-0"
              onChange={handleProfilePicChange}
            />
          </div>
          <div className="flex flex-col flex-grow gap-8">
            <div className="flex w-full flex-col gap-3">
              <label>Name</label>
              <input
                className="border border-zinc-200 rounded-md p-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label>Email</label>
              <input
                className="border border-zinc-200 rounded-md p-2"
                type="email"
                value={email}
                disabled
              />
            </div>
            <div className="flex w-full gap-4 ml-auto">
              {/* <button className=" w-44 btn-secondary bg-gray-800 text-white">
                Delete Account
              </button> */}
              <button
                className="w-44 btn-primary"
                type="button"
                onClick={handleSave}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
