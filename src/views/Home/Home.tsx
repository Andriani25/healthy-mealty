import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Header from "../../components/Header";
import DailyFoods from "../../components/DailyFoods";
import { Button, Icon } from "@rneui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Meal, Statistics } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import ProgressCaloires from "../../components/ProgressCalories/ProgressCalories";

const Home: React.FC = function () {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  const [dailyFood, setDailyFood] = useState<Meal[]>([]);
  const [dailyStatistics, setDailyStatistics] = useState<Statistics>();
  const [caloriesPerDay, setCaloriesPerDay] = useState<number>(2500);

  const { onGetDailyFoods, onRemoveDailyFoods } = useFoodStorage();

  const handleAddCaloriesOnPress = () => {
    navigate("AddFood", {});
  };

  const getStadistics = function (meals: Meal[]) {
    try {
      let total = 0;

      meals?.forEach((meals) => (total = Number(meals.calories) + total));

      let difference = caloriesPerDay - total;

      let percentage = (total / caloriesPerDay) * 100;

      setDailyStatistics({
        total: caloriesPerDay,
        consumido: total,
        faltante: difference,
        porcentaje: percentage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDailyFoodList = async function () {
    try {
      const allFoods = (await onGetDailyFoods()) as Meal[];

      getStadistics(allFoods);

      if (allFoods !== dailyFood) {
        setDailyFood(allFoods);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDailyFoodList().catch(null);
    }, [dailyFood])
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
      <View style={styles.progressContainer}>
        <ProgressCaloires {...(dailyStatistics as Statistics)} />
      </View>

      <ScrollView
        style={{
          borderRadius: 15,
          backgroundColor: "#2089dc",
          flex: 1,
        }}
      >
        {dailyFood?.map((food) => (
          <DailyFoods {...food} key={food.date} />
        ))}
      </ScrollView>
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
  progressContainer: {
    flex: 1,
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
