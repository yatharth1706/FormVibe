import React from "react";

function FormActionCard({ title, description }) {
  return (
    <div className="flex flex-col justify-center items-center p-10 border border-gray-200 bg-white rounded-md w-[340px] h-[200px] gap-3 shadow">
      <div>
        <h1 className="p-1 font-bold text-gray-700 border-b-2 border-blue-400">
          {title}
        </h1>
      </div>
      <p className="text-center">{description}</p>
    </div>
  );
}

export default FormActionCard;
