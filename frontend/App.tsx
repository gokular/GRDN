import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import Navigation from './navigation';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import FontProvider from './providers/FontProvider';
import configureStore from './redux/configureStore';

// Ignores the long timer warnings
LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  const { store, persistor } = configureStore()
  return (
    <FontProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </FontProvider>
  );
}
