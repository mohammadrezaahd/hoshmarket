import { authorizedGet } from "~/utils/authorizeReq";
import { apiUtils } from "./apiUtils.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  IDigikalaAuth,
  IDigikalaAuthInfo,
} from "~/types/interfaces/digikalaAuth.interface";
import type { IPostDijikalaAuthConnect } from "~/types/dtos/digikalaAuth.dto";

const digikalaRedirect = async () => {
  return apiUtils<{ url: string }>(async () => {
    const response = await authorizedGet(`/v1/digikala_auth/redirect`);
    return response.data;
  });
};

const digikalaConnect = async (data: IPostDijikalaAuthConnect) => {
  return apiUtils<IDigikalaAuth>(async () => {
    const response = await authorizedGet(
      `/v1/digikala_auth/connect?authorization_code=${data.authorization_code}&state=${data.state}`,
    );
    return response.data;
  });
};

const digikalaInfo = async () => {
  return apiUtils<{ seller_list: IDigikalaAuthInfo[] }>(async () => {
    const response = await authorizedGet(`/v1/digikala_auth/info`);
    return response.data;
  });
};

export const useDigikalaRedirect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: digikalaRedirect,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Digikala auth redirection"],
      });
    },
    onError: (error) => {
      console.error("❌ Error fetching Digikala auth redirection:", error);
    },
  });
};

export const useDigikalaConnect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: digikalaConnect,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Digikala auth connection"],
      });
    },
    onError: (error) => {
      console.error("❌ Error fetching Digikala auth connection:", error);
    },
  });
};

export const useDigikalaInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: digikalaInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Digikala auth info"],
      });
    },
    onError: (error) => {
      console.error("❌ Error fetching Digikala auth info:", error);
    },
  });
};
