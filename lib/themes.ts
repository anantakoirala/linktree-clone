import { Theme } from "@/types/Theme";

export const themes: Theme[] = [
  {
    id: 1,
    color: "bg-white",
    text: "text-black",
    name: "Air White",
    linkStyle: "rounded-md",
    boxColor: "bg-red-200",
    shopBox: "rounded-md",
    hover: "",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 2,
    color: "bg-[#000957]", // Deep Blue
    text: "text-white", // White text for contrast
    shopBox: "rounded-md",
    name: "Blue Horizon",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#344CB7]", // Lighter Blue
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#FFEB00]", // Yellow for embossed effect
  },
  {
    id: 3,
    color: "bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500",
    text: "text-black",
    name: "Purple Pie",
    shopBox: "rounded-3xl",
    linkStyle: "rounded-full",
    boxColor: "bg-orange-300",
    hover: "hover:scale-105 ease-in-out",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 4,
    color: "bg-gradient-to-t from-[#16C47F] via-[#FFD65A] to-[#FF9D23]",
    text: "text-black", // White text for contrast
    name: "Tropical Vibes",
    shopBox: "rounded-xl",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#FFD65A]", // Soft Yellow
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#FF9D23]", // Orange for embossed effect
  },
  {
    id: 5,
    color: "bg-gradient-to-t from-orange-500 via-green-500 to-red-500",
    text: "text-white",
    name: "Traffic Lights",
    linkStyle: "rounded-3xl",
    shopBox: "rounded-3xl",
    boxColor: "bg-pink-500",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 6,
    color: "bg-gradient-to-b from-blue-800 via-blue-500 to-green-500",
    text: "text-slate-900",
    name: "Blue Sky",
    linkStyle: "rounded-md",
    shopBox: "rounded-md",
    boxColor: "bg-lime-200",
    hover: "",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 7,
    color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
    text: "text-white",
    name: "Soft Horizon",
    linkStyle: "rounded-xl",
    shopBox: "rounded-3xl",
    boxColor: "bg-purple-300",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 8,
    color: "bg-gradient-to-t from-gray-800 to-emerald-500",
    text: "text-white",
    name: "Tinted Lake",
    linkStyle: "rounded-full bg-transparent border ",
    shopBox: "rounded-3xl border",
    boxColor: "",
    hover: "hover:bg-white hover:text-emerald-800",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 9,
    color: "bg-gradient-to-t from-pink-600 via-pink-500 to-pink-300",
    text: "text-white",
    name: "Cotton Candy",
    linkStyle: "rounded-lg",
    shopBox: "rounded-lg",
    boxColor: "bg-indigo-400",
    hover: "",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 10,
    color: "bg-[#f8d210]",
    text: "text-black", // White text for contrast
    name: "Tropical Burst",
    linkStyle: "rounded-md", // Rounded link style
    shopBox: "rounded-md",
    boxColor: "bg-[#f51720]", // Red for the box
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#fa26a0]", // Pink for embossed effect
  },
  {
    id: 11,
    color: "bg-gradient-radial from-[#3d550c] via-[#81b622] to-[#ecf87f]", // Circular gradient from deep green to lime yellow
    text: "text-black", // Black text for contrast
    name: "Lush Green",
    linkStyle: "rounded-lg", // Rounded link style
    shopBox: "rounded-md",
    boxColor: "bg-[#59981a]", // Dark green for the box
    hover: "hover:top-1 hover:left-1",
    embosedBox: true,
    embosedBoxColor: "bg-[#81b622]", // Lime green for embossed effect
  },
  {
    id: 12,
    color: "bg-gradient-to-t from-[#fd7f20] via-[#fc2e20] to-[#fdb750]", // Linear gradient from orange to red, to yellow
    text: "text-white", // White text for contrast
    name: "Fiery Blaze",
    linkStyle: "rounded-full", // Rounded link style
    shopBox: "rounded-md",
    boxColor: "bg-[#010100]", // Dark background for the box
    hover: "",
    embosedBox: true,

    embosedBoxColor: "bg-[#fdb750]", // Red for the embossed effect
  },
];
