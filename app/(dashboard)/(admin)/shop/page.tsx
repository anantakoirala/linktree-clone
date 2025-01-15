"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import AddProductModal from "@/components/AddProductModal";
import { useGetAllProductsQuery } from "@/redux/shop/shopApi";
import ProductList from "@/components/ProductList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/types/Product";

type Props = {};

const Page = (props: Props) => {
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { products } = useSelector((state: RootState) => state.shop);

  const { data, isError, isFetching, isLoading } = useGetAllProductsQuery({});
  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="">
          <TabsTrigger
            value="account"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#8228D9] data-[state=active]:text-[#8228D9]"
          >
            Edit
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#8228D9] data-[state=active]:text-[#8228D9]"
          >
            My Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full   mt-5">
          <div className="w-full flex flex-col">
            {/* add button */}

            <button
              className="w-full rounded-full h-12 bg-[#8228D9] hover:bg-[#6c21b3] text-white flex text-[15px] font-semibold items-center justify-center flex-row cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Plus size={17} className="mr-0.5 font-semibold" />{" "}
              <span> Add Link</span>
            </button>
            <div className="w-full flex flex-col gap-3 mt-5 ">
              {products.map((product: Product, index) => (
                <ProductList product={product} key={index} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password" className="w-full bg-yellow-200 mt-5">
          Change your password here.
        </TabsContent>
      </Tabs>
      {open && <AddProductModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default Page;
