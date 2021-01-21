<script lang="ts">
  export let name: string;
  export let color: string;
  export let className: string = "";
  export let handleClick: svelte.JSX.EventHandler<Event, HTMLInputElement>;

  let hover = false;
  const handleHover = () => {
    hover = !hover;
  };
</script>

<style type="text/scss">
  button {
    cursor: pointer;
    padding: 0.5em 1.25em;
    transition: background-color 200ms ease-out, color 200ms ease-in;
  }
  .primary {
    background-color: var(--primary);
    color: #ffffff;
    border: 1px solid #ffffff;
  }
  .secondary {
    background-color: #ffffff;
    color: var(--primary);
    border: 1px solid var(--primary);
  }
  .tertiary {
    background-color: #233a67;
    color: white;
  }
  button {
    transition: filter 150ms ease-out;
  }
  button:hover {
    filter: brightness(1.2);
  }
</style>

<button
  on:mouseover={handleHover}
  on:mouseout={handleHover}
  on:click={handleClick}
  class={`${color} ${className}`}
  {name}>
  {name}
</button>
