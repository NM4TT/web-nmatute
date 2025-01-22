<script lang="ts">
    import {
            MobileSection
        } from '$common/components';
    import PLACA_JARC from '$lib/assets/images/placa_jarc.jpg';
    import INDRA_PIC from '$lib/assets/images/indra_selfie.jpg';
    import RECENT_PIC from '$lib/assets/images/recent_pic.jpg';
    import CLOSE_PIC from '$lib/assets/images/close_pic.jpg'
</script>

<svelte:head>
    <title>Biography</title> 
</svelte:head>

<main 
        id="biography" 
        class="pt-10 prose lg:prose-xl mx-auto max-w-6xl w-3/4"
>
    <section id="first">
        <div
            id="desktop-first-look"
            class="hidden lg:flex justify-center space-x-24 rounded"
        >
            <div class="w-1/2 flex flex-col justify-center items-center">
                <h1 class="font-bold md:text-3xl lg:text-4xl xl:text-5xl">
                    Personal Biography
                </h1>
                <p class="w-3/4 mx-4 md:mx-16 lg:mx-24 xl:mx-32">
                    Nice to meet you 😉! I'm Nicolás, and on this page, 
                    you'll get to know a bit of my story (written by me), 
                    which will give you some insights into who I am today. 
                    If you'd like to explore more specific topics like my professional experience 
                    or education, I invite you to take a look at my 
                    <a href="/" class="text-secondary font-medium">résumé</a>. 
                    But if you'd like to know more personal details about me, 
                    feel free to keep reading this page.
                </p>
            </div>
            <div class="w-1/2 flex justify-end">
                <img src={CLOSE_PIC}
                    alt="Nicolas Matute" class="h-auto w-3/4" />
            </div>
        </div>
        <MobileSection title="Personal Biography" />
    </section>

    <section class="bio-section">
        <h2>Early Life</h2>
        <p>
            Manuel Nicolás Matute Zapata was born in Venezuela in the early 2000s. From a young age, he showed remarkable 
            Nicolás was born in Venezuela in the early 2000s. From a young age, he developed a love for computing and had 
            big dreams of leading a major company specializing in robotic assistants (though he admits these were "wild ideas"). 
            As he grew older, he began to appreciate the power of learning—particularly the importance of studying things 
            that truly interested him. During his adolescence, he realized he wasn’t a “genius” and might not be able to 
            solve complex mathematical problems or find the cure for cancer. However, he learned that through discipline 
            and hard work, he could still achieve remarkable things. This realization led him to embrace self-learning.
        </p>
        <p>
            Thanks to self-learning and the internet, Nicolás significantly improved his academic performance, earning the 
            top honor in his high school, graduating with a degree in Computer Science.
        </p>
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src={PLACA_JARC} alt="My image">
        
        <h2>Career</h2>
        <p>
            After finishing high school, he began to wonder, as many do at that age, what to do with his life. Fortunately, 
            he already knew: he wanted to become a programmer. He started studying Java, the programming language that 
            caught his attention the most, following tutorials on YouTube. Nicolás enrolled in the Universidad Tecnológica 
            de Panamá to pursue a degree in Software Development, attending until 2022. During that time, he had the chance 
            to teach computer science to elementary school students at Colegio Real de Panamá, where he gained valuable 
            experience, even though teaching had never been his primary goal.
        </p>
        <p>
            One of the most important career opportunities he encountered came when he landed a job as a programmer for 
            Indra in Panama (a Spanish-based company). He worked there for a year and a half, gaining practical experience 
            with modern software development practices, often from the comfort of his home due to the remote nature of the job. 
            Yet, even as a professional programmer, Nicolás wasn’t satisfied and continued learning new programming languages 
            and tools on his own, particularly focusing on improving his English.
        </p>
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src={INDRA_PIC} alt="My image">
        
        <h2>Today</h2>
        <p>
            His hard work paid off when an even more exciting opportunity arose: a remote programming position with a 
            U.S.-based company. Although the prospect of working in English, a language he had never spoken regularly, 
            was intimidating, Nicolás decided to go for it. He completed three interviews and secured the job, where he now 
            continues to learn and work in a new language.
        </p>
        <p>
            Nicolás feels incredibly grateful for both the successes and challenges he has encountered, for the support from 
            his family, for the people he met, and for all the experiences that have shaped him. He looks forward to continuing 
            to grow and explore new opportunities in the future.
        </p>
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src={RECENT_PIC} alt="My image">
    </section>
</main>