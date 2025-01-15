"use client";
import axios from "axios";
import React, { ChangeEventHandler, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [file, setFile] = useState<any>(null);

  const saveFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("file", e.target.files?.[0]);
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:7000/api/v1/profile/add", formData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <input type="file" onChange={saveFile} />
      <button
        className="mt-10 border w-20 h-8 bg-green-200 text-black"
        onClick={handleUpload}
      >
        submit
      </button>
    </div>
  );
};

export default Page;
