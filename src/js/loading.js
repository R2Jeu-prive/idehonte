function loadingManager(){
    // detect first load
    var ready = false
    var observer = new MutationObserver(function(){
        if(ready){return;}
        ready = true;
        setTimeout(function(){ // this is bullshit waiting so people look at how amazing the loader is
            document.getElementById("loading-screen").classList.add("hide")
        }, 500);
    });
    observer.observe(document.getElementById("output"), {childList : true});
}
loadingManager();