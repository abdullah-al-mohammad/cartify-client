import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"


const useUsersProfile = () => {
    const axiosPublic = useAxiosPublic()

    const { data: users = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get("/users")
            return res.data
        }
    })
    return [users, loading, refetch]
}

export default useUsersProfile
