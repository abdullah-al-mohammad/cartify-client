import axios from 'axios'


const axiosPublic = axios.create({
  // baseURL: 'https://cartify-server-nw3grqu81-coffee-stores-projects.vercel.app'
  baseURL: 'http://localhost:5000'
})
const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic
