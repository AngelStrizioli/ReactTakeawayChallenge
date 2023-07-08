import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import React from 'react'
import { API_STRINGS } from '../constants/strings';

export default function FooterList({  onPress }) {
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>Load more movies</Text>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#5d8aa8',
        borderRadius: 5,
        padding: '2%',
        marginVertical: '2%'
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'semibold',
    },
    
});