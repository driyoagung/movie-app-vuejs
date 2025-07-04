<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <Card>
    <div class="flex flex-col h-full">
      <img 
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
        :alt="movie.title"
        class="w-full h-64 object-cover rounded-t-lg"
      />
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="font-semibold text-lg">{{ movie.title }}</h3>
        <p class="text-sm text-gray-500 mt-1">
          {{ new Date(movie.release_date).getFullYear() }}
        </p>
        <p class="text-sm mt-2 line-clamp-2">{{ movie.overview }}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm font-medium">
            Rating: {{ movie.vote_average.toFixed(1) }}/10
          </span>
        </div>
      </div>
    </div>
  </Card>
</template>