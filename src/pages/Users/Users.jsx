import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export const Users = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleUpdateRole = async (userId, newRole, userName) => {
    const userRole = {
      role: newRole,
    };
    const res = await axiosSecure.patch(`/users/${userId}`, userRole);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: 'Role Updated!',
        text: `${userName}'s  has been changed to ${newRole}.`,
        icon: 'success',
      });
      refetch();
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        {isLoading && <p>users is loading</p>}
        {isError && <p>Error:{error.message}</p>}
        {users.length > 0 ? (
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
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn m-1">
                        {user.role}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
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
                    {/* user.role */}
                  </td>
                  <td>{user._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && <p>user not found</p>
        )}
      </div>
    </div>
  );
};
