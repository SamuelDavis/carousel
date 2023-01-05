<script lang="ts">
  import Carousel from "../lib/Carousel.svelte";
  import Section from "../lib/Section.svelte";
  import { styles } from "./util";

  type SectionType = { id: number; ref: undefined | HTMLElement };

  const sections: SectionType[] = Array(5)
    .fill(null)
    .map((_, id) => ({ id, ref: undefined }));
  let activeId = sections[0].id;
  let ref;
  const width = `560px`;
  const height = `400px`;

  function onSelectActive(section: SectionType) {
    const { id, ref } = section;
    activeId = id;
    ref.scrollLeft = ref.offsetLeft;
  }
</script>

<main>
  <menu>
    {#each sections as section}
      <li>
        <button
          class:active={section.id === activeId}
          on:click={() => onSelectActive(section)}
        >
          {section.id}
        </button>
      </li>
    {/each}
  </menu>
  <Carousel bind:this={ref} style={styles({ width, height })}>
    {#each sections as section}
      <Section bind:this={section.ref} active={section.id === activeId}>
        Section {section.id}
      </Section>
    {/each}
  </Carousel>
</main>

<style lang="css">
  main {
    background-color: gray;
  }

  menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.25em;
  }

  .active {
    background-color: lightblue;
  }
</style>
