import React from "react";
import Header from "../../partials/Header";
import SideBar from "../../components/Sidebar/SideBar";
// import Sidebar from "../components/SideBar.js";
// import Header from "../../partials/Header.js";
import Form from "./Form.js";

const EntryForm = () => {
  return (
    <div className="">
      <div className="w-full sticky top-0 z-20">
        <Header />
      </div>
      <div className="flex bg-[#d9d9d9] ">
        <div className="sticky top-32 h-screen">
          <SideBar />
        </div>
        <div className="overflow-hidden">
          <div className="w-full border rounded-lg shadow-gray-500 bg-white mt-8 mb-16">
            <h2 className="text-3xl border-color-gray-500 border-b-2 p-2 pl-8">
              Add Project Details
            </h2>
            <div className="p-4">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
