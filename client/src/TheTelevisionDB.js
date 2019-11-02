import Axios from 'axios';

class TelevisionDB { 
    constructor() {
        super()  

        const movieDBToken = "ecd59a5f85cfccbda40237e12c056bc8";
    }  

    getShowInformation = (tvID) => { 
        try { 
            let response = await Axios.get(`
            https://api.themoviedb.org/3/tv/${tvID}?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US`)
        } 
        catch (error) { 
            console.log(error);
        }
    }

    getShowRecommendations = (tvID, pageNumber) => { 
        try { 
            let response = await Axios.get(`
            https://api.themoviedb.org/3/tv/{${tvID}}/recommendations?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}`)
        } 
        catch (error) { 
            console.log(error);
        }
    } 

    getNewlyCreatedTV = () => { 
        try { 
            let response = await Axios.get(`
            https://api.themoviedb.org/3/tv/latest?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US`)
        } 
        catch (error) { 
            console.log(error);
        }
    } 

    getPopularTV = (pageNumber) => {
        try { 
            let response = await Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}
           `)
        } 
        catch (error) { 
            console.log(error);
        }
    }

    getTopRated = (pageNumber) => { 
        try { 
            let response = await Axios.get(`
            https://api.themoviedb.org/3/tv/top_rated?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&page=${pageNumber}
           `)
        } 
        catch (error) { 
            console.log(error);
        }
    }

    getKeywordsAssociatedWithShow = (tvID) => { 
        try { 
            let response = await Axios.get(`
            https://api.themoviedb.org/3/tv/{${tvID}}/keywords?api_key=ecd59a5f85cfccbda40237e12c056bc8
           `)
        } 
        catch (error) { 
            console.log(error);
        }
    } 

    findTVShowBasedOnKeyword = (keyword, pageNumber) => { 
        try { 
            let response = await Axios.get(`
            https://api.themoviedb.org/3/search/tv?api_key=ecd59a5f85cfccbda40237e12c056bc8&language=en-US&query=${keyword}&page=${pageNumber}
           `)
        } 
        catch (error) { 
            console.log(error);
        }
    }
} 

export default TelevisionDB;
