import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import useAxiosSecure from '../../hooks/useAxiosSecure'

export const Users = () => {
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data
    }
  })

  const handleUpdateRole = async (userId, newRole) => {
    const userRole = {
      role: newRole
    };
    const res = await axiosSecure.patch(`/users/${userId}`, userRole);
    if (res.data.modifiedCount > 0) {
      refetch()
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        {
          users.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>
                        <div className="dropdown">
                          <div tabIndex={0} role="button" className="btn m-1">{user.role}</div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                              <button onClick={() => handleUpdateRole(user._id, "admin")}>Admin</button>
                            </li>
                            <li>
                              <button onClick={() => handleUpdateRole(user._id, "user")}>User</button>
                            </li>
                          </ul>
                        </div>
                        {/* user.role */}
                      </td>
                      <td>{user._id}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : <p>user not found</p>
        }
      </div>
    </div>
  )
}
