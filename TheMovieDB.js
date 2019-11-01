import Axios from 'axios';

class MovieDB { 
    constructor() {
        super()  

        const movieDBToken = "ecd59a5f85cfccbda40237e12c056bc8";
    } 

    getTopRatedMovies = async (pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`); 
        }
        catch (error) { 
            console.log(error);
        }
    } 

    getPopularMovies = async (pageNumber) => { 
        try { 
            let response = await Axios.get('https://api.themoviedb.org/3/movie/popular?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}'); 
        }
        catch (error) { 
            console.log(error);
        }
    } 

    getMoviesNowPlaying = (pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`); 
        }
        catch (error) { 
            console.log(error);
        }
    } 

    getMovieRecommendations = (id, pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/{${id}}/recommendations?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`); 
        }
        catch (error) { 
            console.log(error);
        }
    } 

    getKeywordsAssociatedWithMovie = (id) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/{${id}}/keywords?api_key=ecd59a5f85cfccbda40237e12c056bc8`)
        } 
        catch (error) { 
            console.log(error);
        }
    }  

    getMoviesByKeyword = (keyword) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=ecd59a5f85cfccbda40237e12c056bc8&query=${keyword}`)
        } 
        catch (error) { 
            console.log(error);
        }
    } 

    getMovieInformation = (movieID) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/{${movieID}}?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US`)
        } 
        catch (error) { 
            console.log(error);
        }
    }
} 

export default MovieDB;