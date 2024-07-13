function shopCategorySelectorManager() {
    const selector = document.getElementById("shop-category-selector");
    const categories = document.getElementsByClassName("shop-category");
    const stall = document.getElementById("shop-stall");
    let selected = categories[0];

    for (const category of categories) {
        category.addEventListener("click", function(e) {
            selected = category;
            selector.style.top = selected.getBoundingClientRect().top + "px";
            for (const category of categories) {
                if (category == selected) {
                    category.classList.add("selected");
                } else {
                    category.classList.remove("selected");
                }
            }

            stall.style.scrollBehavior = "smooth";

            const categorySeparator = document.getElementById(category.id.replace("shop-category", "section"));
            stall.scrollTo(0, categorySeparator.offsetTop - 3 * categorySeparator.offsetHeight);

            stall.style.scrollBehavior = "default";
        });
    }
    selected.click();
}
shopCategorySelectorManager();
