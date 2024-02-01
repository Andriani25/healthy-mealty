import React, { FC, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Meal } from "../../types";

const DailyFoods: FC = function () {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    height: 20,
    width: 20,
  },
});

export default DailyFoods;
