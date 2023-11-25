import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView} from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import Navigation from './src/navigation';

const queryClient = new QueryClient();

const text1Style = {
  color: '#fff',
  fontSize: 18,
}

const text2Style = {
  color: '#fff',
  fontSize: 14,
}

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#008000', backgroundColor: '#008000' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={text1Style}
      text2Style={{
        color: '#fff',
        fontSize: 14,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ff0000',
        backgroundColor: '#ff0000',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Navigation />
    </SafeAreaView>
    <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
