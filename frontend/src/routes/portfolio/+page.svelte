<script lang="ts">
  import { MobileSection} from '$common/components';
  import ProjectItem from './components/ProjectItem.svelte';
  import { getContent } from '$lib/server/api';
  import { formatProjects } from '$lib/utils';
  const projects = formatProjects((await getContent("projects", ["name", "url"])))
</script>

<main id="portfolio" class="pt-10">
    <section id="first" class="mt-5">
      <div 
        id="desktop-first-look"
        class="hidden md:flex justify-center space-x-24"
      >
        <h1
          class="font-bold text-center self-center
          mb-4 md:text-4xl lg:text-5xl xl:text-6xl">
          Portfolio
        </h1>
      </div>
      <MobileSection title="Portfolio" />
      <div class="content my-4 mx-4 md:mx-16 lg:mx-24 xl:mx-32">
        <p class="mx-4 md:mx-16 lg:mx-24 xl:mx-32">
          Welcome to my portfolio 💼. On this page, you will find the projects 
          I have done so far; these projects are not limited solely to programming. 
          You can learn more about each one by clicking on it, 
          which will direct you to a page with more information.
        </p>
      </div>
    </section>

    <section class="portfolio-section mt-15 pt-10 flex flex-col">
      <div 
        class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-y-16 text-center">
        {
          projects.map(item => <ProjectItem data={item} />)
        }
      </div>
    </section>
</main>