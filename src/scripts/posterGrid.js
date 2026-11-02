/**
 * Poster decks flow as a waterfall: every poster is appended to the currently
 * shortest column instead of being stretched to its row's tallest neighbour.
 */
const COLUMN_BREAKPOINT = 991;

const grids = [...document.querySelectorAll(".project-gallery-posters")];

if (grids.length) {
  const itemsByGrid = new Map();

  const columnCount = () => (window.innerWidth <= COLUMN_BREAKPOINT ? 2 : 4);

  const itemsOf = (grid) => {
    if (!itemsByGrid.has(grid)) {
      itemsByGrid.set(
        grid,
        [...grid.children].filter((el) =>
          el.classList.contains("project-gallery-item"),
        ),
      );
    }
    return itemsByGrid.get(grid);
  };

  const waitForImages = (items) =>
    Promise.all(
      items.map((item) => {
        const image = item.querySelector("img");
        if (!image || image.complete) return Promise.resolve();
        return image.decode().catch(() => {});
      }),
    );

  const build = (grid) => {
    const items = itemsOf(grid);
    const counts = columnCount();
    const heights = new Array(counts).fill(0);

    grid.textContent = "";
    grid.classList.add("is-masonry");

    const columns = Array.from({ length: counts }, () => {
      const column = document.createElement("div");
      column.className = "project-gallery-column";
      grid.append(column);
      return column;
    });

    items.forEach((item) => {
      const shortest = heights.indexOf(Math.min(...heights));
      columns[shortest].append(item);

      const image = item.querySelector("img");
      heights[shortest] += image?.naturalWidth
        ? image.naturalHeight / image.naturalWidth
        : 1.6;
    });
  };

  const layoutAll = () => {
    grids.forEach(async (grid) => {
      await waitForImages(itemsOf(grid));
      build(grid);
    });
  };

  layoutAll();

  let timer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(layoutAll, 200);
  });
}
