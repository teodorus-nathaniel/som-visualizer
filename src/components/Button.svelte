<script lang="ts">
    export let name: string;
    export let color: string;
    export let className: string = "";
    export let handleClick: svelte.JSX.EventHandler<Event, HTMLInputElement>;

    let hover = false;
    const handleHover = () => {
        hover = !hover;
    };
    const inverse = (color: string) => {
        if (color === "primary") {
            if (hover) return "secondary";
            return "primary";
        } else if (color === "secondary") {
            if (hover) return "primary";
            return "secondary";
        }
    };
</script>

<style type="text/scss">
    button {
        cursor: pointer;
        padding: 8px 12px;
        transition: background-color 200ms ease-out, color 200ms ease-in;
    }
    .primary {
        background-color: #4d85f1;
        color: #ffffff;
        border: 1px solid #ffffff;
    }
    .secondary {
        background-color: #ffffff;
        color: #4d85f1;
        border: 1px solid #4d85f1;
    }
</style>

<button
    on:mouseover={handleHover}
    on:mouseout={handleHover}
    on:click={handleClick}
    class={`${hover ? inverse(color) : inverse(color)} ${className}`}
    {name}>
    {name}
</button>
