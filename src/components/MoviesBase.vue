<script>
import  MovieFetcher from '@/assets/MovieFetcher.js';

export default{
    data(){
        return{
            moviesList: [],
            numero: 0,
        }
    },
    methods:{
        //function that return a random number between 0 and a length passed as parameter
        getRandomInt(length){
            return Math.floor(Math.random() * length);
        },
        changeNumber(){
            this.numero = this.getRandomInt(this.moviesList.length);
        }
    },
    async created(){
            console.log('created');
            const movieFetcher = new MovieFetcher();
            this.moviesList = await movieFetcher.getMovies();
            console.log(this.moviesList);
            this.numero = this.getRandomInt(this.moviesList.length);
    },
}
</script>

<template>
    <section class="displayMovie">
        <div v-if="moviesList.length > 0">
            <h1>Movie List</h1>
            <div>
                <h2 v-if="moviesList[0].original_language == 'pt' &&
                        moviesList[0].original_language == 'en' ">
                    {{ moviesList[0].original_title }}
                </h2>
                <h2 v-else>
                    {{ moviesList[0].title }}
                </h2>
                <img :src="`https://image.tmdb.org/t/p/w300${moviesList[0].poster_path}`" alt="poster do filme">
                <p>
                    {{ moviesList[0].overview }}
                </p>
            </div>
            <p>Nota : {{ moviesList[0].vote_average }}</p>
        </div>
        <div v-else>Loading</div>
        <div>{{ numero }}</div>
        <button @click="changeNumber"></button>
    </section>
</template>