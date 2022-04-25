import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";

const API_URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = "878b0b789d919b4bf55b0d07df865f88";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

const { width: SCROLL_WIDTH } = Dimensions.get("window");

function App() {
  const [city, setCity] = useState("Loading..");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);

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
    const response = await fetch(
      `${API_URL}?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const isLoading = days.length === 0;

  return (
    <View style={styles.container}>
      {ok ? (
        <>
          <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
          </View>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weather}
          >
            {isLoading ? (
              <View style={styles.day}>
                <ActivityIndicator color="white" size="large" />
              </View>
            ) : (
              days.map((day, index) => (
                <View key={index} style={styles.day}>
                  <Text style={styles.temp}>
                    {parseFloat(day.temp.day).toFixed(1)}
                  </Text>
                  <View style={styles.weatherInfo}>
                    <Fontisto
                      name={icons[day.weather[0].main]}
                      size={50}
                      color="#eee"
                      style={{ marginRight: 15 }}
                    />
                    <Text style={styles.main}>{day.weather[0].main}</Text>
                  </View>

                  <Text style={styles.desc}>{day.weather[0].description}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </>
      ) : (
        <View>
          <Text>No..</Text>
        </View>
      )}

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
    color: "#eee",
    fontSize: 58,
    fontWeight: "600",
  },

  day: {
    width: SCROLL_WIDTH,
    alignItems: "center",
  },

  weatherInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  temp: {
    marginTop: 50,
    color: "#eee",
    fontSize: 128,
    fontWeight: "600",
  },

  main: {
    fontSize: 60,
    color: "#eee",
  },
  desc: {
    fontSize: 32,
    color: "#eee",
  },
});

export default App;
