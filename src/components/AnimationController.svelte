<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Icon from "svelte-awesome";
  import {
    plusCircle,
    minusCircle,
    playCircle,
    pauseCircle
  } from "svelte-awesome/icons";
  import { animationConfig } from "../stores/animationConfig";

  const dispatch = createEventDispatcher();
  
  let autoplay = false;
  const handleAutoplay = (play: boolean) => {
    autoplay = play;
    dispatch('autoplay', play);
  }

  let speed = 50;
  $: {
    dispatch('changeSpeed', speed);
  }
</script>

<style>
  .root {
    bottom: 0;
    width: 100%;
  }
  .icon {
    position: relative;
    top: -1px;
  }
  .play-btn {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

<div class="absolute flex root floating-container">
  <div class="container relative flex justify-center items-center mx-auto">
    <h1 class="text-2xl mr-10">Animation Speed</h1>
    <div class="flex items-center">
      <div class="mx-2 icon">
        <Icon data={minusCircle} />
      </div>
      <input type="range" min={0} step="10" max={100} bind:value={speed} />
      <div class="mx-2 icon">
        <Icon data={plusCircle} />
      </div>
    </div>
    <div class="play-btn flex align-center">
      <p class="mx-2">Autoplay</p>
      <button on:click={() => handleAutoplay(true)} class={`${autoplay ? 'hidden' : ''}`}><Icon
          data={playCircle}
          scale="1.5" /></button>
      <button on:click={() => handleAutoplay(false)} class={`${autoplay ? '' : 'hidden'}`}><Icon
          data={pauseCircle}
          scale="1.5" /></button>
    </div>
  </div>
</div>
