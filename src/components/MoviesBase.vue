<script>
import  MovieFetcher from '@/assets/MovieFetcher.js';

export default{
    data(){
        return{
            moviesList: [],
            generos: [],
            movieFetcher: new MovieFetcher(),
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
        },
        getGeneros(generos){
            return generos.map((genero) => {
                return this.generos.find((item) => item.id === genero);
            });
        }
    },
    async created(){
            this.moviesList = await this.movieFetcher.getMorePages();
            this.numero = this.getRandomInt(this.moviesList.length);
            this.generos = await this.movieFetcher.getGenres();
            console.log(this.moviesList)
    },
}
</script>

<template>
    <section class="displayMovie container">
        <div v-if="moviesList.length > 0">
            <h1>Movie List</h1>
            <div>
                <h2 v-if="moviesList[numero].original_language == 'pt' &&
                        moviesList[numero].original_language == 'en' ">
                    {{ moviesList[numero].original_title }}
                </h2>
                <h2 v-else>
                    {{ moviesList[numero].title }}
                </h2>
                <p v-for="genero, id in getGeneros(moviesList[numero].genre_ids)" :key="id">
                    {{genero.name}}
                </p>
                <img :src="`https://image.tmdb.org/t/p/w300${moviesList[numero].poster_path}`" alt="poster do filme">
                <p>
                    {{ moviesList[numero].overview }}
                </p>
            </div>
            <p>Nota : {{ moviesList[numero].vote_average }}</p>
        </div>
        <div v-else>Loading</div>
        <button @click="changeNumber">Gerar Outro</button>
    </section>
</template>