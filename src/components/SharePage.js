"use client";
import { Copy, Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function SharePage({ params }) {
  const formLinkRef = useRef(null);

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(
      "Created form using FormVibe. \n\nHere&apos;s the link. Do checkout and fill the form.\n\n" +
        process.env.NEXT_PUBLIC_APP_URL +
        "" +
        params?.id
    );
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    if (typeof window !== undefined) {
      window.open(url, "_blank");
    }
  };

  const handleFacebookShare = () => {
    const postText = encodeURIComponent(
      "Created form using FormVibe. \n\nHere&apos;s the link. Do checkout and fill the form.\n\n" +
        process.env.NEXT_PUBLIC_APP_URL +
        "" +
        params?.id
    );
    if (typeof window !== undefined) {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${postText}`;
      window.open(url, "_blank");
    }
  };

  const handleLinkedInShare = () => {
    const postText = encodeURIComponent(
      "Created form using FormVibe. \n\nHere&apos;s the link. Do checkout and fill the form.\n\n" +
        process.env.NEXT_PUBLIC_APP_URL +
        "" +
        params?.id
    );
    if (typeof window !== undefined) {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&summary=${postText}`;
      window.open(url, "_blank");
    }
  };

  const copyFormLink = async () => {
    if (typeof window !== undefined) {
      await window.navigator.clipboard.writeText(formLinkRef.current.value);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-11/12 mx-auto p-8">
      <div className="flex flex-col gap-4">
        {" "}
        <h2 className="font-semibold">Link</h2>
        <div className="p-3 flex items-center bg-gray-100">
          <input
            type="text"
            value={process.env.NEXT_PUBLIC_APP_URL + "" + params?.id}
            className="w-full rounded outline-none"
            disabled
            ref={formLinkRef}
          />
          <Copy
            onClick={copyFormLink}
            className="cursor-pointer hover:scale-95"
          />
        </div>
        <div className="flex gap-4">
          <button className="btn-primary" onClick={copyFormLink}>
            Copy link
          </button>
          <Link
            href={process.env.NEXT_PUBLIC_APP_URL + "" + params?.id}
            target="_blank"
          >
            <button className="btn-secondary">Open form in new tab</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold">Share on your social platform</h2>
        <div className="flex gap-5">
          <Twitter
            className="text-gray-600 cursor-pointer"
            onClick={handleTwitterShare}
          />
          <Linkedin
            className="text-gray-600 cursor-pointer"
            onClick={handleLinkedInShare}
          />
          <Facebook
            className="text-gray-600 cursor-pointer"
            onClick={handleFacebookShare}
          />
        </div>
      </div>
    </div>
  );
}
