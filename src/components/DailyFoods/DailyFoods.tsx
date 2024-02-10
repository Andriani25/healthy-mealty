import React, { FC } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Icon, Button } from "@rneui/base";
import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";

const DailyFoods: FC<Meal> = function ({ name, date }) {
  const { onRemoveDailyFoods } = useFoodStorage();

  const handeRemoveDailyFood = async (value: string) => {
    await onRemoveDailyFoods(value);

    Alert.alert("¡Comida del día removida!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Button
          icon={
            <Icon
              name="cancel"
              backgroundColor={"#2089dc"}
              color="#FFF"
              style={{ width: 30, height: 30, marginHorizontal: 5 }}
              borderRadius={15}
              // @ts-expect-error
              onPress={() => handeRemoveDailyFood(date)}
            />
          }
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text}>{` ${name}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderRadius: 30,
    borderColor: "white",
    marginVertical: 15,
  },
  leftContainer: { width: 40, height: 50, justifyContent: "center" },
  rightContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFF",
  },
});

export default DailyFoods;
