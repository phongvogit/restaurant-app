import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastruture/theme";
import { Navigation } from "./src/infrastruture/navigation";
import * as firebase from 'firebase';
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG-VnlnobLlJAOUvKYsuSxmCNZSveYnYg",
  authDomain: "mealstogo-4bcab.firebaseapp.com",
  projectId: "mealstogo-4bcab",
  storageBucket: "mealstogo-4bcab.appspot.com",
  messagingSenderId: "202467037900",
  appId: "1:202467037900:web:f65cfd183e75e5a04fa869",
  measurementId: "G-GNGJSN6H6L"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }



  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}