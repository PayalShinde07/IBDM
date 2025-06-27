import React from 'react';
import {View,Text,SafeAreaView,StatusBar,StyleSheet} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
          
         
          <View style={styles.header}>
            <Text style={styles.imdbLogo}>IMDb</Text>
          </View>
    </SafeAreaView>
    
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F5C842',
    paddingVertical: 40,
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});
