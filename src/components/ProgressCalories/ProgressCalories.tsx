import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Statistics } from "../../types";

const ProgressCaloires: FC<Statistics> = function ({
  total,
  consumido,
  faltante,
  porcentaje,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress
          value={porcentaje}
          activeStrokeColor="#2089dc"
          inActiveStrokeColor={"gray"}
          activeStrokeSecondaryColor={"yellow"}
          inActiveStrokeOpacity={0.5}
          progressValueColor={"black"}
          valueSuffix={"%"}
          circleBackgroundColor="#FFF"
        />
        {porcentaje > 100 ? (
          <Text style={[styles.title, { color: "red" }]}>
            ¡Superaste las calorías diarías..!
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>Hoy</Text>
        <View style={styles.rightItems}>
          <Text style={styles.rightText}>Total</Text>
          <Text style={styles.rightValue}>{total}</Text>
        </View>
        <View style={styles.rightItems}>
          <Text style={styles.rightText}>Consumido</Text>
          <Text style={styles.rightValue}>{consumido}</Text>
        </View>
        <View style={styles.rightItems}>
          <Text style={styles.rightText}>Faltante</Text>
          <Text style={styles.rightValue}>{faltante}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
  },
  leftContainer: { flex: 1, alignItems: "flex-start" },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightItems: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  rightValue: {
    flex: 1,
    textAlign: "right",
    fontWeight: "400",
  },
  rightText: {
    flex: 1,
    fontWeight: "500",
  },
});

export default ProgressCaloires;
