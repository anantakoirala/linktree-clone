import React from "react";

type Props = {};
const colors = [
  { id: 1, color: "bg-white", text: "text-black", name: "Air White" },
  { id: 2, color: "bg-gray-800", text: "text-white", name: "Lake Black" },
  {
    id: 3,
    color: "bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500",
    text: "text-white",
    name: "Purple Pie",
  },
  {
    id: 4,
    color: "bg-gradient-to-t from-gray-500 via-blue-500 to-green-500",
    text: "text-white",
    name: "Green Grass",
  },
  {
    id: 5,
    color: "bg-gradient-to-t from-orange-500 via-green-500 to-red-500",
    text: "text-white",
    name: "Traffic Lights",
  },
  {
    id: 6,
    color: "bg-gradient-to-b from-blue-800 via-blue-500 to-green-500",
    text: "text-white",
    name: "Blue Sky",
  },
  {
    id: 7,
    color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
    text: "text-white",
    name: "Soft Horizon",
  },
  {
    id: 8,
    color: "bg-gradient-to-t from-gray-800 to-emerald-500",
    text: "text-white",
    name: "Tinted Lake",
  },
];

const Page = (props: Props) => {
  return (
    <div className="flex ">
      <div className="flex flex-col w-full">
        <div className="">
          <div className="font-semibold pb-4  text-xl ">Profile</div>
          <div className="w-full bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4">
              <img
                src="https://picsum.photos/id/8/300/320"
                className="rounded-full w-[90px]"
                alt=""
              />
              <div className="w-full">
                <button className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2">
                  Pick image
                </button>
              </div>
            </div>
            <div className="mt-4">
              <input
                placeholder="Profile Title"
                type="text"
                className="w-full bg-[#EFF0EB] text-gray-800 border-2 text-sm rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <textarea
              name=""
              id=""
              placeholder="bio"
              className="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
            ></textarea>
            <div className="flex items-center justify-end text-[#676B5F] text-[13px]">
              biolength/80
            </div>
          </div>
        </div>
        {/* theme selection */}
        <div className="">
          <div className="font-semibold pb-4 mt-20 md:mt-8 text-xl">Themes</div>
          <div className="w-full bg-white rounded-3xl p-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {colors.map((color: any) => (
                <div className="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer transition-all duration-150 ease-in p-2">
                  <div className="relative rounded-xl h-full mx-auto">
                    <div
                      className={`absolute left-0 top-0 h-full w-full z-0 ${color.color}`}
                    >
                      <div className="relative z-10 pt-9">
                        <div className="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70"></div>
                      </div>
                      <div className="w-[calc(100%-20px)] bg-[#EFF0EA] h-6 rounded-full mx-auto mt-1"></div>
                      <div className="w-[calc(100%-20px)] bg-[#EFF0EA] h-6 rounded-full mx-auto mt-1"></div>
                      <div className="w-[calc(100%-20px)] bg-[#EFF0EA] h-6 rounded-full mx-auto mt-1"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
