import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const secureAxios = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) {
        return false; // or handle accordingly
      }
      const res = await secureAxios.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
    enabled: !!user?.email && !loading, // Only run the query if user email is available and not loading
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
