import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function SearchBar({ onChangeText, value }) {
    
  return (
      <TextInput style={styles.searchBarContainer}
            keyboardType='web-search'
            returnKeyLabel='Buscar'
            returnKeyType='search'
            placeholder='Search'
            value={value}
            onChangeText={(textInput) => onChangeText(textInput)}
        />
  )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        marginHorizontal: '5%',
        borderWidth: 1,
        borderColor: '#5d8aa8',
        borderRadius: 5,
        padding: '2%',
        marginTop: '5%',
    }
});