<script lang="ts">
import InputNumber from "./InputNumber.svelte";

    export let col: number[];
    export let row: number[];

    
</script>

<style type="text/scss">
</style>

<div class="flex max-w-4xl mx-auto header">
    {#each col as idx}
    <div class="flex flex-col p-3" >
        <p class="font-bold text-xl text-white">{'Feature ' + idx}</p>
        {#each row as idx}
            <InputNumber
            color="secondary"
            className="mt-2 w-20 focus:background-color rounded-lg"
            value={0} />
        {/each}
    </div>
    {/each}
</div>