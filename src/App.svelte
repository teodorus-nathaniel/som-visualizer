<script lang="ts">
  import CartesianGraph from './components/CartesianGraph.svelte';
  import Tailwind from './Tailwind.svelte';

  let data = [
    {
      x: 5,
      y: 5,
    },
    {
      x: 20,
      y: 20,
    },
  ];
</script>

<style type="text/scss">
</style>

<Tailwind />
<main>
  <CartesianGraph points={data} scale={10} />
</main>
