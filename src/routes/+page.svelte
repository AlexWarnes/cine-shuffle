<script lang="ts">
  import '../global.css'
	import ChallengeCard from "$lib/ChallengeCard.svelte";
	import RulesGrid from "$lib/RulesGrid.svelte";
	import { fallbackImg } from '$lib/fallbackData';

  let { data }: { 
    data: { 
      image: any 
    }
  } = $props()

  let error = $derived(!!data?.image.errors)
  let image = $derived(data?.image.errors ? fallbackImg() : data.image)
  $effect(() => {
    console.log("[+page] - data:", {data, image, error})

    if (data.image.errors) console.log('image is bad, use fallback')

  })

</script>
<div class="view-container">

  <div class="card-container">
    <ChallengeCard {image} {error}/>
  </div>
  <div class="rule-container">
    <RulesGrid />
  </div>
</div>

<style>
  .view-container {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-flow: column nowrap;
    max-height: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #080808;
  }
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafbfc;
    padding: 2rem;
    overflow-y: auto;
    flex-grow: 2;
    min-height: 66%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
</style>