
import api from "./kyInstance";
import { DashboardResponse } from "@/utils/dashboard/types";

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const response = await api.get("transactions/infos").json<DashboardResponse>();
  return response;
};