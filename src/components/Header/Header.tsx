import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Alert } from "react-native";
import { Button, Icon, Image } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import useFoodStorage from "../../hooks/useFoodStorage";

const Header = function () {
  const { canGoBack, goBack } = useNavigation();

  const { onSetUserName, onSetUserImage, onGetUserImage, onGetUserName } =
    useFoodStorage();

  const [isVisible, setIsVisible] = useState(false);
  const [nameUser, setNameUser] = useState<string>("Usuario");
  const [picture, setPicture] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0xKoXUryp0JZ1Sxp-99eQiQcFrmA1M1qbQ&usqp=CAU"
  );

  useEffect(() => {
    async () => {
      const userName = await onGetUserName();
      
      if (userName) setNameUser(userName);
    };
  }, []);

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const handleChangeUserName = async (value: string) => {
    await onSetUserName(value);

    Alert.alert("¡Usuario actualizado correctamente!");

    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}

      <Modal
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button
              icon={<Icon name="close" color="black" />}
              onPress={() => {
                setIsVisible(!isVisible);
              }}
              radius={"lg"}
              buttonStyle={{ marginLeft: 205 }}
              type="clear"
              size={"md"}
            />
            <Button
              icon={<Icon name="image" color="white" />}
              radius={"lg"}
              title="Cambiar foto de perfil"
              buttonStyle={{ margin: 5 }}
              onPress={handleImagePickerPress}
            />
            <TextInput
              style={[styles.inputForm, { marginTop: 10 }]}
              textAlign="center"
              placeholder="Nombre de usuario"
              onChangeText={(text: string) => {
                setNameUser(text);
              }}
            />
            <View style={{ alignItems: "center" }}>
              <Button
                title="Guardar"
                size="sm"
                radius={"lg"}
                buttonStyle={{ height: 50, width: 80, margin: 15 }}
                onPress={() => handleChangeUserName(nameUser)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{`Hola ${nameUser}`}</Text>
        <Text style={styles.subTitle}>¡Bienvenido de nuevo a tu objetivo!</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: picture }}
          onPress={() => setIsVisible(true)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: { flex: 1, justifyContent: "center" },
  rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  title: { fontWeight: "bold", fontSize: 14 },
  subTitle: { fontSize: 12, color: "#808080" },
  avatar: { width: 80, height: 80, borderRadius: 100 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "75%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    borderColor: "black",
  },
  inputForm: {
    height: 50,
    width: 250,
    marginVertical: 5,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,
  },
});

export default Header;
