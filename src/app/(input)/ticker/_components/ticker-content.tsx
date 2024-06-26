"use client";

import Intro from "@/app/(input)/ticker/_components/intro";
import { TickerDrawer } from "@/app/(input)/ticker/_components/ticker-drawer";
import { Dialog } from "@/components/common/dialog/dialog";
import Toast from "@/components/common/toast/toast";
import { Stock, useStocksStore } from "@/state/stores/stocks-store";
import React from "react";
import { toast } from "sonner";
import { DrawerOverlay, Drawer as DrawerPrimitive } from "@/components/ui/drawer";
import { Dialog as DialogPrimitive } from "@/components/ui/dialog";
import { useDrawerStore } from "@/state/stores/drawer-store";
import { useDialogStore } from "@/state/stores/dialog-store";
import TickerList from "./ticker-list";

export type DrawerType = "name" | "count" | "edit";

const MAX_TICKER_COUNT = 15;

const TickerContent = React.memo(() => {
  const { stocks, addStock, removeStock, editStock } = useStocksStore();
  const { isDrawerOpen, isDrawerOpenChange } = useDrawerStore();
  const { isDialogOpen, isDialogOpenChange } = useDialogStore();

  const [tickerName, setTickerName] = React.useState<string>("");
  const [tickerCount, setTickerCount] = React.useState<number>(0);
  const [drawerType, setDrawerType] = React.useState<DrawerType>("name");
  const [selectedStock, setSelectedStock] = React.useState<Stock>();

  const resetData = React.useCallback(() => {
    setTickerName("");
    setTickerCount(0);
    setDrawerType("name");
  }, []);

  const handleTickerClick = React.useCallback((data: Stock) => {
    setDrawerType("count");

    setTickerName(data.ticker ?? "");
    setSelectedStock(data);
  }, []);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const brandName = !!value ? value : "";
    setTickerName(brandName);
  };
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(e.target.value);
    const count = isNaN(targetValue) ? 0 : targetValue;
    setTickerCount(count);
  };

  const handleSubmitClick = React.useCallback(() => {
    if (stocks.length > MAX_TICKER_COUNT - 1) {
      return isDialogOpenChange(true);
    }

    if (selectedStock) {
      resetData();

      const existingStock = stocks.find((stock) => stock.stockId === selectedStock.stockId);

      if (existingStock !== undefined) {
        // 주식이 이미 존재하는 경우 업데이트
        editStock({ ...selectedStock, count: existingStock.count + tickerCount });
      } else {
        addStock({ ...selectedStock, count: tickerCount });
      }
      isDrawerOpenChange(false);
    }
  }, [addStock, editStock, isDialogOpenChange, isDrawerOpenChange, resetData, selectedStock, stocks, tickerCount]);

  const handleInputClear = React.useCallback((type: DrawerType) => {
    if (type === "name") {
      return setTickerName("");
    }

    return setTickerCount(0);
  }, []);

  const handleNameFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    e.target.focus({ preventScroll: true });
    setDrawerType("name");
  }, []);

  const handleSelectedTickerClick = React.useCallback(
    (data: Stock) => {
      if (data.ticker && data.count) {
        isDrawerOpenChange(true);
        setTickerName(data.ticker);
        setTickerCount(data.count);
        setDrawerType("edit");
        setSelectedStock(data);
      }
    },
    [isDrawerOpenChange]
  );

  const handleDeleteClick = React.useCallback(() => {
    const prevStock = selectedStock;
    const stockLength = stocks.length;
    if (selectedStock) {
      removeStock(selectedStock);
      resetData();
      toast.custom((t) => (
        <Toast
          t={t}
          title={`You deleted ${selectedStock.ticker}`}
          isRevertable
          handleUndo={() => {
            prevStock && addStock(prevStock);
          }}
          style={{
            marginBottom: stockLength === 1 ? "0" : "4.5rem",
          }}
        />
      ));
      return isDrawerOpenChange(false);
    }
  }, [addStock, isDrawerOpenChange, removeStock, resetData, selectedStock, stocks.length]);

  const handleConfirmClick = React.useCallback(() => {
    if (selectedStock) {
      editStock({ ...selectedStock, count: tickerCount });
      resetData();
      isDrawerOpenChange(false);
    }
  }, [editStock, isDrawerOpenChange, resetData, selectedStock, tickerCount]);

  const handleOverlayClick = React.useCallback(() => {
    isDrawerOpenChange(false);

    if (drawerType === "edit") {
      resetData();
    }
  }, [drawerType, isDrawerOpenChange, resetData]);

  React.useEffect(() => {
    // 컴포넌트가 마운트될 때 body 스타일 변경
    document.body.style.setProperty("margin", "auto", "important");
    document.body.style.setProperty("padding", "0");

    // 컴포넌트가 언마운트될 때 body 스타일 복원
    return () => {
      document.body.style.removeProperty("margin");
      document.body.style.removeProperty("padding");
    };
  }, []);

  return (
    <DrawerPrimitive
      open={isDrawerOpen}
      onClose={() => {
        isDrawerOpenChange(false);
      }}
    >
      <div className="flex h-full w-full flex-col pt-2.5">
        <Intro />
        <TickerList data={stocks} hasShares onClick={handleSelectedTickerClick} />
      </div>
      <DrawerOverlay onClick={handleOverlayClick} />
      <TickerDrawer
        drawerType={drawerType}
        tickerCount={tickerCount}
        tickerName={tickerName}
        handleTickerClick={handleTickerClick}
        handleKeywordChange={handleKeywordChange}
        handleCountChange={handleCountChange}
        handleSubmitClick={handleSubmitClick}
        handleInputClear={handleInputClear}
        handleNameFocus={handleNameFocus}
        handleDeleteClick={handleDeleteClick}
        handleConfirmClick={handleConfirmClick}
      />

      <DialogPrimitive open={isDialogOpen}>
        <Dialog title={`You can add up to ${MAX_TICKER_COUNT} stocks.`} />
      </DialogPrimitive>
    </DrawerPrimitive>
  );
});

export default TickerContent;
