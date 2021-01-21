<script lang="ts">
    import Icon from "svelte-awesome";
    import { remove } from "svelte-awesome/icons";
    import InputNumber from "./InputNumber.svelte";
    import Button from "./Button.svelte"; 
import DatasetValues from "./DatasetValues.svelte";

    let row: number = 0, col: number = 0;

    function handleChange(event){
        if(event.target.name === 'row') {
            row = event.target.value;
        }
        else if (event.target.name === 'col') {
            col = event.target.value;
        }
    }
    
    let new_col = [];
    let new_row = [];

    $:{
        new_col = [];
        new_row = [];
        for(let i = 1; i <= row; i++) {
            new_row.push(i);
        }
        for(let i = 1; i <= col; i++) {
            new_col.push(i);
        }
    }
    
    function handleClick(event){
        console.log(new_row, new_col)    
    }
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

<div class="flex-col p-10 create-dataset">
    <div class="flex-col max-w-4xl mx-auto header">
        <p class="font-bold text-4xl text-white mb-8">
            Create Your Own Dataset!
        </p>
        <p class="font-bold text-2xl text-white">Dataset Shape</p>
        <div class="flex items-center py-2">
            <div class="flex flex-col mt-2 mr-4">
                <p class="font-bold text-xl text-white">Row</p>
                <InputNumber
                    name="row"
                    color="secondary"
                    className="mt-2 w-20 focus:background-color rounded-lg"
                    value={row}
                    {handleChange} />
            </div>
            <div class="flex mt-8"><span class="text-white mt-2">x</span></div>
            <div class="flex-col mt-2 ml-4">
                <p class="font-bold text-xl text-white">Col</p>
                <InputNumber
                    name="col"
                    color="secondary"
                    className="mt-2 w-20 focus:background-color rounded-lg"
                    value={col}
                    {handleChange}/>
            </div>
        </div>
        <div class="my-8">
            <Button
                name="Update Dataset Shape"
                color="primary"
                className="rounded font-bold rounded-lg"
                {handleClick} />
        </div>
    </div>
    <DatasetValues row={new_row} col={new_col}/>
    <Icon data={remove} class="text-white absolute" scale="2"/>
</div>
