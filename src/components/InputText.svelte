<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let color: string;
  export let className: string = "";
  export let width: string = "auto";
  export let value: number;

  const dispatch = createEventDispatcher();
  $: {
    dispatch("change", value);
  }
</script>

<style type="text/scss">
  input {
    padding: 0.5em 1.25em;
  }
  .primary {
    background-color: #ffffff;
    border: 1px solid var(--primary);
  }
  .primary:focus {
    outline-color: var(--primary);
  }
  .secondary {
    background-color: var(--primary);
    color: #ffffff;
    border: 1px solid #ffffff;
  }
  .secondary:focus {
    outline-color: #ffffff;
  }
</style>

<input
  type="number"
  style={`width: ${width}`}
  bind:value
  class={`${color} ${className}`} />
