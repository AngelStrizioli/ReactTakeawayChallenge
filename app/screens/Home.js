import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react'
import {getPopularMovies, getMoviesGenres, getMoviesBySearch, getMoviesByRating } from '../utils/movies';
import MovieCard from '../components/MovieCard';
import FooterList from '../components/FooterList';
import CustomModal from '../components/Modal';
import { resolveGenres, resolveMoviesByRating } from '../utils/functions';
import SearchBar from '../components/SearchBar';
import { Rating } from 'react-native-ratings';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)
  const [pageIndex, setPageIndex] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState({})
  const [genres, setGenres] = useState([])
  const [selectedMovieGenres, setSelectedMovieGenres] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const debounceRef = useRef();
  const [showAllMovies, setShowAllMovies] = useState(true)
  const [userInput, setUserInput] = useState('')
  const [userSearchPageIndex, setUserSearchPageIndex] = useState(1)
  const [availableLoadMoreMovies, setAvailableLoadMoreMovies] = useState(true)
  const [rating, setRating] = useState(0)
  const [ratingPageIndex, setRatingPageIndex] = useState(1)
  const [ratingMovies, setRatingMovies] = useState([])
  const [showRatingMovies, setShowRatingMovies] = useState(false)
  const getGenres = async () => {
    const { genres, ...result } = await getMoviesGenres()
    if (result.code) {
        setError(true)
        setLoading(false)
        return
      }
    setGenres(genres)
    return
  }

  const fetchFirstPage = async () => {
      setLoading(true)
      setPageIndex(1)
      const { results, ...result } = await getPopularMovies(pageIndex)
      if (result.code) {
        setError(true)
        setLoading(false)
        return
      }
      setPopularMovies(results)      
      setLoading(false) 
      return
    }
    
  const fetchNextPage = async () => {
    setFetching(true)
    const nexPageIndex = pageIndex + 1
    const { results, ...result } = await getPopularMovies(nexPageIndex)
    if (result.code) {
      setError(true)
      setFetching(false)
      return
    }
    setPopularMovies(popularMovies.concat(results))
    setFetching(false)
    return
  }

  const fetchUserSearch = async (input) => {
    if (input === '') {
      setShowAllMovies(true)
      setAvailableLoadMoreMovies(true)
      return
    }
    setFetching(true)
    setUserSearchPageIndex(1)
    const { results, total_pages, ...result } = await getMoviesBySearch(input, userSearchPageIndex)
    if (result.code) {
      setError(true)
      setFetching(false)
      return
    }
    if (userSearchPageIndex >= total_pages) {
      setAvailableLoadMoreMovies(false)
    }
    setFilteredMovies(resolveMoviesByRating(results, rating))
    setFetching(false)
    setShowRatingMovies(false)
    setShowAllMovies(false)
    return
  }

  const fetchUserSearchNextPage = async () => {
    setFetching(true)
    const nexPageIndex = userSearchPageIndex + 1
    const { results, total_pages, ...result } = await getMoviesBySearch(userInput, nexPageIndex)
    if (result.code) {
      setError(true)
      setFetching(false)
      return
    }
    if (userSearchPageIndex >= total_pages) {
      setAvailableLoadMoreMovies(false)
    }
    setFilteredMovies(filteredMovies.concat(resolveMoviesByRating(results, rating)))
    setFetching(false)
    return
  }
  
  const fetchMoviesByRating = async (rating) => {
    setLoading(true)
    setRatingPageIndex(1)
    const { results, ...result } = await getMoviesByRating(rating, ratingPageIndex)
      if (result.code) {
        setError(true)
        setLoading(false)
        return
      }
    setRatingMovies(results)
    setShowAllMovies(false)
    setShowRatingMovies(true)
    setLoading(false) 
    return
  }

  useEffect(() => {
    fetchFirstPage(),
    getGenres()
  },[])

  const handleOnPressMovie = (movie) => {
    setSelectedMovie(movie)
    setModalVisible(!modalVisible)
    setSelectedMovieGenres(resolveGenres(movie.genre_ids, genres))
  }

  const renderCustomModal = () => {
    return (
      <CustomModal
        movie={selectedMovie}
        genres={selectedMovieGenres}
        showModal={modalVisible}
        onClose={() => setModalVisible(!modalVisible)} />
    )
  }

  
  const onQueryChanged = (input) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      fetchUserSearch(input)
      setUserInput(input)
      }, 350) 
  }

  const ratingCompleted = (rating) => {
    setRating(rating)
    fetchMoviesByRating(rating)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <SearchBar onChangeText={onQueryChanged} />
      <Rating
        showRating
        ratingCount={10}
        imageSize={25}
        fractions={2}
        onFinishRating={ratingCompleted}
        style={{ paddingVertical: 10 }}
        ratingTextColor={'black'}
      />
      <FlatList
        data={showAllMovies ? popularMovies : showRatingMovies ? ratingMovies : filteredMovies}
        keyExtractor={(item, index) => index}
        numColumns={2}
        renderItem={(({ item, index }) => (
          <MovieCard movie={item} index={index} onPress={() => handleOnPressMovie(item)} />
        ))}
        initialNumToRender={30}
        refreshing={fetching || loading}
        onRefresh={fetchFirstPage}
        style={styles.flatList}
        ListFooterComponent={availableLoadMoreMovies && <FooterList onPress={showAllMovies ? fetchNextPage : fetchUserSearchNextPage} />}
      />
      {modalVisible && renderCustomModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    alignSelf: 'center',
    marginTop: '2%',
    width: '100%',
  },
});