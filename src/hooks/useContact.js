import { useMutation } from "@tanstack/react-query";
import { contactApi } from "@/api/contact";

export const useSendContact = () => useMutation({ mutationFn: (body) => contactApi.create(body) });