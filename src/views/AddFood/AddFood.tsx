import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button, Icon } from "@rneui/themed";
import Header from "../../components/Header";

const AddFood = function () {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Add Food</Text>
        </View>
        <View style={[styles.rightContainer, { marginRight: 15 }]}>
          <Button
            icon={<Icon name="add-circle-outline" color="white" />}
            radius={"lg"}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.leftContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="¡Busca una comida!"
          />
        </View>
        <View style={styles.rightContainer}>
          <Button title={"Search"} radius={"lg"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  addContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: { flex: 1, justifyContent: "center" },
  rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: 250,
    marginLeft: -5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default AddFood;
