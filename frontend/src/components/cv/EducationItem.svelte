<script lang="ts">
export let data: Object = {
    title: "Master Degree",
    name: "Technological University Of Panama (UTP)",
    start: "January 20**",
    end: "Present",
};
</script>

<article class="mb-6">
    <h3 class="font-bold text-lg md:text-1xl">{data.title}</h3>
    <p class="font-medium">{data.name}</p>
    <div class="flex justify-normal my-1">
        <p>{data.start}</p>
        <p class="ml-3">-</p>
        <p class="ml-3">{data.end}</p>
    </div>
</article>