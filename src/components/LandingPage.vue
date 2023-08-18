<script>
import MoviesBase from './MoviesBase.vue';
import FavoritesList from './FavoritesList.vue';

export default{
    components:{
        MoviesBase,
        FavoritesList
    },
    data(){
        return{
            favoritesList:[],
        }
    },
    methods:{
        addFavorite(movie){
            if(this.favoritesList.find((item) => item.id === movie.id)){
                return;
            }
            this.favoritesList.push(movie);
            console.log(this.favoritesList);
        },
        removeFavorite(movie){
            this.favoritesList = this.favoritesList.filter((item) => item.id !== movie.id);
            
        },
        clearWatchList(){
            this.favoritesList = [];
        },
    },
    created(){
        const watchlist = localStorage.getItem('watchlist');
        if(watchlist){
            this.favoritesList = JSON.parse(watchlist);
        }
    },
}

</script>

<template>

    <section class="flex justify-center">
        <MoviesBase @add-favorite="addFavorite"/>
        <FavoritesList @remove-favorite="removeFavorite" @clear-watchlist="clearWatchList" :favoritesList="favoritesList"/>
    </section>

</template>