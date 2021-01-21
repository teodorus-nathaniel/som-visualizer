<script lang="ts">
    import Button from "./Button.svelte";
    import InputNumber from "./InputNumber.svelte";
    import RadioButton from "./RadioButton.svelte";
    import CreateDataset from "./CreateDataset.svelte";

    let selected: string = "1";
    let model: string = "2D";

    function handleChange(event: any) {
        selected = event.currentTarget.value;
    }

    function handleClick(event: any) {
        model = event.target.name;
    }
</script>

<style type="text/scss">
    .header {
        padding: 64px 64px 0px;
    }
    .customize-model {
        padding-bottom: 64px;
    }
    hr {
        border: none;
        height: 1px;
        background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
        );
    }
</style>

<div class="flex-col max-w-screen-xl mx-auto customize-model">
    <div class="flex-col header">
        <p class="font-bold text-4xl">SOM Visualizer</p>
        <p class="text-2xl">Self Organizing Map</p>
    </div>
    <hr class="my-12" />
    <div class="px-16 flex">
        <div class="w-2/4">
            <p class="font-bold text-2xl ">Customize your model</p>
            <div class="flex-col py-2">
                <p>Choose your prefered model type(Neighborhood type)</p>
                <div class="flex pt-2">
                    <Button
                        name="2D"
                        color={`${model === '2D' ? 'primary' : 'secondary'}`}
                        className="mr-2 rounded-lg font-bold"
                        {handleClick} />
                    <Button
                        name="Linear"
                        color={`${model === 'Linear' ? 'primary' : 'secondary'}`}
                        className="rounded font-bold"
                        {handleClick} />
                </div>
            </div>
            <div class="py-3">
                <p>Neuron Count</p>
                <InputNumber
                    color="primary"
                    className="mt-2 focus:background-color rounded-lg"
                     />
            </div>
        </div>
        <div class="w-2/4 rounded" style="border: 1px solid #4d85f1">
            <p>asdas</p>
        </div>
        <div />
    </div>
    <hr class="my-12" />
    <div class="px-16 flex-col">
        <p class="font-bold text-2xl ">Input Data</p>
        <p>
            For input that have more than 2 dimension, we will use PCA to reduce
            the dimension to 2
        </p>
        <div class="flex-col my-2">
            <RadioButton
                name="dataset"
                id="preset-dataset"
                label="Use Preset Dataset"
                className="py-1"
                value="1"
                {selected}
                {handleChange} />
            {#if selected === '1'}
                <InputNumber
                    color="primary"
                    className="mt-2 focus:background-color rounded-lg"
                     />
            {/if}
            <RadioButton
                name="dataset"
                id="custom-dataset"
                label="Use Custome Dataset (Shape: 0x0)"
                className="py-1"
                value="2"
                {selected}
                {handleChange} />
            {#if selected === '2'}
                <CreateDataset />
            {/if}
            <RadioButton
                name="dataset"
                id="upload-dataset"
                label="Upload Dataset"
                className="py-1"
                value="3"
                {selected}
                {handleChange} />
            {#if selected === '3'}
                <div class="flex  items-center bg-grey-lighter">
                    <label
                        class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                        <svg
                            class="w-8 h-8"
                            fill="#4d85f1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Select a
                            file</span>
                        <input type="file" class="hidden" />
                    </label>
                </div>
            {/if}
        </div>
    </div>
</div>
