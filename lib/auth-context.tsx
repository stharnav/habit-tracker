import { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser?: boolean;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] =  useState<Models.User<Models.Preferences> | null>(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try{
            const currentUser = await account.get();
            setUser(currentUser);
        }catch(error){
            setUser(null);
        }finally{
            setIsLoadingUser(false);
        }
    }

    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const signUp = async (email: string, password: string) => {
        try{
            await account.create("unique()", email, password);
            await signIn(email, password);
            const currentUser = await account.get();
            setUser(currentUser);
            return null;
        }catch(error){
            if(error instanceof Error){
                return error.message;
            }
            return "An unknown error occurred during sign up.";
        }
    }

    const signIn = async (email: string, password: string) => {
        try{
            await account.createEmailPasswordSession(email, password);
            return null;
        }catch(error){
            if(error instanceof Error){
                return error.message;
            }
            return "An unknown error occurred during sign in.";
        }
    }

    const signOut = async () => {
        try{
            await account.deleteSession("current");
            setUser(null);
        }catch(error){
            console.error("Error signing out:", error);
        }
    }

    return (
        <AuthContext.Provider value={{user, isLoadingUser, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}