export function resolveGenres(movie_genre_ids, genres) {
    const filteredGenres = genres.filter(genre => movie_genre_ids.includes(genre.id))
    return filteredGenres
} 

export function resolveMoviesByRating(movies, rating) {
    const filteredRatingMovies = movies.filter(movie => movie.vote_average >= rating)
    return filteredRatingMovies
}