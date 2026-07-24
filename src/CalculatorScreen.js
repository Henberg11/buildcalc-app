import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AdBanner from "./AdBanner";

export default function CalculatorScreen({ calculator, onBack }) {
  const [values, setValues] = useState({});
  const [results, setResults] = useState(null);

  const setField = (key, val) => setValues((prev) => ({ ...prev, [key]: val }));

  const calculate = () => {
    const output = calculator.compute(values);
    setResults(output);
  };

  const reset = () => {
    setValues({});
    setResults(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>{"< Back"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{calculator.title}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {calculator.fields.map((f) => (
            <View key={f.key} style={styles.fieldGroup}>
              <Text style={styles.label}>{f.label}</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder={f.placeholder}
                placeholderTextColor="#A0A8B0"
                value={values[f.key] || ""}
                onChangeText={(t) => setField(f.key, t)}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.calcBtn} onPress={calculate} activeOpacity={0.8}>
            <Text style={styles.calcBtnText}>Calculate</Text>
          </TouchableOpacity>

          {results && (
            <View style={styles.resultsBox}>
              {results.map((r, i) => (
                <View key={i} style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{r.label}</Text>
                  <Text style={styles.resultValue}>{r.value}</Text>
                </View>
              ))}
              <TouchableOpacity onPress={reset} style={styles.resetBtn}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <AdBanner />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F6F8" },
  header: {
    backgroundColor: "#1E3A5F",
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backBtn: { marginBottom: 8 },
  backText: { color: "#CBD8E6", fontSize: 14 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff" },
  body: { padding: 20, paddingBottom: 12 },
  fieldGroup: { marginBottom: 14 },
  label: { fontSize: 13, color: "#4A5560", marginBottom: 6, fontWeight: "500" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E1E6EB",
    color: "#1E3A5F",
  },
  calcBtn: {
    backgroundColor: "#E8833A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  calcBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  resultsBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E1E6EB",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F4",
  },
  resultLabel: { fontSize: 14, color: "#4A5560" },
  resultValue: { fontSize: 15, fontWeight: "700", color: "#1E3A5F" },
  resetBtn: { marginTop: 12, alignItems: "center" },
  resetText: { color: "#8A93A0", fontSize: 13 },
});
