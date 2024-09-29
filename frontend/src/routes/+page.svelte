<script lang="ts">
	import {
		SocialMediaList,
		WorkExperienceItem,
		EducationItem,
		KeywordList,
		Languages,
		Certifications
	} from '$lib';
	const src = 'path/to/your/image.jpg';
</script>

<main>
	<section>
		<div>
			<img {src} alt="Nicolas Matute" />
			<div>
				<h1>Nicolas Matute</h1>
				<SocialMediaList />
				<button>Contact Me</button>
			</div>
		</div>
	</section>

	<section>
		<h2>Work Experience</h2>
		<WorkExperienceItem />
	</section>

	<section>
		<h2>Education</h2>
		<EducationItem />
	</section>

	<section>
		<h2>Tools - Skills</h2>
		<KeywordList />
	</section>

	<section>
		<h2>Languages</h2>
		<Languages />
	</section>

	<section>
		<h2>Certifications</h2>
		<Certifications />
	</section>
</main>
