<script lang="ts">
  import Button from "./Button.svelte";
  import InputText from "./InputText.svelte";
  import RadioButton from "./RadioButton.svelte";
  import CreateDataset from "./CreateDataset.svelte";
  import SomPreview from "./SomPreview.svelte";
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { getPoints } from "../data/data";

  const dispatch = createEventDispatcher();

  let selected: string = "1";
  let model: string = "2d";
  let createDataset: boolean = false;
  let neuronCount = 9;

  let modelError = false;
  let openCreateDataset = false;

  let presetDatasetSize = 20;

  $: {
    if (
      model === "2d" &&
      Math.sqrt(neuronCount) > Math.floor(Math.sqrt(neuronCount))
    ) {
      modelError = true;
    } else {
      modelError = false;
    }
  }

  function handleChange(event: any) {
    selected = event.currentTarget.value;
    if (selected === "2") {
      openCreateDataset = true;
    }
  }

  function handleChangeNeuronCount(e: any) {
    neuronCount = e.detail;
  }

  function handleClick(event: any) {
    model = event.target.name;
  }

  function handleChangePresetDataset(e) {
    presetDatasetSize = e.detail;
  }

  function handleSave() {
    if (modelError) return;

    const data = {
      neuronCount,
      type: selected
    };
    if (selected === "1") {
      dispatch("save", {
        ...data,
        dataset: getPoints(presetDatasetSize)
      });
    } else if (selected === "2") {
      dispatch("save", {
        ...data
      });
    } else {
    }
  }
</script>

<style type="text/scss">
  .customize-model {
    padding-bottom: 64px;
  }
  hr {
    border: none;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0)
    );
  }
  .button-upload {
    border: 1px solid var(--primary);
    transition: box-shadow 150ms ease-out;
  }
  .button-upload:hover {
    box-shadow: 0 3px 5px rgba(50, 50, 50, 0.1);
  }
</style>

<div class="flex-col max-w-screen-xl mx-auto customize-model px-20 py-16">
  <div class="flex-col">
    <p class="font-bold text-4xl">SOM Visualizer</p>
    <p class="text-2xl">Self Organizing Map</p>
  </div>
  <hr class="my-12" />
  <div class="flex">
    <div class="w-2/4">
      <p class="font-bold text-2xl mb-2">Customize your model</p>
      <div class="flex-col py-3">
        <p>Choose your prefered model type(Neighborhood type)</p>
        <div class="flex pt-2">
          <Button
            name="2d"
            color={`${model === '2d' ? 'primary' : 'secondary'}`}
            className="mr-2 rounded-lg font-bold"
            {handleClick} />
          <Button
            name="linear"
            color={`${model === 'linear' ? 'primary' : 'secondary'}`}
            className="rounded font-bold"
            {handleClick} />
        </div>
      </div>
      <div class="py-3">
        <p>Neuron Count</p>
        <div class="flex items-center mt-2">
          <InputText
            value={neuronCount}
            color="primary"
            className="focus:background-color rounded-lg"
            on:change={handleChangeNeuronCount}
            width="12ch" />
          {#if modelError}
            <div
              class="flex flex-col ml-5"
              in:fly={{ x: 200, duration: 200 }}
              out:fade>
              <p style="color: red; font-weight: bold; font-size: 12px">
                Invalid Dataset!
              </p>
              <p style="color: red; font-size: 12px">2d model must be square</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
    <div class="w-2/4">
      <SomPreview {neuronCount} type={model} />
    </div>
  </div>
  <hr class="my-12" />
  <div class="flex-col">
    <p class="font-bold text-2xl mb-1">Input Data</p>
    <p class="mb-5">
      For input that have more than 2 dimension, we will use PCA to reduce the
      dimension to 2
    </p>
    <div class="flex-col my-2">
      <RadioButton
        name="dataset"
        id="preset-dataset"
        label="Use Preset (Randomized 2D) Dataset"
        className="py-2"
        value="1"
        {selected}
        {handleChange} />
      {#if selected === '1'}
        <div class="mt-1 ml-8 mb-5">
          <p class="mb-1">Dataset Size</p>
          <InputText
            color="primary"
            value={presetDatasetSize}
            width="12ch"
            className="focus:background-color rounded-lg"
            on:change={handleChangePresetDataset} />
        </div>
      {/if}
      <RadioButton
        name="dataset"
        id="custom-dataset"
        label="Use Custom Dataset (Shape: 0x0)"
        className="py-2"
        value="2"
        {selected}
        {handleChange} />
      {#if openCreateDataset}
        <CreateDataset on:close={() => (openCreateDataset = false)} />
      {/if}
      <RadioButton
        name="dataset"
        id="upload-dataset"
        label="Upload Dataset"
        className="py-2"
        value="3"
        {selected}
        {handleChange} />
      {#if selected === '3'}
        <div class="flex ml-8 mt-1 items-center bg-grey-lighter">
          <button
            class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg button-upload tracking-wide border border-blue cursor-pointer">
            <svg
              class="w-8 h-8"
              style="fill: var(--primary)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="mt-2 text-base leading-normal">Select a CSV file</span>
            <input type="file" class="hidden" />
          </button>
        </div>
      {/if}
    </div>
  </div>
  <div class="mt-5 flex justify-end">
    <Button
      name="Save"
      color="primary"
      className="mr-2 rounded-lg font-bold"
      handleClick={handleSave} />
  </div>
</div>
