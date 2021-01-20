<script lang="ts">
    export let color: string;
    export let className: string = "";
    export let type: string = "text";
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

<input {type} class={`${color} ${className}`} />
