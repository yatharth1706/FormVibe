import React from "react";

function FormActionCard({ title, description, onClick, isCreatingForm }) {
  return (
    <div
      className="flex flex-col justify-center items-center p-12 border border-gray-200 rounded-lg md:w-[390px] md:h-[260px] gap-4 shadow cursor-pointer hover:shadow-2xl bg-white"
      onClick={onClick}
    >
      <div className="text-center flex flex-col gap-1">
        <h1 className="p-1 font-bold text-gray-700">{title}</h1>
        <img src="/assets/UnderLine.png" alt="Catchy Underline" />
      </div>
      <p className="text-center">{description}</p>
    </div>
  );
}

export default FormActionCard;
