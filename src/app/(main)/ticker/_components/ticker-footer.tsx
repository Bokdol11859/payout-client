"use client";
import { Button } from "@/components/ui/button";
import { useStocksStore } from "@/state/stores/stocks-store";
import { useRouter } from "next/navigation";
import React from "react";

export default function TickerFooter() {
  const { stocks } = useStocksStore();
  const router = useRouter();

  const handleTickerSubmit = () => {
    router.push(`/report`);
  };

  if (stocks.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 flex w-full justify-center p-5 pt-12"
      style={{
        backgroundImage: "linear-gradient(0deg, var(--color-white) 52.78%, rgba(255, 255, 255, 0.00) 100%)",
        maxWidth: 768,
      }}
    >
      <Button
        variant={"default"}
        className="mx-5 h-14 w-full rounded-lg bg-main-700 p-4"
        style={{
          backgroundColor: "#4F6AFC",
          color: "#fff",
        }}
        onClick={handleTickerSubmit}
      >
        <p className="text-h5 text-white">Analyze My Portfolio</p>
      </Button>
    </div>
  );
}