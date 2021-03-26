<script lang="ts">
  import Button from './Button.svelte';
  import InputNumber from './InputNumber.svelte';
  import RadioButton from './RadioButton.svelte';
  import CreateDataset from './CreateDataset.svelte';
  import SomPreview from './SomPreview.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { getPoints } from '../data/data';

  const dispatch = createEventDispatcher();

  let selected: string = '1';
  let model: string = '2d';
  let neuronCount = 9;
  let learningRate = 0.5;
  let epoch = 500;
  let radius = 2;

  let modelError = false;
  let openCreateDataset = false;
  let saveError = '';

  let presetDatasetSize = 20;

  let customDataset: number[][] = [];

  $: {
    if (
      model === '2d' &&
      Math.sqrt(neuronCount) > Math.floor(Math.sqrt(neuronCount))
    ) {
      modelError = true;
    } else {
      modelError = false;
    }
  }

  function handleChange(event: any) {
    selected = event.currentTarget.value;
    if (selected === '2') {
      openCreateDataset = true;
    }
  }

  function handleChangeData(e: any) {
    return Math.floor(e.target.value);
  }

  function handleChangeNeuronCount(e: any) {
    neuronCount = handleChangeData(e);
  }
  function handleChangeEpoch(e) {
    epoch = handleChangeData(e);
  }
  function handleChangeRadius(e) {
    radius = handleChangeData(e);
  }
  function handleChangeLearningRate(e) {
    radius = e.target.value;
  }

  function handleClick(event: any) {
    model = event.target.name;
  }

  function handleChangePresetDataset(e) {
    presetDatasetSize = e.target.value;
  }

  function handleSave() {
    if (modelError) return;

    if (neuronCount === 0) {
      saveError = 'Neuron count must be at least 1!';
    } else if (selected === '2' && customDataset.length === 0) {
      saveError = 'Custom Dataset must have at least 1 point!';
    } else if (learningRate <= 0 || radius <= 0 || epoch <= 0) {
      saveError = 'Hyperparamters must be more than 0!';
    }

    const data = {
      neuronCount,
      type: model,
      epoch,
      radius,
      learningRate,
    };

    if (selected === '1') {
      dispatch('save', {
        ...data,
        dataset: getPoints(presetDatasetSize),
      });
    } else if (selected === '2') {
      dispatch('save', {
        ...data,
        dataset: customDataset,
      });
    }
  }
</script>

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
            {handleClick}
          />
          <Button
            name="linear"
            color={`${model === 'linear' ? 'primary' : 'secondary'}`}
            className="rounded font-bold"
            {handleClick}
          />
        </div>
      </div>
      <div class="py-3">
        <p>Neuron Count</p>
        <div class="flex items-center mt-2">
          <InputNumber
            value={neuronCount}
            color="primary"
            className="focus:background-color rounded-lg"
            handleChange={handleChangeNeuronCount}
          />
          {#if modelError}
            <div
              class="flex flex-col ml-5"
              in:fly={{ x: 200, duration: 200 }}
              out:fade
            >
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
  <div>
    <p class="font-bold text-2xl mb-2">Hyperparameters</p>
    <div class="flex mx-auto">
      <div class="py-3 pr-5">
        <p>Learning Rate</p>
        <div class="flex items-center mt-2">
          <InputNumber
            value={learningRate}
            color="primary"
            className="focus:background-color rounded-lg"
            handleChange={handleChangeLearningRate}
          />
        </div>
      </div>
      <div class="py-3 px-5">
        <p>Epoch</p>
        <div class="flex items-center mt-2">
          <InputNumber
            value={epoch}
            color="primary"
            className="focus:background-color rounded-lg"
            handleChange={handleChangeEpoch}
          />
        </div>
      </div>
      <div class="py-3 px-5">
        <p>Radius</p>
        <div class="flex items-center mt-2">
          <InputNumber
            value={radius}
            color="primary"
            className="focus:background-color rounded-lg"
            handleChange={handleChangeRadius}
          />
        </div>
      </div>
    </div>
  </div>
  <hr class="my-12" />
  <div class="flex-col">
    <p class="font-bold text-2xl mb-5">Input Data</p>
    <div class="flex-col my-2">
      <RadioButton
        name="dataset"
        id="preset-dataset"
        label="Use Preset (Randomized 2D) Dataset"
        className="py-2"
        value="1"
        {selected}
        {handleChange}
      />
      {#if selected === '1'}
        <div class="mt-1 ml-8 mb-5">
          <p class="mb-1">Dataset Size</p>
          <InputNumber
            color="primary"
            value={presetDatasetSize}
            className="focus:background-color rounded-lg"
            handleChange={handleChangePresetDataset}
          />
        </div>
      {/if}
      <RadioButton
        name="dataset"
        id="custom-dataset"
        label={`Use Custom Dataset (Shape: ${customDataset.length}x${customDataset[0] ? customDataset[0].length : 0})`}
        className="py-2"
        value="2"
        {selected}
        {handleChange}
      />
      {#if openCreateDataset}
        <CreateDataset
          on:save={(e) => {
            console.log(e.detail);
            customDataset = e.detail;
          }}
          on:close={() => (openCreateDataset = false)}
        />
      {/if}
    </div>
  </div>
  <div class="mt-5 flex justify-end">
    <Button
      name="Save"
      color="primary"
      className="mr-2 rounded-lg font-bold"
      handleClick={handleSave}
    />
  </div>
</div>

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
