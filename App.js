import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

const { width: SCROLL_WIDTH } = Dimensions.get("window");

function App() {
  const [city, setCity] = useState("Loading..");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const [location] = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location.city);
  };

  useEffect(() => {
    ask();
  });

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6768ac",
  },

  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },

  cityName: {
    fontSize: 58,
    fontWeight: "600",
  },

  weather: {},

  day: {
    width: SCROLL_WIDTH,
    alignItems: "center",
  },

  temp: {
    marginTop: 50,
    fontSize: 158,
    fontWeight: "600",
  },

  desc: {
    fontSize: 60,
  },
});

export default App;
