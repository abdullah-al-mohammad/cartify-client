import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../../../firebase.config"
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()

  // create a function  to handle the register
  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }
  // create a function to handle the login
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // logout user
  const logout = () => {
    return signOut(auth)
  }
  // check if the user is logged in
  useEffect(() => {
    setLoading(true); // Start loading while checking auth state
    const unsubsCribe = onAuthStateChanged(auth, (currentUser => {
      setUser(currentUser)


      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser?.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
            }
          })
      } else {
        localStorage.removeItem('access-token')
      }
      setLoading(false); // Stop loading once auth state is confirmed
    }))
    return () => unsubsCribe(); // Properly clean up listener
  }, [])

  const userInfo = {
    user,
    loading,
    registerUser,
    updateUserProfile,
    loginUser,
    logout
  }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider