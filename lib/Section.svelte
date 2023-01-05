<script lang="ts">
  export let active = false;
  const Sizes = ["S", "M", "L"];
  let size = Sizes[0];
</script>

<section {...$$props} class={`size-${size}`} class:active>
  <header>
    <select bind:value={size}>
      {#each Sizes as value}
        <option {value}>{value}</option>
      {/each}
    </select>
  </header>
  <article>
    <slot />
  </article>
</section>

<style lang="css">
  :root {
    --flex-basis: 33.3%;
  }

  section {
    background-color: lightblue;
    height: 100%;
    flex-basis: calc(var(--flex-basis) - 1em);
    flex-grow: 1;
    flex-shrink: 0;
    transition: all 0.3s ease-in;
  }

  section:not(:last-child) {
    margin-right: 1em;
  }

  .size-M {
    --flex-basis: 66.6%;
  }

  .size-L {
    --flex-basis: 99.9%;
  }

  .active {
    background-color: lightsteelblue;
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>
