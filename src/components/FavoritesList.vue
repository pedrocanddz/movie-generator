<script>
    import  MovieFetcher from '@/assets/MovieFetcher.js';
    export default{
        props:{
            favoritesList:{
                type: Array,
                required: true,
            },
        },
        methods:{
            removeFavorite(movie){
                this.$emit('remove-favorite', movie);
            },
            async fetchMovieDetails(movieId){
                this.loadingDetails = true;
                const detalhes = await this.movieFetcher.getMovieDetails(movieId);
                console.log(detalhes)
                if(detalhes){
                    this.loadingDetails = false;
                    const imdbUrl = `https://www.imdb.com/title/${detalhes.imdb_id}`;
                    window.open(imdbUrl, '_blank');
                }
            }
        },
        data(){
            return{
                movieFetcher: new MovieFetcher(),
                loadingDetails: false,
            }
        }
    }
</script>

<template>

    <section>
        <ul>
            <li v-for="favorito in favoritesList" :key="favorito.id" class="p-2">
                <button @click="removeFavorite(favorito)" class="px-2 text-red-500 font-bold">x</button>
                <span class="px-2">{{ favorito.title }}</span>
                <span>
                    <button @click="fetchMovieDetails(favorito.id)" class="px-2 bg-yellow-300 font-bold rounded-lg">
                        <template v-if="loadingDetails">
                            <span>Carregando...</span>
                        </template>
                        <template v-else>
                            <span>IMDB</span>
                        </template>
                    </button>
                </span>
            </li>
        </ul>
    </section>

</template>