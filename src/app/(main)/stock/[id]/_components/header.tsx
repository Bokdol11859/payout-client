import React from "react";
import Info from "@/components/icons/info";
import { StockDetailResponse } from "@/api/generated/endpoint.schemas";

interface HeaderProps {
  stock: StockDetailResponse;
}

export const Header = React.memo(({ stock }: HeaderProps) => {
  return (
    <div className="w-full p-5 pb-8">
      <div className="mb-2 flex w-full">
        <div className="flex">
          <h2 className="mr-1  text-body3 font-bold text-main-900">{stock.ticker}</h2>
          <p className="text-body3 text-grey-700">{stock.companyName}</p>
        </div>
      </div>
      <div className="mb-3 flex w-full items-center">
        <p className="mr-2 text-h0 text-grey-900">{`$${stock.price}`}</p>
        <Info className="text-grey-400" />
      </div>

      <div className="inline-block rounded bg-gray-100 px-2 py-1">{stock.industry}</div>
    </div>
  );
});
