import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import Header from "../../components/Header";

import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import MealCard from "../../components/MealCard";

const AddFood = function () {
  const { onSaveFood, onGetFoods, onRemoveFoods } = useFoodStorage();
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [foodList, setFoodList] = useState<Meal[]>([]);
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);

  const handleSubmitFood = async function () {
    try {
      await onSaveFood({
        name,
        calories,
        portion,
      });

      Alert.alert("¡Comida guardad exitosamente!");

      setUpdate(true);
      setIsVisible(false);
    } catch (error) {
      Alert.alert("Hubo un problema en guardar la comida..");

      console.error(error);
    }
  };

  const handleFilterFood = async function (value: string) {
    try {
      const allFoods = await onGetFoods();

      if (allFoods) {
        const newFoods = allFoods.filter((item: Meal) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFoodList(newFoods);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFood = async function (value: string) {
    try {
      await onRemoveFoods(value);

      setUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setName("");
    setCalories("");
    setPortion("");
  }, [isVisible]);

  useEffect(() => {
    const getFoodList = async function () {
      try {
        const allFoods = await onGetFoods();

        setFoodList(allFoods);

        setUpdate(false);

        console.log(foodList);
      } catch (error) {
        console.error(error);
      }
    };

    getFoodList().catch(null);
  }, [update]);

  return (
    <View style={styles.container}>
      <Header />
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
            <TextInput
              style={[styles.inputForm, { marginTop: 10 }]}
              textAlign="center"
              placeholder="Nombre de la comida"
              value={name}
              onChangeText={(text: string) => setName(text)}
            />
            <TextInput
              style={styles.inputForm}
              textAlign="center"
              placeholder="Cantidad de calorías (k.calorías) "
              keyboardType="number-pad"
              value={calories}
              onChangeText={(text: string) => setCalories(text)}
            />
            <TextInput
              style={styles.inputForm}
              textAlign="center"
              keyboardType="number-pad"
              placeholder="Cantidad de porción (gramos) "
              value={portion}
              onChangeText={(text: string) => setPortion(text)}
            />
            <Button
              icon={<Icon name="add" color="white" />}
              title={"Agregar Comida"}
              titleStyle={{ color: "white", marginHorizontal: 5 }}
              size="sm"
              radius={"lg"}
              buttonStyle={{ marginTop: 20, marginLeft: 70 }}
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                portion.trim() === ""
              }
              onPress={handleSubmitFood}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.addContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Add Food</Text>
        </View>
        <View style={[styles.rightContainer, { marginRight: 15 }]}>
          <Button
            icon={<Icon name="add-circle-outline" color="white" />}
            radius={"lg"}
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.leftContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="¡Busca una comida!"
            textAlign="center"
          />
        </View>
        <View style={styles.rightContainer}>
          <Button
            title={"Search"}
            radius={"lg"}
            onPress={() => handleFilterFood(search)}
          />
        </View>
      </View>
      <ScrollView
        style={{ backgroundColor: "#2089dc", marginTop: 40, borderRadius: 25 }}
      >
        {foodList?.map((meal) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: 15,
            }}
          >
            <MealCard {...meal} key={meal.name} />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                icon={<Icon name="delete" color="white" />}
                type="clear"
                size="sm"
                buttonStyle={{ width: 40, height: 40, marginTop: 5 }}
                onPress={() => handleRemoveFood(meal.name)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
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
    margin: 5,
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

export default AddFood;
