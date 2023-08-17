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
            async getImdbIndo(movie){
                movie.loadingDetails = true;
                const detalhes = await this.movieFetcher.getMovieDetails(movie.id);
                console.log(detalhes)
                if(detalhes){
                    movie.loadingDetails = false;
                    const imdbUrl = `https://www.imdb.com/title/${detalhes.imdb_id}`;
                    window.open(imdbUrl, '_blank');
                }
            },
            saveWatchList(){
                const watchlist = JSON.stringify(this.favoritesList);
                localStorage.setItem('watchlist', watchlist);
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

    <section class="text-center">
        <ul>
            <li v-for="favorito in favoritesList" :key="favorito.id" class="p-2 flex justify-between">
                <button @click="removeFavorite(favorito)" class="px-2 text-red-500 font-bold">x</button>
                <span class="px-2">{{ favorito.title }}</span>
                <span>
                    <button @click="getImdbIndo(favorito)" class="px-2 bg-yellow-300 font-bold rounded-lg">
                        <template v-if="favorito.loadingDetails">
                            <span>Carregando...</span>
                        </template>
                        <template v-else>
                            IMDB
                        </template>
                    </button>
                </span>
            </li>
        </ul>
        <template v-if="favoritesList.length > 0">
            <button @click="saveWatchList" class="px-2 bg-green-300 font-bold rounded-lg">Salvar</button>
        </template>
    </section>

</template>