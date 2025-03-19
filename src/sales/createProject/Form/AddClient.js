import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../Atom/InputField";
import Button from "../../../Atom/Button";
import SweetAlert from "../../../components/SweetAlert";
import { toggleAddClient } from "../../../../utils/slices/projectSlice";
import { PostClientList } from "../../../fetchApis/clientList/ClientList";
import { validateAddClient } from "../../../../utils/helperFunction/addClientValidation/addClientValidation";

const AddClient = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const [error, setError] = useState({});

  const initialClientData = {
    name: "",
    address: "",
    city: "",
    country: "",
    phone_number: "",
    contact_person: "",
    email: "",
    email_id_for_cc: "",
  };

  const [clientData, setClientData] = useState(initialClientData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: name === "phone_number" ? parseInt(value) : value,
    }));
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const errorMessage = validateAddClient(clientData);
    if (Object.keys(errorMessage).length > 0) {
      setError(errorMessage);
    } else {
      setError({});
      const response = await PostClientList(clientData);
      if (response?.status == true) {
        dispatch(toggleAddClient());
        SweetAlert({
          title: "Client Added Successfully!!",
          text: "",
          icon: "success",
        });
        setClientData(initialClientData);
      }
    }
  };

  const inputFields = [
    { name: "name", type: "text", placeholder: "Client Name", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    {
      name: "email_id_for_cc",
      type: "email",
      placeholder: "Contact Person Email",
      required: true,
    },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "city", type: "text", placeholder: "City", required: true },
    { name: "country", type: "text", placeholder: "Country", required: true },
    {
      name: "phone_number",
      type: "number",
      placeholder: "Phone Number",
      required: true,
    },
    {
      name: "contact_person",
      type: "text",
      placeholder: "Contact Person",
      required: true,
    },
  ];

  return (
    <div className={darkMode ? "bg-black text-white" : ""}>
      <h3 className="pt-4 pb-4 underline text-2xl">Add Client Details</h3>
      <div className="flex flex-wrap gap-4">
        {inputFields.map(({ name, type, placeholder, required }) => (
          <div key={name} className="w-[45%]">
            <Input
              type={type}
              name={name}
              className="p-2 w-full border rounded-md"
              placeholder={placeholder}
              value={clientData[name]}
              onChange={handleChange}
              required={required}
            />
            {error?.[name] && (
              <p className="text-red-500 text-sm mt-0 text-left">
                {error[name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <Button
        name="Add Client"
        className={`p-4 rounded mt-4 w-4/12 border ${
          darkMode ? "bg-black text-white" : "bg-yellow-200"
        }`}
        onClick={handleAddClient}
      />
    </div>
  );
};

export default AddClient;
