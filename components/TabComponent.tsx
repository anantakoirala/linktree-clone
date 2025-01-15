import React, { useEffect, useRef, useState } from "react";

type Props = {};
const tabs = [
  {
    id: 1,
    title: "one",
  },
  {
    id: 2,
    title: "tow",
  },
];

const TabComponent = (props: Props) => {
  const tabRef = useRef<HTMLDivElement | null>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);

  const updateWidth = () => {
    if (tabRef.current) {
      const parentWidth = tabRef.current.getBoundingClientRect().width;
      const numberOfTabs = tabs.length;
      const newTabWidth = parentWidth / numberOfTabs;
      setTabWidth(newTabWidth);
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateWidth);
    if (tabRef.current) {
      resizeObserver.observe(tabRef.current);
    }
    return () => {
      if (tabRef.current) {
        resizeObserver.unobserve(tabRef.current);
      }
    };
  }, [tabs.length]);
  return (
    <div
      className="w-full flex items-center justify-between relative rounded-full bg-yellow-500"
      ref={tabRef}
    >
      {tabs.map((tab: any, index) => (
        <button
          className="relative py-3 text-sm font-semibold"
          style={{ width: tabWidth }}
          key={index}
          onClick={() => setCurrentTab(tab.id)}
        >
          {tab.title}
        </button>
      ))}
      <div
        className="absolute inset-0 bg-white rounded-full mix-blend-exclusion transition-all duration-300"
        style={{
          width: tabWidth,
          translate: `${(currentTab - 1) * tabWidth}px 0px`,
        }}
      />
    </div>
  );
};

export default TabComponent;
