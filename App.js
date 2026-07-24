import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import mobileAds from "react-native-google-mobile-ads";
import HomeScreen from "./src/HomeScreen";
import CalculatorScreen from "./src/CalculatorScreen";

export default function App() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Initialize the Google Mobile Ads SDK once on app start.
    mobileAds()
      .initialize()
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <>
      <StatusBar style="light" />
      {selected ? (
        <CalculatorScreen calculator={selected} onBack={() => setSelected(null)} />
      ) : (
        <HomeScreen onSelect={setSelected} />
      )}
    </>
  );
}
