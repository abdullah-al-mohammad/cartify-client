import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import UserNotFound from '../Error/UserNotFound';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleUpdateRole = async (userId, role, userName) => {
    try {
      const userRole = {
        role: role,
      };

      const res = await axiosSecure.patch(`/users/${userId}`, userRole);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: 'Role Updated!',
          text: `${userName}'s  has been changed to ${role}.`,
          icon: 'success',
        });
        refetch();
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to update role. Please try again.';

      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });

    }
  };

  const itemsPerPage = 10;
  const indxOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indxOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indxOfLast);


  if (isLoading) {
    return <p>users is loading</p>
  }

  if (isError) {
    <UserNotFound />
  }

  if (!users) {
    return <p>users not found</p>
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex-col h-screen overflow-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-black">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>
                    <div className="dropdown border w-24 px-6">
                      <div
                        tabIndex={0}
                        className={`m-1 capitalize font-bold ${user.role === 'admin' ? 'text-green-500' : 'text-red-500'
                          }`}
                      >
                        {user.role}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 text-white rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li className="">
                          <button onClick={() => handleUpdateRole(user._id, 'admin', user.name)}>
                            Admin
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleUpdateRole(user._id, 'user', user.name)}>
                            User
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>{user._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={users.length}
        onPageChange={page => setCurrentPage(page)}
      ></Pagination>
    </div>
  );
};

export default Users
