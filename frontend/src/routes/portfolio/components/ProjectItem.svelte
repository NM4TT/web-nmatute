<script lang="ts">
export let data: Object = {
    name: "Super Cool Project",
    tags: "Amazing STACK",
    url: "https://www.example.com"
};
</script>

<article 
  class="text-white w-3/4
  bg-secondary rounded py-3
  max-w-sm mx-auto relative group">
  <a href={data.url} target="_blank" rel="noopener noreferrer" class="block">
    <header class="mb-3 text-center"> <!-- Center the header -->
      <h3 
        class="font-medium inline-block relative px-3 after:content-[''] after:absolute 
        after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white
        after:transition-all after:duration-300 
        group-hover:after:left-0 group-hover:after:w-full">
        {data.name}
      </h3>
    </header>
    <p class="text-center">{data.tags}</p> <!-- Center the tags -->
  </a>
</article>