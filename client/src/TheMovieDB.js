var Axios = require('axios');

class TheMovieDB { 
    getTopRatedMovies = async (pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`);  
            return response;
        }
        catch (error) { 
            console.log(error); 
            return null;
        }
    } 

    getPopularMovies = async (pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`); 
            return response; 
        }
        catch (error) { 
            console.log(error); 
            return null;
        }
    } 

    getMoviesNowPlaying = async (pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`);  
            return response;
        }
        catch (error) { 
            console.log(error); 
            return null;
        }
    } 

    getMovieRecommendations = async (id, pageNumber) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`);  
            return response;
        }
        catch (error) { 
            console.log(error); 
            return null;
        }
    } 

    getKeywordsAssociatedWithMovie = async (id) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=ecd59a5f85cfccbda40237e12c056bc8`) 
            return response;
        } 
        catch (error) { 
            console.log(error); 
            return null;
        }
    }  

    getMoviesByKeyword = async (keyword) => { 
         try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=ecd59a5f85cfccbda40237e12c056bc8&query=${keyword}`) 
            return response;
         } 
         catch (error) { 
             console.log(error); 
             return null;
         }
    
    } 

    getMovieInformation = async (movieID) => { 
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US`) 
            console.log(movieID);
            
            return response;
        } 
        catch (error) { 
            console.log(error); 
            return null;
        }
    }
}
export default TheMovieDB;

// module.exports = {
//     getTopRatedMovies,
//     getPopularMovies,
//     getMoviesNowPlaying,
//     getMovieRecommendations,
//     getKeywordsAssociatedWithMovie,
//     getMoviesByKeyword,
//     getMovieInformation
// }