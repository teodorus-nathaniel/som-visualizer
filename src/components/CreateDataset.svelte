<script lang="ts">
  import Icon from "svelte-awesome";
  import { remove } from "svelte-awesome/icons";
  import InputNumber from "./InputNumber.svelte";
  import Button from "./Button.svelte";
  import DatasetValues from "./DatasetValues.svelte";
  import { fly, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let row: number = 5,
    col: number = 2;

  let usedCol = col,
    usedRow = row;

  function handleChange(event) {
    if (event.target.name === "row") {
      row = event.target.value;
    } else if (event.target.name === "col") {
      col = event.target.value;
    }
  }

  function handleClick(event) {
    usedCol = col;
    usedRow = row;
  }
</script>

<style>
  .create-dataset {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--primary);
  }
</style>

<div
  class="flex-col p-10 create-dataset z-10"
  in:fly={{ x: 300, duration: 150 }}
  out:fade>
  <div class="flex-col relative max-w-4xl mx-auto header">
    <p class="font-bold text-4xl text-white mb-8">Create Your Own Dataset!</p>
    <p class="font-bold text-2xl text-white">Dataset Shape</p>
    <div class="flex items-center py-2">
      <div class="flex flex-col mt-2 mr-4">
        <p class="text-white">Row</p>
        <InputNumber
          name="row"
          color="secondary"
          className="mt-2 w-20 focus:background-color rounded-lg"
          value={row}
          {handleChange} />
      </div>
      <div class="flex mt-8"><span class="text-white mt-2">x</span></div>
      <div class="flex-col mt-2 ml-4">
        <p class="text-white">Col</p>
        <InputNumber
          name="col"
          disabled
          color="secondary"
          className="mt-2 w-20 focus:background-color rounded-lg"
          value={col} />
      </div>
    </div>
    <div class="mt-4 mb-8">
      <Button
        name="Update Dataset Shape"
        color="tertiary"
        className="font-bold rounded-lg"
        {handleClick} />
    </div>
    <button class="absolute top-0 right-0" on:click={() => dispatch('close')}>
      <Icon data={remove} class="text-white" scale="2" />
    </button>
  </div>
  <DatasetValues
    on:save={(e) => {
      dispatch('save', e.detail);
      dispatch('close');
    }}
    row={usedRow}
    col={usedCol} />
</div>
