import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './Routes/Navigation';

const App = () => {
  console.disableYellowBox = true;

  return (
    <SafeAreaView style={styles.demoApp}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  demoApp: {
    flex: 1
  }
})

export default App;