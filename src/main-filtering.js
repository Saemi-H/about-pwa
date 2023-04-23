// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Creates HTML element from given item
function createElement(item) {
  const span = document.createElement("span");
  span.setAttribute("class", "description");
  span.innerText = `${item.size} size`;
  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.setAttribute("data-color", item.color);
  li.append(span);
  return li;
}

// Handle button click
function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

loadItems().then((items) => {
  const elements = items.map(createElement);
  const container = document.querySelector(".items");
  container.append(...elements);
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (event) => onButtonClick(event, elements));
});
