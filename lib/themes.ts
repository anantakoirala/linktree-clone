import { Theme } from "@/types/Theme";

// Add path of themes file to tailwind.config.ts like as below

// content: [
//   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//   "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   "./lib/**/*.{js,ts,jsx,tsx,mdx}",
// ],

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
    tabColor: "bg-gray-200",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-gray-100", textColor: "text-black" }, // Soft white - black text for readability
      { background: "bg-gray-200", textColor: "text-black" }, // Light gray - black text for contrast
      { background: "bg-red-200", textColor: "text-black" }, // Subtle red tint - black text for visibility
      { background: "bg-yellow-100", textColor: "text-black" }, // Pale yellow - black text for readability
      { background: "bg-slate-300", textColor: "text-black" }, // Neutral gray - black text for clarity
    ],
  },
  {
    id: 2,
    color: "bg-[#000957]",
    text: "text-white",
    name: "Blue Horizon",
    linkStyle: "rounded-md",
    shopBox: "rounded-md",
    boxColor: "bg-[#344CB7]",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#FFEB00]",
    tabColor: "bg-blue-600",
    selectedShareLinkBackgroundIndex: 0,
    fill: "#FFEB00",
    shareLink_background: [
      { background: "bg-[#000957]", textColor: "text-black" }, // Deep blue - white text for contrast
      { background: "bg-[#344CB7]", textColor: "text-white" }, // Light blue - white text for readability
      { background: "bg-[#FFEB00]", textColor: "text-black" }, // Yellow - black text for readability
      { background: "bg-blue-500", textColor: "text-white" }, // Medium blue - white text for contrast
      { background: "bg-[#87CEEB]", textColor: "text-black" }, // Sky blue - black text for better readability
    ],
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
    tabColor: "bg-purple-400",
    selectedShareLinkBackgroundIndex: 0,
    fill: "#FDBA74",
    shareLink_background: [
      { background: "bg-indigo-500", textColor: "text-white" }, // Deep indigo - white text for contrast
      { background: "bg-purple-500", textColor: "text-white" }, // Vibrant purple - white text for readability
      { background: "bg-pink-500", textColor: "text-white" }, // Warm pink - white text for contrast
      { background: "bg-orange-300", textColor: "text-black" }, // Soft orange - black text for readability
      { background: "bg-yellow-400", textColor: "text-black" }, // Sunny yellow - black text for visibility
    ],
  },
  {
    id: 4,
    color: "bg-gradient-to-t from-[#16C47F] via-[#FFD65A] to-[#FF9D23]",
    text: "text-black",
    name: "Tropical Vibes",
    shopBox: "rounded-xl",
    linkStyle: "rounded-md",
    boxColor: "bg-[#FFD65A]",
    hover: "hover:top-1 hover:left-1",
    embosedBox: true,
    embosedBoxColor: "bg-[#FF9D23]",
    tabColor: "bg-[#FFD65A]",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-[#16C47F]", textColor: "text-white" }, // Fresh green - white text for contrast
      { background: "bg-[#FFD65A]", textColor: "text-black" }, // Bright yellow - black text for visibility
      { background: "bg-[#FF9D23]", textColor: "text-white" }, // Orange - white text for readability
      { background: "bg-lime-500", textColor: "text-black" }, // Lime green - black text for contrast
      { background: "bg-amber-400", textColor: "text-black" }, // Warm amber - black text for readability
    ],
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
    tabColor: "bg-red-500",
    fill: "#EC4899",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-orange-500", textColor: "text-black" }, // Bright orange - black text for contrast
      { background: "bg-green-500", textColor: "text-white" }, // Vibrant green - white text for contrast
      { background: "bg-red-500", textColor: "text-white" }, // Bold red - white text for readability
      { background: "bg-yellow-400", textColor: "text-black" }, // Warm yellow - black text for visibility
      { background: "bg-pink-500", textColor: "text-black" }, // Soft pink - black text for readability
    ],
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
    tabColor: "bg-blue-600",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-blue-800", textColor: "text-white" }, // Deep blue - white text for contrast
      { background: "bg-blue-500", textColor: "text-white" }, // Medium blue - white text for readability
      { background: "bg-green-500", textColor: "text-white" }, // Green - white text for contrast
      { background: "bg-lime-200", textColor: "text-black" }, // Soft lime - black text for readability
      { background: "bg-sky-300", textColor: "text-black" }, // Sky blue - black text for contrast
    ],
  },
  {
    id: 7,
    color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
    text: "text-white",
    name: "Soft Horizon",
    linkStyle: "rounded-full",
    shopBox: "rounded-3xl",
    boxColor: "bg-purple-300",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-yellow-800",
    tabColor: "bg-lime-400",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-lime-500", textColor: "text-white" }, // Lime green - white text for contrast
      { background: "bg-indigo-700", textColor: "text-white" }, // Indigo - white text for readability
      { background: "bg-amber-500", textColor: "text-black" }, // Amber - black text for contrast
      { background: "bg-purple-300", textColor: "text-black" }, // Lavender - black text for readability
      { background: "bg-yellow-400", textColor: "text-black" }, // Warm yellow - black text for visibility
    ],
  },
  {
    id: 8,
    color: "bg-gradient-to-t from-gray-800 to-emerald-500",
    text: "text-white",
    name: "Tinted Lake",
    linkStyle: "rounded-full bg-transparent border",
    shopBox: "rounded-3xl border",
    boxColor: "",
    hover: "hover:bg-white hover:text-emerald-800",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
    tabColor: "bg-emerald-400",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-gray-800", textColor: "text-white" }, // Dark gray - white text for contrast
      { background: "bg-emerald-500", textColor: "text-white" }, // Vibrant emerald - white text for readability
      { background: "bg-teal-400", textColor: "text-black" }, // Soft teal - black text for contrast
      { background: "bg-slate-700", textColor: "text-white" }, // Neutral slate - white text for readability
      { background: "bg-white", textColor: "text-black" }, // Contrast white - black text for visibility
    ],
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
    tabColor: "bg-pink-400",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-pink-300", textColor: "text-black" }, // Soft pink - black text for contrast
      { background: "bg-pink-400", textColor: "text-black" }, // Muted pastel pink - black text for readability
      { background: "bg-indigo-400", textColor: "text-white" }, // Light indigo - white text for contrast
      { background: "bg-purple-300", textColor: "text-black" }, // Lavender - black text to keep it readable
      { background: "bg-yellow-300", textColor: "text-black" }, // Light pastel yellow - black text for visibility
    ],
  },
  {
    id: 10,
    color: "bg-[#f8d210]",
    text: "text-black",
    name: "Tropical Burst",
    linkStyle: "rounded-md",
    shopBox: "rounded-md",
    boxColor: "bg-[#f51720]",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#fa26a0]",
    tabColor: "bg-yellow-400",
    fill: "#f51720",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-[#f8d210]", textColor: "text-black" }, // Tropical yellow - black text for contrast
      { background: "bg-[#f51720]", textColor: "text-white" }, // Fiery red - white text for readability
      { background: "bg-[#fa26a0]", textColor: "text-white" }, // Bright pink - white text for contrast
      { background: "bg-[#ff7f50]", textColor: "text-black" }, // Coral orange - black text for visibility
      { background: "bg-[#fdc830]", textColor: "text-black" }, // Golden yellow - black text for readability
    ],
  },
  {
    id: 11,
    color: "bg-gradient-radial from-[#3d550c] via-[#81b622] to-[#ecf87f]",
    text: "text-black", // Default black text
    name: "Lush Green",
    linkStyle: "rounded-lg",
    shopBox: "rounded-md",
    boxColor: "bg-[#59981a]",
    hover: "hover:top-1 hover:left-1",
    embosedBox: true,
    embosedBoxColor: "bg-[#81b622]",
    tabColor: "bg-lime-500",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-[#3d550c]", textColor: "text-white" }, // Dark forest green - white text for visibility
      { background: "bg-[#81b622]", textColor: "text-black" }, // Vibrant lime green - black text for contrast
      { background: "bg-[#59981a]", textColor: "text-white" }, // Earthy olive green - white text for readability
      { background: "bg-[#a4d64f]", textColor: "text-black" }, // Fresh spring green - black text for contrast
      { background: "bg-[#ecf87f]", textColor: "text-black" }, // Soft lemon-lime - black text for visibility
    ],
  },
  {
    id: 12,
    color: "bg-gradient-to-t from-[#fd7f20] via-[#fc2e20] to-[#fdb750]",
    text: "text-white", // Default white text
    name: "Fiery Blaze",
    linkStyle: "rounded-full",
    shopBox: "rounded-md",
    boxColor: "bg-[#010100]",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#fdb750]",
    tabColor: "bg-orange-500",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-[#fd7f20]", textColor: "text-black" }, // Fiery orange - black text for contrast
      { background: "bg-[#fc2e20]", textColor: "text-white" }, // Bold red - white text for good visibility
      { background: "bg-[#fdb750]", textColor: "text-black" }, // Vibrant gold - black text for contrast
      { background: "bg-[#f8931d]", textColor: "text-black" }, // Warm amber - black text for better readability
      { background: "bg-[#fa541c]", textColor: "text-white" }, // Rich tangerine - white text for contrast
    ],
  },
];
