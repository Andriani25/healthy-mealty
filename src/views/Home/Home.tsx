import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";

const Home: React.FC = function () {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  const [dailyFood, setDailyFood] = useState<Meal[]>([]);

  const { onGetDailyFoods } = useFoodStorage();

  const getDailyFoods = useCallback(async () => {
    try {
      const actualFoods = await onGetDailyFoods();

      if (actualFoods) {
        setDailyFood(actualFoods);
      }

      console.log(dailyFood);

      Promise.resolve();
    } catch (error) {
      Promise.reject(console.log(error));
    }
  }, []);

  const handleAddCaloriesOnPress = () => {
    navigate("AddFood", {});
  };

  useFocusEffect(
    useCallback(() => {
      getDailyFoods().catch(null);
    }, [getDailyFoods])
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
