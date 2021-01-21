<script lang="ts">
  export let name: string = "";
  export let color: string;
  export let disabled: boolean = false;
  export let width = "10ch";
  export let className: string = "";
  export let value: string | number = "";
  export let handleChange: svelte.JSX.EventHandler<Event, HTMLInputElement>;
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
  .disabled {
    background-color: rgba(100, 100, 100, 0.5);
  }
</style>

<input
  type="number"
  {name}
  min={0}
  class={`${color} ${className} ${disabled ? 'disabled' : ''}`}
  style={`width: ${width}`}
  {value}
  {disabled}
  on:change={handleChange} />
