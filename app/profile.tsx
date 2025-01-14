import { useAppSelector } from "@/redux/hooks";
import { selectAuthSession } from "@/redux/user/user.reducer";
import { supabase } from "@/utils/supabase";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
const logo = require("@/assets/images/icon.png");
import DropDownPicker from "react-native-dropdown-picker";
export default function Profile() {
  const [genderOpen, setGenderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    country: "",
  });
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const router = useRouter();

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        name: info.name,
        country: info.country,
        gender: gender,
      })
      .eq("id", user?.id);
    if (error) {
      console.log(error);
      setIsLoading(false);
      alert("Unable to update your profile at this time.");
    }
    setIsLoading(false);
    if (!error) router.replace("/(app)");
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.screenTitle}>Complete your profile</Text>
      <View style={styles.inputCon}>
        <Text style={styles.label}>Set your display name</Text>
        <TextInput
          placeholder="Display name"
          value={info.name}
          style={styles.input}
          placeholderTextColor="#25292e"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="emailAddress"
          onChangeText={(text) => setInfo({ ...info, name: text })}
        />
        <Text style={styles.label}>Country</Text>
        <TextInput
          placeholder="Country"
          value={info.country}
          style={styles.input}
          placeholderTextColor="#25292e"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={(text) => setInfo({ ...info, country: text })}
        />
        <Text style={styles.label}>Gender</Text>
        <DropDownPicker
          open={genderOpen}
          value={gender}
          items={items}
          setOpen={setGenderOpen}
          setValue={setGender}
          setItems={setItems}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color="#ae0563" />
      ) : (
        <Pressable
          onPress={handleProfileUpdate}
          disabled={
            info.name.length && info.country.length && gender ? false : true
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#e4e4" : "#ae0563",
            },
            styles.btnCon,
          ]}
        >
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 300,
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 300,
    color: "#fff",
    alignSelf: "flex-start",
  },
  inputCon: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    color: "#25292e",
    fontSize: 15,
    padding: 10,
    borderRadius: 7,
    height: 40,
    margin: 15,
    width: "100%",
  },
  btnCon: {
    padding: 15,
    width: "50%",
    borderRadius: 7,
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
