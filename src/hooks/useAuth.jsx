import { useContext } from 'react';
import { AuthContext } from '../Router/provider/AuthProvider';

const useAuth = () => useContext(AuthContext);

export default useAuth;
