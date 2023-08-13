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
            this.favoritesList.push(movie);
            console.log(this.favoritesList);
        },
    },
}

</script>

<template>

    <section>
        <MoviesBase @add-favorite="addFavorite"/>
        <FavoritesList :favoritesList="favoritesList"/>
    </section>

</template>