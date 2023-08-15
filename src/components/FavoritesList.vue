<script>
    export default{
        props:{
            favoritesList:{
                type: Array,
                required: true,
            }
        },
        methods:{
            removeFavorite(movie){
                this.$emit('remove-favorite', movie);
            }
        }
    }
</script>

<template>

    <section>
        <ul>
            <li v-for="favorito in favoritesList" :key="favorito.id" class="p-2">
                <button @click="removeFavorite(favorito)" class="px-2 text-red-500 font-bold">x</button>
                {{ favorito.title }}
            </li>
        </ul>
    </section>

</template>