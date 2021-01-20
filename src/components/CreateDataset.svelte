<script lang="ts">
    import Icon from "svelte-awesome";
    import { remove } from "svelte-awesome/icons";
    import InputText from "./InputText.svelte";
    import Button from "./Button.svelte";
</script>

<style>
    .create-dataset {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1000px;
        background-color: #4d85f1;
    }
</style>

<div class="flex-col pt-10 create-dataset">
    <div class="flex-col max-w-4xl mx-auto header">
        <p class="font-bold text-4xl text-white mb-8">
            Create Your Own Dataset!
        </p>
        <p class="font-bold text-2xl text-white">Dataset Shape</p>
        <div class="flex items-center py-2">
            <InputText
                color="secondary"
                className="mt-2 mr-2 w-20 focus:background-color rounded-lg"
                type="number" />
            <span class="text-white">x</span>
            <InputText
                color="secondary"
                className="mt-2  ml-2 w-20 focus:background-color rounded-lg"
                type="number" />
        </div>
        <div class="my-8">
            <Button
                name="Update Dataset Shape"
                color="primary"
                className="rounded font-bold rounded-lg" />
        </div>
    </div>
    <Icon data={remove} />
</div>
