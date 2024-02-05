import React, { FC } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";

const MealCard: FC<Meal> = function ({ calories, portion, name }) {
  const { onRemoveFoods, onAddDailyFood } = useFoodStorage();

  const handleRemoveFood = async function (value: string) {
    try {
      await onRemoveFoods(value);

      Alert.alert("Comida borrada exitosamente");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDailyFood = async function ({
    calories,
    portion,
    name,
  }: Meal) {
    try {
      await onAddDailyFood({ calories, portion, name });

      Alert.alert("Comida del día añadida correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{`${calories} kcal`}</Text>
        <Text style={styles.text}>{`${portion} g`}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name="add" color="white" />}
          type="clear"
          size="sm"
          buttonStyle={{ width: 40, height: 40, marginTop: 5, marginRight: 50 }}
          onPress={() => handleAddDailyFood({ calories, portion, name })}
        />
        <Button
          icon={<Icon name="delete" color="white" />}
          type="clear"
          size="sm"
          buttonStyle={{ width: 40, height: 40, marginTop: 5, marginRight: 50 }}
          onPress={() => handleRemoveFood(name)}
        />
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
  leftContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginLeft: 10 },
  rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  text: {
    marginBottom: 10,
    color: "white",
  },
});

export default MealCard;
