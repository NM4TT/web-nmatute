<script lang="ts">
import { imagePlaceholder } from '$lib/utils'
</script>

<div>
    <ul>
        <li>
            <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
            >
                <img src={ imagePlaceholder(56) } alt="Placeholder" />
                Twitter
            </a>
        </li>
        <li>
            <a
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
            >
                <img src={ imagePlaceholder(56) } alt="Placeholder" />
                GitHub
            </a>
        </li>
        <li>
            <a
                href="https://linkedin.com/in/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
            >
                <img src={ imagePlaceholder(56) } alt="Placeholder" />
                LinkedIn
            </a>
        </li>
    </ul>
</div>