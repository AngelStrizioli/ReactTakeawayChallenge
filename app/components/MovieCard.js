import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import React from 'react'
import { API_STRINGS } from '../constants/strings';

export default function MovieCard({ movie, index, onPress }) {
  const { id, release_date, title, backdrop_path, vote_average, vote_count } = movie
  return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
          <Image
              source={{ uri: API_STRINGS.IMAGE_URL + backdrop_path }}
              style={styles.image}
              resizeMode="stretch"
          />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColo: 'black',
        padding: '2%',
        alignSelf: 'center',
        marginHorizontal: '3%',
        marginVertical: '2%',
        width: '44%',
        height: 210,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: '3%'
    },
    image: {
       width: 145,
        height: 120,
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: '3%'
    }
});