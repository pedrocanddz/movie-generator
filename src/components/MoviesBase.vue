<script>
import  MovieFetcher from '@/assets/MovieFetcher.js';

export default{
    data(){
        return{
            moviesList: [],
            generos: [],
            movieFetcher: new MovieFetcher(),
            numero: 0,
            favoritesList:[],
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
        },
        addFavorite(){
            this.favoritesList.push(this.moviesList[this.numero]);
            console.log(this.favoritesList);
        }
    },
    async created(){
            this.moviesList = await this.movieFetcher.getMorePages();
            this.numero = this.getRandomInt(this.moviesList.length);
            this.generos = await this.movieFetcher.getGenres();
    },
}
</script>

<template>
    <section class="displayMovie container m-auto">
        <div v-if="moviesList.length > 0" class="w-[70%] min-h-[70%]  flex flex-col justify-center items-center align-center m-auto">
            <h1 class="text-3xl">Movies</h1>
            <div class="text-center">
                <h2 class="py-2 text-4xl" v-if="moviesList[numero].original_language == 'pt' &&
                        moviesList[numero].original_language == 'en' ">
                    {{ moviesList[numero].original_title }}
                </h2>
                <h2 class="py-2 text-4xl" v-else>
                    {{ moviesList[numero].title }}
                </h2>
                <div>
                    <span class="px-2 bg-sky-200 rounded-md mx-1" v-for="genero, id in getGeneros(moviesList[numero].genre_ids)" :key="id">
                        <span v-if="genero">
                            {{genero.name}}
                        </span>
                    </span>
                </div>
                <div class="p-5">
                    <img  class="m-auto rounded-md" :src="`https://image.tmdb.org/t/p/w300${moviesList[numero].poster_path}`" alt="poster do filme">
                </div>
                <div class="bg-sky-200 rounded-md min-h-[200px] pt-3">
                    <p >
                        {{ moviesList[numero].overview }}
                    
                    </p>
                </div>
            </div>
            <p class="py-3">Nota : {{ moviesList[numero].vote_average }}</p>
            <div>
                <button class="bg-sky-200 p-2 rounded-md hover:bg-sky-500 hover:drop-shadow-lg mx-2" @click="changeNumber">Gerar Outro</button>
                <button class="bg-sky-200 p-2 rounded-md hover:bg-sky-500 hover:drop-shadow-lg" @click="addFavorite">Add to watchlist</button>
            </div>
        
        </div>
        <div v-else>Loading</div>
    </section>
</template>