import { findSectorRatios } from "@/api/generated/endpoint";
import { SectorRatioResponse, TickerShare } from "@/api/generated/endpoint.schemas";
import { queryClient } from "@/app/global-provider";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const enteredStocksQueryKeys = createQueryKeys("use-stocks-sector-ratio");

export const useStocksSectorRatioMutation = (): UseMutationResult<SectorRatioResponse[], unknown, TickerShare[]> => {
  const requestClient = async (tickerShares: TickerShare[]): Promise<SectorRatioResponse[]> => {
    const response = await findSectorRatios({ tickerShares });
    return response.data;
  };

  return useMutation({
    mutationKey: [enteredStocksQueryKeys._def],
    mutationFn: requestClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [enteredStocksQueryKeys] });
    },
  });
};
