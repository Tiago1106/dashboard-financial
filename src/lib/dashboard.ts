
import api from "./kyInstance";
import { DashboardResponse, TransactionOptions } from "@/utils/dashboard/types";

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const response = await api.get("transactions/infos").json<DashboardResponse>();
  return response;
};

export const fetchTransactionOptions = async (): Promise<TransactionOptions> => {
  const response = await api.get("transactions/options").json<TransactionOptions>();
  return response;
};