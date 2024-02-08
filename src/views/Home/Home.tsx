import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import ProgressCaloires from "../../components/ProgressCalories/ProgressCalories";
import { Meal } from "../../types";

const Home: React.FC = function () {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  const [dailyFood, setDailyFood] = useState<Meal[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const { onGetDailyFoods, onRemoveDailyFoods } = useFoodStorage();

  const handleAddCaloriesOnPress = () => {
    navigate("AddFood", {});
  };

  const handeRemoveDailyFood = async () => {
    await onRemoveDailyFoods();

    setDailyFood([]);
  };

  const getDailyFoodList = useCallback(async function () {
    try {
      const allFoods = (await onGetDailyFoods()) as Meal[];

      console.log("RESPUESTA DE ASYNC STORAGE", allFoods);

      if (allFoods !== dailyFood) {
        setDailyFood(allFoods);
        console.log("ESTADO DE DAILY FOOD", dailyFood);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDailyFoodList().catch(null);
    }, [getDailyFoodList])
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Comidas</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            color={"primary"}
            icon={<Icon name="add-circle-outline" color={"white"} />}
            radius={"lg"}
            onPress={handleAddCaloriesOnPress}
          />
        </View>
      </View>
      <Button onPress={handeRemoveDailyFood} />
      {dailyFood?.map((food) => (
        <Text>{food.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 25,
    backgroundColor: "#FFF",
  },
  caloriesContainer: {
    alignItems: "center",
    marginVertical: 24,
    flexDirection: "row",
  },
  leftContainer: { flex: 1, justifyContent: "center" },
  rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
