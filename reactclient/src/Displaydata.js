import React, { useState } from 'react'
import { useQuery, useLazyQuery, gql } from '@apollo/client'

const QUERY_ALL_USERS = gql`
 query Query {
   users {
   age 
   nationality 
   username 
   id 
   }
}`



const QUERY_ALL_MOVIES = gql`
query GetALlMovies{
    movies{
        name age  username
    }
}`

const GET_MOVIES_BY_NAME = gql`


query Query($movieId: ID) {
Movie(id: $movieId) {
  release_date id genres title poster
}
}
`

const Displaydata = () => {
    const [moviesearch, setmoviesearch] = useState("");
    //function name , object name:where data will be fetching, error = schema   
    const [fetchMovie, { data: moviesearchData, error: movieError },] = useLazyQuery(GET_MOVIES_BY_NAME);
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const SearchMoviesByIdTemplate = () => {
        if (moviesearchData && moviesearchData.Movie !== null) {
            return (
                <>
                    {/* fetch movies list */}
                    <h1>MoviesName: {moviesearchData && moviesearchData.Movie.title}</h1>
                    <h1>Moviesgenres: {moviesearchData && moviesearchData.Movie.genres}</h1>
                    <h1>Moviesrelease_date: {moviesearchData && moviesearchData.Movie.release_date}</h1>
                    <h1>MovieThumnail : <img src={moviesearchData && moviesearchData.Movie.poster}
                        alt="Girl in a jacket" width="250" height="300" /></h1>
                </>
            )
        }
        else {
            return <div>{movieError}</div>
        }
    }
    const printdata = () => {
        if (loading) {
            return (<div>...loading...</div>)

        }
        else if (data) {
            return data.users.map((user) =>
                <>
                    <li key={user.id}>User name :{user.id}</li>
                    <li key={user.age}>User age :{user.age}</li>
                    <li key={user.nationality}>User nationality :{user.nationality}</li>
                    <li key={user.username}>User username :{user.username}</li>
                </>
            );

        }
        else if (error) {
            console.log('error found')
            return (<div>Error occured</div>)
        }

        if (movieError) {
            console.log(movieError);;
        }
    }
    return (
        <div>
            {printdata()}
            <input type="text" onChange={(event) => { setmoviesearch(event.target.value) }}
                placeholder=" Insaller" />
            {/* //created a varible in fetchMovie lazy type function */}
            <button onClick={() => {
                fetchMovie({
                    variables: {
                        movieId: moviesearch,
                    }
                })
            }}>fetch data</button>

            {SearchMoviesByIdTemplate()}
        </div>
    );
}
export default Displaydata