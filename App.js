import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
	useFonts as useOswald,
	Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import {
	useFonts as useTradeWinds,
	TradeWinds_400Regular,
} from '@expo-google-fonts/trade-winds';
import { theme } from './src/infrastruture/theme';
import { Navigation } from './src/infrastruture/navigation';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';

export default function App() {
	const [oswaldLoaded] = useOswald({
		Oswald_400Regular,
	});

	const [latoLoaded] = useLato({
		Lato_400Regular,
	});

	const [tradeWindsLoaded] = useTradeWinds({
		TradeWinds_400Regular,
	});

	if (!oswaldLoaded || !latoLoaded || !tradeWindsLoaded) {
		return null;
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<AuthenticationContextProvider>
					<Navigation />
				</AuthenticationContextProvider>
			</ThemeProvider>
			<ExpoStatusBar style='auto' />
		</>
	);
}
