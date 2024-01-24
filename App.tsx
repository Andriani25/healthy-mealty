import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes/Routes";

export default function App() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Routes />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
