<script lang="ts">
	import { Languages } from 'lucide-svelte';

	let { image }: { image: any } = $props();

	const slugs = $derived.by(() => {
		const slugs: string[] = Object.values(image.alternative_slugs);
		const id = image.id;
		return slugs.map((slug) => {
			const noID = slug.replace(id, '');
			return noID.substring(0, noID.length - 1);
		});
	});
	let slugIndex = $state(0);
	const user = $derived<{ name: string; portfolio_url: string }>(image?.user);
	const exif = $derived<{
		exposure_time: string;
		aperture: string;
		focal_length: string;
		iso: number;
	}>({
		exposure_time: image?.exif.exposure_time ?? '--',
		aperture: image?.exif.aperture ?? '--',
		focal_length: image?.exif.focal_length ?? '--',
		iso: image?.exif.iso ?? '--'
	});
	const details = $derived({
		photo: user.name || 'Unknown',
		...exif
	});

	let showDescription = $state(false);
	function toggleDescription() {
		showDescription = !showDescription;
	}
	function incrementSlug(e: any) {
		e.stopPropagation();
		if (slugIndex < slugs.length - 1) {
			slugIndex++;
		} else {
			slugIndex = 0;
		}
	}
</script>

<div class="container">
  <button class="icon-btn" onclick={(e) => incrementSlug(e)}>
    <Languages />
  </button>
	<div class="exif">
		{#each Object.entries(details) as [label, value] (label)}
			<div class="item">
				<span class="label">{label}:</span>
				<span class="value">{value}</span>
			</div>
		{/each}
	</div>

	<div class="description">
		<span class="value">
			{slugs[slugIndex] || slugs[0]}
		</span>
	</div>

	<slot />
</div>

<style>
	.container {
		position: fixed;
		font-size: 0.5rem;
		width: 100%;
		top: 0;
		left: 0;
		padding: 0.25rem;
		color: #fafbfc;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 0.75rem;
	}
	.exif {
		text-transform: uppercase;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: row wrap;
		gap: 0.25rem 1rem;
	}

  .description {
    padding: 0 2rem;
  }

	.label {
		font-weight: 600;
	}

  .icon-btn {
    position: absolute;
    right: 0.25rem;
    top: 2.25rem;
  }
</style>
