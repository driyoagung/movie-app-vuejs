<script setup>
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationNext, PaginationPrev } from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import MovieCard from '@/components/MovieCard.vue'
import { fetchMovies } from '@/services/movieService'

const movies = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')

const fetchData = async () => {
  try {
    isLoading.value = true
    const data = await fetchMovies(currentPage.value, searchQuery.value)
    movies.value = data.results
    totalPages.value = data.total_pages > 500 ? 500 : data.total_pages // TMDB API has a limit of 500 pages
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchData()
}

const onPageChange = (page) => {
  currentPage.value = page
  fetchData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 class="text-3xl font-bold">Movie Explorer</h1>
        <div class="flex space-x-2">
          <Input 
            v-model="searchQuery" 
            placeholder="Search movies..." 
            class="w-full md:w-64"
            @keyup.enter="handleSearch"
          />
          <Button @click="handleSearch">Search</Button>
        </div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card v-for="i in 8" :key="i">
          <div class="flex flex-col h-full">
            <Skeleton class="w-full h-64 rounded-t-lg" />
            <div class="p-4 space-y-2">
              <Skeleton class="h-6 w-3/4" />
              <Skeleton class="h-4 w-1/2" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-1/4 mt-4" />
            </div>
          </div>
        </Card>
      </div>

      <div v-else-if="movies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-lg">No movies found. Try a different search.</p>
      </div>

      <div v-if="!isLoading && movies.length" class="flex justify-center mt-8">
        <Pagination>
          <PaginationFirst @click="onPageChange(1)" />
          <PaginationPrev @click="onPageChange(Math.max(1, currentPage - 1))" />
          <PaginationNext @click="onPageChange(Math.min(totalPages, currentPage + 1))" />
          <PaginationLast @click="onPageChange(totalPages)" />
        </Pagination>
      </div>
    </div>
  </div>
</template>