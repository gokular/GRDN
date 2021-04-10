import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Rubik_300Light, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';

export default function FontProvider({ children }: any) {
    let [fontsLoaded] = useFonts({
        Rubik_300Light,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold
    });

    // Shows splash screen
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return children
}

export const fontLight = "Rubik_300Light"
export const fontRegular = "Rubik_400Regular"
export const fontMedium = "Rubik_500Medium"
export const fontBold = "Rubik_700Bold"

export const fontSizeSmall = 14
export const fontSizeRegular = 16
export const fontSizeLarge = 20