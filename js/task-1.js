const categoryList = document.querySelector("ul#categories");
const categoryItems = categoryList.querySelectorAll(".item");
console.log(`Number of categories: ${categoryItems.length}`);

categoryItems.forEach(item => {
  const categoryName = item.querySelector("h2").textContent;
  console.log(`Category: ${categoryName}`);

  const categoryEntities = item.querySelectorAll("ul li");
  console.log(`Elements: ${categoryEntities.length}`);
});
