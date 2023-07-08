import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

export default function EmptyList({userInput, rating}) {
  return (
      <View style={styles.container} >
          {userInput && <Text style={styles.title}>{`We can not find a moview with the name: ${userInput} and a rating of: ${rating}`}</Text>}
          <Image
              source={{ uri: 'https://chronicle.brightspotcdn.com/89/74/4b46fe3effe1e4f0fa4ce534f383/nothing-to-see-15a34a2fc727c8.jpg' }}
              style={styles.image}
              resizeMode="stretch"
          />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '5%'
    },
    image: {
        width: 250,
        height: 200,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: '3%'
    }
});
