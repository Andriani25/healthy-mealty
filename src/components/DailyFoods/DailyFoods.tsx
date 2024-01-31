import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Meal } from "../../types";

const DailyFood: FC<Meal> = function ({ calories, portion, name }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{calories}</Text>
      <Text>{portion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DailyFood;
