import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { CALCULATORS } from "./calculators";
import RemoveAdsButton from "./RemoveAdsButton";

export default function HomeScreen({ onSelect }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>BuildCalc</Text>
          <RemoveAdsButton />
        </View>
        <Text style={styles.headerSubtitle}>Trade & DIY calculators, all in one place</Text>
      </View>
      <FlatList
        data={CALCULATORS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelect(item)} activeOpacity={0.7}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
            <Text style={styles.chevron}>{">"}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F6F8" },
  header: {
    backgroundColor: "#1E3A5F",
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 28, fontWeight: "700", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#CBD8E6", marginTop: 4 },
  list: { padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardIcon: { fontSize: 28, marginRight: 14 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1E3A5F" },
  cardDesc: { fontSize: 13, color: "#6B7684", marginTop: 2 },
  chevron: { fontSize: 18, color: "#B0B8C1" },
});
