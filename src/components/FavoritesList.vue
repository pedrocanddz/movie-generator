<script>
    export default{
        props:{
            favoritesList:{
                type: Array,
                required: true,
            }
        },
    }
</script>

<template>

    <section>
        <p v-for="favorito in favoritesList" :key="favorito.id">
            {{ favorito.title  }} e {{ favorito.id }}
        </p>
    </section>

</template>