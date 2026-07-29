import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { usePremium } from "./premium";

// Small pill shown in the header. Hidden entirely once the user has paid, and
// also hidden if the store isn't reachable, so we never show a button that
// can't do anything.
export function RemoveAdsButton() {
  const { isPremium, available } = usePremium();
  const [open, setOpen] = useState(false);

  if (isPremium || !available) return null;

  return (
    <>
      <TouchableOpacity style={styles.pill} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Text style={styles.pillText}>Remove ads</Text>
      </TouchableOpacity>
      <RemoveAdsModal visible={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function RemoveAdsModal({ visible, onClose }) {
  const { isPremium, ready, price, busy, buy, restore } = usePremium();
  const [restoreMsg, setRestoreMsg] = useState(null);

  const handleRestore = async () => {
    setRestoreMsg(null);
    const found = await restore();
    setRestoreMsg(found ? "Purchase restored." : "No previous purchase found.");
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Remove Ads</Text>

          {isPremium ? (
            <>
              <Text style={styles.body}>
                Ads are removed. Thanks for supporting BuildCalc.
              </Text>
              <TouchableOpacity style={styles.secondary} onPress={onClose} activeOpacity={0.85}>
                <Text style={styles.secondaryText}>CLOSE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.body}>
                A single one-time payment removes the banner from every calculator, permanently.
                No subscription.
              </Text>

              <TouchableOpacity
                style={[styles.primary, (!ready || busy) && styles.disabled]}
                disabled={!ready || busy}
                onPress={buy}
                activeOpacity={0.85}
              >
                {busy ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.primaryText}>REMOVE ADS</Text>
                    {price ? <Text style={styles.priceText}>{price}</Text> : null}
                  </>
                )}
              </TouchableOpacity>

              {!ready && (
                <Text style={styles.note}>Connecting to Google Play…</Text>
              )}

              <TouchableOpacity style={styles.link} onPress={handleRestore} disabled={busy}>
                <Text style={styles.linkText}>Restore purchase</Text>
              </TouchableOpacity>

              {restoreMsg ? <Text style={styles.note}>{restoreMsg}</Text> : null}

              <TouchableOpacity style={styles.secondary} onPress={onClose} activeOpacity={0.85}>
                <Text style={styles.secondaryText}>NOT NOW</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(10,20,32,0.7)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#1E3A5F", textAlign: "center" },
  body: {
    fontSize: 14,
    color: "#4A5560",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  primary: {
    backgroundColor: "#E8833A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 18,
    minHeight: 50,
    justifyContent: "center",
  },
  primaryText: { color: "#fff", fontSize: 15, fontWeight: "700", letterSpacing: 0.5 },
  priceText: { color: "#FFE7D5", fontSize: 13, marginTop: 2 },
  disabled: { backgroundColor: "#C9CFD6" },
  secondary: {
    backgroundColor: "#F0F2F4",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryText: { color: "#6B7684", fontSize: 13, fontWeight: "600" },
  link: { paddingVertical: 12, alignItems: "center" },
  linkText: { color: "#1E3A5F", fontSize: 13, fontWeight: "600" },
  note: { fontSize: 12, color: "#8A93A0", textAlign: "center", marginTop: 4 },
});

export default RemoveAdsButton;
