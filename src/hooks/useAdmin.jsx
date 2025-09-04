
// import useAuth from './useAuth'
// import useAxiosSecure from './useAxiosSecure'
// import { useQuery } from '@tanstack/react-query'

// const useAdmin = () => {
//   const axiosSecure = useAxiosSecure()
//   const { user, loading } = useAuth()
//   const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: [user?.email, 'isAdmin'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/admin/${user?.email}`)
//       console.log(res);

//       return res.data?.admin
//     }
//   })
//   return [isAdmin, isAdminLoading]
// }

// export default useAdmin

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
