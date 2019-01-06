var menuIcon = document.getElementsByClassName("icon");
var icon = menuIcon[0];
var topnav = document.getElementsByClassName("menu");
var menu = topnav[0];

icon.addEventListener("click", ()=>{
    if(menu.className == "menu")
    {
        menu.className += " responsive";
    }
    else
    {
        menu.className = "menu";
    }
});

var prevScrollpos = window.pageYOffset;

window.addEventListener("resize", () => {
    if(window.innerWidth > 1280)
    {
        menu.className = "menu";
    }
});