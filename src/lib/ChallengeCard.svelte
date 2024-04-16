<script lang="ts">
	import { RefreshCw, X } from 'lucide-svelte';
	import { challengeConfig, removeActiveRule, shuffleActiveRule } from '$lib/state.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { decodeBlurHash } from './decode';
	import { fade } from 'svelte/transition';
	import Exif from './Exif.svelte';
	// import { fallbackImg } from './fallbackData';

	let { image, error }: { image: any, error: boolean } = $props();
	// let border = $derived(`1px solid ${image.color}`)
	let shadow = $derived(`0px 48px 100px 0px ${image.color}26;`);
	let gradientPosition = $state({
		x: 150,
		y: -150
	});
	let gradient = $derived(`
    radial-gradient(
      circle at ${gradientPosition.x}% ${gradientPosition.y}%,
      transparent, 
      #000000aa
    )
  `);
	const imgURL = $derived(image.urls.raw + '&h=600');
  let pixels = $derived(decodeBlurHash(image.blur_hash, 500, 400, 2))
  let imageLoaded = $state(false)
  let hiddenImgRef = $state<HTMLImageElement>()
	function refreshImage(){
		invalidateAll()
		.then(res => {
			imageLoaded = false
		})
		.catch(errRes => console.log("invalidateAll catch res:", errRes))
		.finally(() => {
			if (error) imageLoaded = true
		})
	}
	function handleImageLoad(){
		console.log("IMAGE LOAD!")
		imageLoaded = true
	}

  $effect(() => {
    if (hiddenImgRef && hiddenImgRef.complete) {
      imageLoaded = true;
    }
  })

  let backgroundImageValue = $derived.by(() => {
    if (imageLoaded){
      return `${gradient}, url('${imgURL}')`
    } else {
      return `none`
    }
  })

  // draw it on canvas
let canvasRef = $state<HTMLCanvasElement>();
$effect(() => {
  if (canvasRef){
    let ctx: CanvasRenderingContext2D | null = canvasRef.getContext('2d')
    const imageData = ctx!.createImageData(500, 400);
    imageData.data.set(pixels);
    ctx!.putImageData(imageData, 0, 0);
  }
})


</script>

<img src={imgURL} alt="hidden" hidden aria-hidden onload={handleImageLoad} bind:this={hiddenImgRef} />
<div
	class="challenge-card"
	style="box-shadow: {shadow}; background-image: {backgroundImageValue};"
>
<h1 contenteditable>FILM CHALLENGE</h1>
  {#if !imageLoaded}
    <!-- {#key image.blur_hash} -->
    <canvas bind:this={canvasRef} transition:fade|global={{duration: 300}}/>
    <!-- {/key} -->
  {/if}
	<ul>
		{#each challengeConfig.rules as rule, idx (rule.id)}
			<li class="rule">
				<h3>{rule.name}</h3>
				<p contenteditable>{rule.options[rule.optionIndex]}</p>
				<div class="action-row">
					<button class="icon-btn" onclick={() => removeActiveRule(rule.id)}>
						<X />
					</button>
					<button class="icon-btn" onclick={() => shuffleActiveRule(idx)}>
						<RefreshCw />
					</button>
				</div>
			</li>
		{/each}
	</ul>
</div>
<Exif {image}>
	<button class="tertiary" onclick={refreshImage}>Refresh Image</button>
</Exif>
<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
	.challenge-card {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
		z-index: 1;

		max-width: 600px;
		width: 100%;
		max-height: min(600px, 100%);
		min-height: 24rem;
		overflow-x: hidden;
		overflow-y: auto;

		margin: 0 auto;
		padding: 1rem;

		border: 1px solid black;
		border-radius: 0.25rem;

		background-position: center;
		background-size: cover;
		background-repeat: repeat;
	}

	.content {
		width: 100%;
		min-height: 24rem;
		max-height: 600px;
		overflow-y: auto;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem;
		background: radial-gradient(circle at 150% -150%, transparent, #000000aa);
	}

	.rule {
		padding: 0.5rem 0.5rem 0;
		background-color: #00000055;
		height: 6rem;
		flex-grow: 1;
		max-width: 50%;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		align-items: stretch;
	}

	.rule h3,
	.rule p {
		margin: 0;
	}

	.rule h3 {
		font-size: 0.75rem;
		font-weight: 600;
	}
	.rule p {
		font-size: 1.25rem;
		font-weight: 200;
	}

	ul {
		width: 100%;
		list-style: none;
		padding: 0;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.action-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 0 0;
		border-top: 1px solid #ffffff88;
	}
</style>
