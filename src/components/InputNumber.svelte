<script lang="ts">
    export let name: string;
    export let color: string;
    export let className: string = "";
    export let value: string | number = "";
    export let handleChange: svelte.JSX.EventHandler<Event, HTMLInputElement>;
</script>

<style type="text/scss">
    input {
        padding: 8px 12px;
    }
    .primary {
        background-color: #ffffff;
        border: 1px solid #4d85f1;
    }
    .primary:focus {
        outline-color: #4d85f1;
    }
    .secondary {
        background-color: #4d85f1;
        color: #ffffff;
        border: 1px solid #ffffff;
    }
    .secondary:focus {
        outline-color: #ffffff;
    }
</style>

<input type="number" {name} min={0} class={`${color} ${className}`} {value} on:change={handleChange} />
