<script lang="ts">
	import { addRule, generateAllConstraints, rulesLibrary } from '$lib/state.svelte';
	import { AudioLines, Film, Lightbulb, Timer, Vibrate, Video, Volume } from 'lucide-svelte';
	function nameToIcon(name: string) {
		switch (name.toUpperCase()) {
			case 'CAMERA':
				return Video;
			case 'VIBE':
				return Vibrate;
			case 'DURATION':
				return Timer;
			case 'LIGHTS':
				return Lightbulb;
			case 'SOUND':
				return AudioLines;
			default:
				return Film;
		}
	}
</script>

<div class="grid-container">
	<button class="primary" onclick={() => generateAllConstraints()}>the works</button>
	{#each Object.values(rulesLibrary) as rule (rule.name)}
		<button onclick={() => addRule(rule.name)}>
			<svelte:component this={nameToIcon(rule.name)} size={16} strokeWidth={2} />
			<span class="rule-name">
				{rule.name}
			</span>
			<!-- <span class="icon-wrapper">
      </span> -->
		</button>
	{/each}
</div>

<style>
	.grid-container {
    padding: 1rem;
		flex-grow: 1;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	/* .rule-btn {
    padding: 0.5rem;
    box-shadow: 3px 3px 8px #00000055;
    width: 5rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    flex-grow: 1;
  } */
	.icon-wrapper {
		rotate: -45deg;
		margin-top: -0.5rem;
	}
</style>
