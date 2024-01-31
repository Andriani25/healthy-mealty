import React, { FC } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";

const MealCard: FC<Meal> = function ({ calories, portion, name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{`${calories} kcal`}</Text>
      <Text style={styles.text}>{`${portion} g`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    marginBottom: 5,
    color: "white",
  },
});

export default MealCard;
