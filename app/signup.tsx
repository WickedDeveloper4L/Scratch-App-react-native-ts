import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signup } from "@/redux/user/user.hooks";
import {
  selectAuthEror,
  selectAuthSession,
  selectCurrentUser,
  selectIsAuthLoading,
  setError,
  setIsLoading,
  setSession,
  setUser,
} from "@/redux/user/user.reducer";
import { Image } from "expo-image";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";
const logo = require("@/assets/images/icon.png");
interface InfoProps {
  email: string;
  password: string;
}
export default function SignUp() {
  const [info, setInfo] = useState<InfoProps>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => selectIsAuthLoading(state));
  const authError = useAppSelector((state) => selectAuthEror(state));
  const session = useAppSelector((state) => selectAuthSession(state));

  if (authError?.code === "user_already_exists") {
    dispatch(setUser());
  }

  const handleSignup = async () => {
    await dispatch(signup(info));
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data?.idToken) {
        dispatch(setIsLoading(true));
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (data.session) {
          dispatch(setSession(data.session));
          dispatch(setIsLoading(false));
        }
        if (error) {
          dispatch(setIsLoading(false));
          dispatch(setError(error));
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("Signin cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        alert("Sign-in in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert("Google play services not available");
      } else {
        console.log("Unknown Error occurred", error);
      }
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      router.replace("/(app)");
    }
  }, [session]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Scratch</Text>
      <Text style={styles.small}>start your memories...</Text>
      <TextInput
        placeholder="email"
        value={info.email}
        style={styles.input}
        placeholderTextColor="#25292e"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(text) => setInfo({ ...info, email: text })}
      />

      <TextInput
        placeholder="password"
        value={info.password}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#25292e"
        textContentType="password"
        onChangeText={(text) => setInfo({ ...info, password: text })}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="#ae0563" />
      ) : (
        <View style={styles.btnCon}>
          <Pressable
            onPress={handleSignup}
            disabled={info.email.length && info.password.length ? false : true}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#e4e4" : "#ae0563",
              },
              styles.btnCon,
            ]}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </Pressable>
        </View>
      )}
      <Text style={styles.alt}>Or</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      <Link href="/signin" style={styles.label}>
        have an account? sign in
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ae0563",
    marginTop: 20,
  },
  small: {
    fontSize: 17,
    margin: 10,
    color: "#fff",
    fontStyle: "italic",
  },
  alt: {
    fontSize: 14,
    margin: 5,
    color: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    margin: 10,
  },
  input: {
    backgroundColor: "#fff",
    color: "#25292e",
    fontSize: 15,
    padding: 10,
    borderRadius: 7,
    width: "70%",
    height: 40,
    margin: 15,
  },
  btnCon: {
    padding: 15,
    // width: "50%",
    borderRadius: 7,
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
