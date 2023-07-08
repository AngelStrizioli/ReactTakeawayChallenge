import { View, Text, Modal, Pressable, StyleSheet, Image} from 'react-native'
import React from 'react'
import { API_STRINGS } from '../constants/strings';

export default function CustomModal({ movie, genres, showModal, onClose }) {
    const { id, release_date, title, backdrop_path, vote_average, vote_count, original_language, adult, overview, original_title } = movie
    
    const textData = [
        {
            'title': 'Original title:',
            'value': original_title,
        },
        {
            'title': 'Languaje:',
            'value': original_language,
        },
        {
            'title': 'Released:',
            'value': release_date,
        },
        {
            'title': 'Public:',
            'value': adult ? '+18' : 'Everyone',
        },
        {
            'title': 'Rating:',
            'value': vote_average,
        },
        {
            'title': 'Votes quantity:',
            'value': vote_count,
        },    
        {
            'title': 'Genres:',
            'value': genres.map((item) => { return ` ${item.name}` }),
        },   
    ]

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={onClose}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.title}>{title}</Text>
                    <Image
                        source={{ uri: API_STRINGS.IMAGE_URL + backdrop_path }}
                        style={styles.image}
                        resizeMode="stretch"
                    />
                  {textData.map((item, index) =>
                      <View style={styles.textRow} key={index}>
                          <Text style={styles.subtitle}>{item.title}</Text>
                          <Text style={styles.description}>{item.value}</Text>
                      </View>
                  )}
                    <Pressable
                        style={styles.buttonClose}
                        onPress={onClose}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
      borderColor: '#5d8aa8',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      marginTop: '5%'
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        paddingBottom: '5%'
  },
  image: {
        width: 250,
        height: 200,
        alignSelf: 'center',
        borderRadius: 5,
    },
    textRow: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: '70%',
        paddingTop: '2%'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingRight: '3%'
    },
    description: {
        fontSize: 14,
        alignSelf: 'center'
    }
});
