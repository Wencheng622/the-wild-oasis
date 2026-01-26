import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogingIn, mutate: loginAccount } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { loginAccount, isLogingIn };
}
