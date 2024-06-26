import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import Header from "../../components/Header";
import MealCard from "../../components/MealCard";
import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";

const AddFood = function () {
  const { onSaveFood, onGetFoods, onRemoveFoods } = useFoodStorage();
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [foodList, setFoodList] = useState<Meal[]>([]);
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const [testName, setTestName] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<Meal[]>([]);

  const handleSubmitFood = async function () {
    try {
      await onSaveFood({
        name,
        calories,
        portion,
      });

      setName("");
      setCalories("");
      setPortion("");
      setIsVisible(false);

      Alert.alert("¡Comida guardad exitosamente!");
    } catch (error) {
      Alert.alert("Hubo un problema en guardar la comida..");

      console.error(error);
    }
  };

  const handleFilterFood = async function (value: string) {
    try {
      const allFoods = await onGetFoods();

      if (allFoods && allFoods.length !== 0) {
        const newFoods = allFoods.filter((item: Meal) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilterList(newFoods);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTestNameFood = async function (value: string) {
    try {
      const allFoods = await onGetFoods();

      if (
        allFoods?.find(
          (item: Meal) => item.name.toLowerCase() === value.toLowerCase()
        )
      ) {
        return setTestName(true);
      }
      setTestName(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getFoodList = useCallback(async function () {
    try {
      const allFoods = await onGetFoods();

      if (allFoods !== foodList) {
        setFoodList(allFoods);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getFoodList().catch(null);
    }, [foodList])
  );

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
            {testName ? (
              <View
                style={{
                  margin: 5,
                  alignItems: "center",
                }}
              >
                <Text style={styles.alert}>
                  ¡Recuerda que no pueden haber dos comidas con el mismo nombre!
                </Text>
              </View>
            ) : (
              ""
            )}
            <TextInput
              style={[styles.inputForm, { marginTop: 10 }]}
              textAlign="center"
              placeholder="Nombre de la comida"
              value={name}
              onChangeText={(text: string) => {
                setName(text);

                handleTestNameFood(text);
              }}
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
                portion.trim() === "" ||
                testName
              }
              onPress={handleSubmitFood}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.addContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Nueva Comida</Text>
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
        {filterList.length !== 0
          ? filterList?.map((meal) => <MealCard {...meal} key={meal.name} />)
          : foodList?.map((meal) => <MealCard {...meal} key={meal.name} />)}
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
  alert: {
    fontSize: 15,
    color: "red",
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
