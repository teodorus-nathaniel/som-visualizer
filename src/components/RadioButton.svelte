<script lang="ts">
    export let id: string;
    export let name: string;
    export let label: string;
    export let className: string;
    export let value: string;
    export let selected: string;
    export let onChange: svelte.JSX.EventHandler<Event, HTMLInputElement>;
</script>

<style type="text/scss">
    input[type="radio"]:checked {
        color: #4d85f1;
    }
</style>

<div class={`flex-col item-center ${className}`}>
    <input
        {id}
        type="radio"
        {name}
        {value}
        checked={selected === value}
        on:change={onChange} />
    <label for={id}>{label}</label>
</div>
