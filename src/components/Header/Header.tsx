import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = function () {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Hola Andriani Leandro</Text>
        <Text style={styles.subTitle}>¡Bienvenido de nuevo a tu objetivo!</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/dev.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: { flex: 1, justifyContent: "center" },
  rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  title: { fontWeight: "bold", fontSize: 14 },
  subTitle: { fontSize: 12, color: "#808080" },
  avatar: { width: 80, height: 80, borderRadius: 100 },
});

export default Header;
