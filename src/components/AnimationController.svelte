<script lang="ts">
  import Icon from "svelte-awesome";
  import {
    plusCircle,
    minusCircle,
    playCircle,
    pauseCircle
  } from "svelte-awesome/icons";
  import { animationConfig } from "../stores/animationConfig";

  let speed = 50;
  let autoplay = false;
  $: {
    animationConfig.update((prev) => ({
      ...prev,
      duration: (speed / 100) * 5000
    }));
    console.log($animationConfig);
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
    <div class="play-btn">
      <button class={`${autoplay ? 'hidden' : ''}`}><Icon
          data={playCircle}
          scale="1.5" /></button>
      <button class={`${autoplay ? '' : 'hidden'}`}><Icon
          data={pauseCircle}
          scale="1.5" /></button>
    </div>
  </div>
</div>
