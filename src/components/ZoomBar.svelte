<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-awesome";
  import { searchPlus, searchMinus } from "svelte-awesome/icons";

  export let scale: number;
  const dispatch = createEventDispatcher();

  $: dispatch("zoom", scale);
</script>

<style type="text/scss">
  .root {
    top: 50%;
    left: 30px;
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  .icon {
    transform: rotate(90deg);
    margin: 0 10px;
  }
</style>

<div class="absolute flex root floating-container">
  <div class="icon">
    <Icon data={searchMinus} />
  </div>
  <input type="range" min={5} max={20} bind:value={scale} />
  <div class="icon">
    <Icon data={searchPlus} />
  </div>
</div>
