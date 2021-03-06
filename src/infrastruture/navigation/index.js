import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { SafeArea } from '../../components/utils/safe-area.component';
import { ScanFailedScreen } from '../../features/settings/screens/qrcode/scan-failed.screen';

export const Navigation = () => {
	const { isAuthenticated } = useContext(AuthenticationContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return (
		<NavigationContainer>
			{isLoading ? (
				<SafeArea style={{ justifyContent: 'center' }}>
					<ActivityIndicator
						animating={true}
						size={50}
						color={Colors.blue300}
					/>
				</SafeArea>
			) : isAuthenticated ? (
				<AppNavigator />
			) : (
				<AccountNavigator />
			)}
		</NavigationContainer>
	);
};
