export default class MovieFetcher{

    constructor(){
        this.movieList = null;
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
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&page=2&page=3', options);
        const data = await response.json();
        this.movieList = data.results;
        return this.movieList;
    }
}

