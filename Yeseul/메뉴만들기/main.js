let horizontalUnderLine = document.getElementById("horizontal-underline");
let horizontalMenus = document.querySelectorAll("nav:first-child a");
let verticalunderline = document.getElementById("vertical-underline");
let verticalMenus = document.querySelectorAll("nav:nth-child(2) a");

horizontalMenus.forEach((menu)=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));

function horizontalIndicator(e) {
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderLine.style.top = 
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";

}




verticalMenus.forEach((menu)=>menu.addEventListener("click",(e)=>verticalIndicator(e)));

function verticalIndicator(e) {
    verticalunderline.style.left = e.currentTarget.offsetLeft + "px";
    verticalunderline.style.width = e.currentTarget.offsetWidth + "px";
    verticalunderline.style.top = 
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";

}
