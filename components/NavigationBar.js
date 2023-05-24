import React from "react";

function NavigationBar() {
  return (
    <div className="flex justify-between w-full h-16 px-10 py-4 border-b border-zinc-300">
      <div className="flex gap-4 items-center">
        <img src="/assets/Icon.png" width={32} alt="App Logo" />
        <span>FormVibe</span>
      </div>
      <div>
        <div className="text-xs flex justify-center items-center rounded-full p-2 border border-zinc-300 w-9 h-9">
          YV
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
