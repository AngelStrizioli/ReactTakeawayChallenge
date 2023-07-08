import { API_STRINGS } from "../constants/strings";
import { handleFetch } from "../services/fetch";

export function getPopularMovies(pageIndex){
    return handleFetch(`/movie/popular?api_key=${API_STRINGS.API_KEY}&page=${pageIndex}`, {
        method: 'GET',
    })
}

export function getMoviesGenres() {
    return handleFetch(`/genre/movie/list?api_key=${API_STRINGS.API_KEY}&language=${API_STRINGS.LANGUAJE}`, {
        method: 'GET',
    })
}

export function getMoviesBySearch(input, userSearchPageIndex) {
    return handleFetch(`/search/movie?language=${API_STRINGS.LANGUAJE}&query=${input}&api_key=${API_STRINGS.API_KEY}&page=${userSearchPageIndex}`, {
        method: 'GET',
    })
}

export function getMoviesByRating(ratingValue) {
    return handleFetch(`/discover/movie?sort_by=vote_average.asc&api_key=${API_STRINGS.API_KEY}&vote_average.gte=${ratingValue}`, {
        method: 'GET',
    })
}