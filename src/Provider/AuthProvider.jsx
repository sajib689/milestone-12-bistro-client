import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../Firebase/Firebase.init';
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()
const gitHubProvider = new GithubAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const secureAxios = useAxiosPublic()
    const registers = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const google = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const gitHub = () => {
        setLoading(true)
        return signInWithPopup(auth, gitHubProvider)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect( () => {
      const unsubscribe =  onAuthStateChanged(auth,currentUser => {
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email: userEmail}
            setLoading(false)
            setUser(currentUser)
            if(currentUser) {
                secureAxios.post('/jwt',loggedUser,{
                    withCredentials: true,
                })
                .then(res => {
                    // console.log(res.data)
                    setLoading(false)
                })
            } else {
                secureAxios.post('/logout',loggedUser,{
                    withCredentials: true,
                })
                .then(res => {
                    // console.log('logout',res.data)
                    setLoading(false)
                })
            }
           
        })
        return () => {
            unsubscribe()
        }
    },[user?.email,secureAxios])
    const authInfo = {
        registers,
        login,
        logOut,
        google,
        gitHub,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;