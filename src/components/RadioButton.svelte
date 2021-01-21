<script lang="ts">
  export let id: string;
  export let name: string;
  export let label: string;
  export let className: string;
  export let value: string;
  export let selected: string;
  export let handleChange: svelte.JSX.EventHandler<Event, HTMLInputElement>;
</script>

<style type="text/scss">
  input[type="radio"]:checked {
    color: var(--primary);
  }
</style>

<div class={`flex-row flex items-center ${className}`}>
  <input
    class="mr-3"
    {id}
    type="radio"
    {name}
    {value}
    checked={selected === value}
    on:change={handleChange} />
  <label for={id}>{label}</label>
</div>
