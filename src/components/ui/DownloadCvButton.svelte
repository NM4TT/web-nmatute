<script lang="ts">
    let { 
        lang = "en", 
        text = lang === "es" ? "Descargar CV" : "Download CV" 
    } = $props<{ 
        lang?: string; 
        text?: string; 
    }>();

    const pdfUrl = `/cv/cv-${lang}.pdf`;
    const filename = "Nicolas_Matute_CV.pdf";
</script>

<a 
    href={pdfUrl}
    download={filename}
    target="_blank"
    rel="noopener noreferrer"
    class="btn-secondary"
>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="w-4 h-4 shrink-0" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
    <span>{text}</span>
</a>
