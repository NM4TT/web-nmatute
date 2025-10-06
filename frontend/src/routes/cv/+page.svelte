<script lang="ts">
    export let data;
    import Icon from "@iconify/svelte";
    import {
        ContactButton,
        MobileSection,
        SocialMedia
    } from '$common/components/index.js';
    import MAIN_PIC from '$lib/assets/images/main_pic.jpg';
    import { ICON_COLOR, SOCIAL_MEDIA_LIST } from '$lib/constants/index.js';
	import type { EducationItemType, WorkExperienceItemType } from '$lib/types/index.js';
    import { Keywords, EducationItem, WorkExperienceItem, Certifications } from './components/index.js';

    const { 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [] 
    }: { 
        experience?: WorkExperienceItemType[]; 
        education?: EducationItemType[]; 
        skills?: string[]; 
        languages?: string[]; 
    } = data || {};
</script>

<svelte:head>
    <title>Nicolas Resume</title> 
</svelte:head>

<main id="curriculum" class="pt-10">
    <section id="first" class="mt-5">
        <div
            id="desktop-first-look"
            class="hidden md:flex justify-center space-x-24"
        >
            <div class="w-1/2 flex justify-end">
                <img src={MAIN_PIC} 
                    alt="Nicolas Matute" class="h-auto w-3/4  rounded-sm" />
            </div>
            <div class="w-1/2 flex flex-col justify-center items-center">
                <div class="flex flex-col justify-center items-center">
                    <h1 class="font-bold mb-4 md:text-4xl lg:text-5xl xl:text-6xl">
                        Nicolas Matute
                    </h1>
                    <h2 class="font-medium mb-4 text-2xl lg:text-3xl xl:text-4xl">
                        Resume
                    </h2>
                </div>
                <div>
                    <ul class="list-none flex items-center py-2">
                        {#each SOCIAL_MEDIA_LIST as socialMedia}
                            <li class="text-3xl xl:text-4xl px-2">
                                <SocialMedia data={socialMedia} />
                            </li>
                        {/each}
                    </ul>
                </div>
                <ul class="list-none flex flex-col py-5">
                    <li class="flex items-center py-2">
                        <Icon icon="mdi:check-bold" color={ICON_COLOR} />
                        <span class="ml-2">Professional Experience</span>
                    </li>
                    <li class="flex items-center py-2">
                        <Icon icon="mdi:check-bold" color={ICON_COLOR} />
                        <span class="ml-2">Education, Certifications</span>
                    </li>
                    <li class="flex items-center py-2">
                        <Icon icon="mdi:check-bold" color={ICON_COLOR} />
                        <span class="ml-2">Tools, Skills and Languages</span>
                    </li>
                </ul>
                <ContactButton />
            </div>
        </div>
        <MobileSection title="Resume" />
    </section>

    <section class="cv-section mt-20 pt-10 flex flex-col">
        <h2 
            class="font-bold mb-10 text-2xl
            text-center self-center
            border-b-2 border-secondary
            md:text-3xl lg:text-4xl xl:text-5xl"
        >Who I Am</h2>
        <div class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32">
            <p>
                I am a resilient person who learns quickly and enjoys technology. 
                Over the past few years, I have had the opportunity to develop software 
                solutions for multiple industries. I specialize in web development, 
                software architecture, and DevOps. While I may not know the vast 
                majority of programming languages or tools, I am always willing to learn 
                whatever is necessary to achieve my goals.
            </p>
        </div>
    </section>

    <section class="cv-section mt-20 pt-10 flex flex-col">
        <h2 
            class="font-bold mb-10 text-2xl
            text-center self-center
            border-b-2 border-secondary
            md:text-3xl lg:text-4xl xl:text-5xl"
        >Work Experience</h2>
        <div class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32">
            {#each experience as item}
                <WorkExperienceItem data={item} />
            {/each}
        </div>          
    </section>

    <section class="cv-section mt-20 pt-10 flex flex-col">
        <h2 
            class="font-bold mb-10 text-2xl
            text-center self-center
            border-b-2 border-secondary
            md:text-3xl lg:text-4xl xl:text-5xl"
        >Education</h2>
        <div class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32">
            {#each education as item}
                <EducationItem data={item} />
            {/each}
        </div>
    </section>

    <section class="cv-section mt-20 pt-10 flex flex-col">
        <h2 
            class="font-bold mb-10 text-2xl
            text-center self-center
            border-b-2 border-secondary
            md:text-3xl lg:text-4xl xl:text-5xl"
        >Certifications</h2>
        <div class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32">
            <Certifications />
        </div>
    </section>

    <section class="cv-section mt-20 pt-10 flex flex-col">
        <h2 
            class="font-bold mb-10 text-2xl
            text-center self-center
            border-b-2 border-secondary
            md:text-3xl lg:text-4xl xl:text-5xl"
        >Tools & Skills</h2>
        <div class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32">
            <Keywords data={skills} />
        </div>
    </section>

    <section class="cv-section mt-20 pt-10 flex flex-col pb-10">
        <h2 
            class="font-bold mb-10 text-2xl
            text-center self-center
            border-b-2 border-secondary
            md:text-3xl lg:text-4xl xl:text-5xl"
        >Languages</h2>
        <div class="content mx-4 md:mx-16 lg:mx-24 xl:mx-32">
            <ul class="font-medium">
                {#each languages as item}
                    <li class="my-3">{item}</li>
                {/each}
            </ul>
        </div>
    </section>
</main>