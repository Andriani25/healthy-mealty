import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ProgressCaloires: FC = function (number) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        
        <AnimatedCircularProgress

          size={120}
          width={15}
          fill={50}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        />
      </View>
      <View style={styles.rightContainer}>
        <Text>Calorías totales</Text>
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
  leftContainer: { flex: 1, justifyContent: "center" },
  rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
});

export default ProgressCaloires;
