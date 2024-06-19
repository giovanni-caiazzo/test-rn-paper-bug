import React, {useEffect, useMemo, useState} from 'react';
import {ColorSchemeName, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CustomBottomTabNavigator from './components/CustomBottomTabNavigator';
import {PaperProvider, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';

const paperTheme = (colorScheme: ColorSchemeName) =>
    colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const colorScheme = useColorScheme();
    const theme = useMemo(() => {
        const defaultTheme = paperTheme(colorScheme);
        return {
            ...defaultTheme,
            colors: {
                ...defaultTheme.colors,
                primary:
                    colorScheme !== 'dark'
                        ? 'rgba(43, 117, 161, 1)'
                        : 'rgba(60, 219, 211, 1)',
                primaryContainer:
                    colorScheme !== 'dark'
                        ? 'rgba(43, 117, 161, 0.1)'
                        : 'rgba(24, 87, 84, 1)',
            },
        };
    }, [colorScheme]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 500)
    }, []);
  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <StatusBar/>
          <CustomBottomTabNavigator loading={loading} error={error} />
        </NavigationContainer>
      </PaperProvider>
  );
}

export default App;
