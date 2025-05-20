<script setup>
const features = [
  'Intuitive Kanban boards',
  'Real-time synchronization',
  'Custom workflows',
  'Advanced task tracking',
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div class="container max-w-[800px] mx-auto text-center space-y-10 pt-28">
        <div class="space-y-10">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Organize your work,
            <br />
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-500/60">
              One task at a time
            </span>
          </h1>
          <p class="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Goes beyond basic to-do lists, offering intuitive tools for
            prioritizing and managing projects and tasks with ease.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/auth/signup" class="btn btn-sky-500 px-5 py-2 text-white bg-sky-500 rounded-md text-base flex items-center gap-2 justify-center">
            Get Started
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/auth/signin" class="btn btn-outline px-5 py-2 border border-sky-500 text-sky-500 rounded-md text-base text-center">
            Sign in
          </a>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 pt-4 max-w-[600px] mx-auto">
            <div v-for="feature in features" :key="feature" class="flex items-center gap-2">
                <svg class="h-5 w-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <span class="text-muted-foreground">{{ feature }}</span>
            </div>
            </div>
    </div>

    <div class="fixed inset-0 -z-10 h-full w-full bg-background">
      <div class="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-sky-500/5 to-background"></div>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="h-[40rem] w-[40rem] rounded-full bg-sky-500/5 blur-3xl"></div>
      </div>
    </div>
  </div>
</template>
