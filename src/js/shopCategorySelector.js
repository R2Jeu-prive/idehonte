function shopCategorySelectorManager(){
    let selector = document.getElementById("shop-category-selector");
    let categories = document.getElementsByClassName("shop-category");
    let selected = categories[0];
    updatePos();
    function updatePos(){
        selector.style.top = selected.getBoundingClientRect().top + "px";
        for(let category of categories){
            if(category == selected){
                category.classList.add("selected");
            }else{
                category.classList.remove("selected");
            }
        }
        
    }
    for(let category of categories){
        category.addEventListener("click", function(e){
            selected = category;
            updatePos();
        });
    }
}
shopCategorySelectorManager();