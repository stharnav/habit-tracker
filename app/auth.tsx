import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import { useRouter } from "expo-router";

export default function AuthScreen(){
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const {signIn, signUp} = useAuth();

    const handleAuth = async () => {
        if (!email || !password) return setError("Email and Password are required");
        if (password.length < 6) return setError("Password must be at least 6 characters long");
        setError("");

        try {
            let authError;
            if (isSignUp) {
            authError = await signUp(email, password);
            } else {
            authError = await signIn(email, password);
            }

            if (authError) {
            setError(authError);
            return; // stop redirect
            }

            router.replace("/");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
        };


    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{isSignUp ? "Create Account" : "Sign In"}</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TextInput style={styles.input} label="Email" autoCapitalize="none" keyboardType="email-address" placeholder="example@example.com" mode="outlined" onChangeText={setEmail}/>
                <TextInput style={styles.input} label="Password" secureTextEntry placeholder="Enter your password" mode="outlined" onChangeText={setPassword}/>
                <Button mode="contained" style={styles.button} onPress={handleAuth}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                <Button mode="text" onPress={() => setIsSignUp(!isSignUp)} style={styles.button}>
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f5f5f5",
    },

    content:{
        flex:1,
        padding:16,
        backgroundColor:"#f5f5f5",
    },

    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:16,
        textAlign:"center",
    },

    input:{
        marginBottom:16,
    },

    button:{
        marginTop:16,
    },

    error:{
        color:"red",
        textAlign:"center",
        marginBottom:16,
    }
    
});