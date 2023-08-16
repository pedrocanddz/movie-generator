export default class MovieFetcher{

    constructor(){
        this.movieList = null;
        this.genero = [];
        this.api_key = import.meta.env.VITE_API_KEY;
    }

    async getMovies(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${this.api_key}`
            }
        };
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1', options);
        const data = await response.json();
        this.movieList = data.results;
        return this.movieList;
    }
    async getGenres(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${this.api_key}`
            }
        };
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=pt', options);
        const data = await response.json();
        this.genero = data.genres;
        return this.genero;
    }

    async getMorePages(){
        const options = {
            method: 'GET',
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${this.api_key}`
            }
        };
        let [page1, page2, page3,page4, page5] = await Promise.all([
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1', options),
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=2', options),
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=3', options),  
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=4', options),
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=5', options)
        ]);
        let [data1, data2, data3, data4, data5] = await Promise.all([
            page1.json(),
            page2.json(),
            page3.json(),
            page4.json(),
            page5.json()
        ]);
        this.movieList = data1.results.concat(data2.results, data3.results, data4.results, data5.results);    
        return this.movieList;
    }
    
    async getMovieDetails(movieId){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${this.api_key}`
            }
        };
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, options);
        const data = await response.json();
        return data;
    }
}

