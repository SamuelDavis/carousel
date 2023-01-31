<script lang="ts">
  import { writable } from "svelte/store";

  const Size = {
    Small: 33,
    Medium: 66,
    Large: 100,
  };
  const articles = new Array(5).fill(undefined).map((_, i) => ({ id: i + 1 }));
  const articleSizes = writable(
    articles.reduce((acc, { id }) => ({ ...acc, [id]: Size.Small }), {})
  );

  const focusedArticle = writable(1);
</script>

<main>
  <nav>
    <menu>
      {#each articles as { id } (id)}
        <li>
          <a
            href={`#${id}`}
            class:focused={id === $focusedArticle}
            on:click={() => ($focusedArticle = id)}
          >
            Section {id}
          </a>
        </li>
      {/each}
    </menu>
  </nav>
  <ol>
    {#each articles as { id } (id)}
      <li
        style={`min-width:${Size.Small}vw;flex-basis:${$articleSizes[id]}vw;`}
        class:focused={id === $focusedArticle}
        class:next={id === $focusedArticle + 1}
        on:click={() => ($focusedArticle = id)}
      >
        <article>
          <header>
            <h1>Section {id}</h1>
            <select
              on:change={(e) =>
                ($articleSizes = {
                  ...$articleSizes,
                  [id]: parseInt(e.target.value),
                })}
            >
              {#each Object.entries(Size) as [key, value]}
                <option {value}>{key}</option>
              {/each}
            </select>
          </header>
        </article>
      </li>
    {/each}
  </ol>
</main>

<style lang="css">
  main {
    background-color: pink;
  }

  menu {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    justify-content: space-evenly;
  }

  ol {
    background-color: lightgreen;
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-width: 100%;
    overflow-x: scroll;
    display: flex;
  }

  ol li {
    background-color: lightblue;
    transition-property: flex-basis;
    transition-duration: 1s;
    transition-timing-function: ease-in;
    flex: 1 1;
  }

  ol li header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  ol li:hover {
    box-sizing: border-box;
    border: 3px dotted blue;
    z-index: 1;
  }

  ol li.focused {
    border: 3px solid darkblue;
    z-index: 2;
    flex: 0 0;
  }
</style>
