<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  import InputNumber from "./InputNumber.svelte";

  export let col: number;
  export let row: number;

  const dispatch = createEventDispatcher();

  let data: number[][] = [];

  const handleDataChange = (i: number, j: number) => (e) => {
    data[i][j] = +e.target.value ?? 0;
    data = data;
  };

  $: {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (!data[i]) {
          data[i] = [];
        }
        data[i][j] = data[i][j] ?? 0;
      }
    }
    data = data;
  }
</script>

<style type="text/scss">
  .column:first-child {
    padding-left: 0;
  }
  .column:last-child {
    padding-right: 0;
  }
</style>

<div class="flex max-w-4xl mx-auto header overflow-auto">
  {#each Array.from({ length: col }) as _, j (j)}
    <div class="flex flex-col p-3 column">
      <p class="text-white">{'Feature ' + (j + 1)}</p>
      {#each Array.from({ length: row }) as _, i (i)}
        <InputNumber
          handleChange={handleDataChange(i, j)}
          color="secondary"
          className="mt-2 w-20 focus:background-color rounded-lg"
          value={data[i][j]} />
      {/each}
    </div>
  {/each}
</div>
<div class="flex justify-end mt-8 max-w-4xl mx-auto">
  <Button
    name="Use Dataset"
    className="rounded font-bold"
    handleClick={() => {
      dispatch('save', data);
    }}
    color="tertiary" />
</div>
