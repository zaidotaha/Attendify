document.getElementById("aside").addEventListener("mouseover", expandSidebar);
document.getElementById("aside").addEventListener("mouseout", collapseSidebar);
document.getElementById("burger-icon-1").addEventListener("click", showdp);
document.getElementById("burger-icon-2").addEventListener("click", hidedp);

function expandSidebar() {
    document.getElementById("aside").style.width = "250px";
    // document.getElementById("grid-sidebar").style.width = "280px";
    document.getElementById("grid-body").style.marginLeft = "180px";
}

function collapseSidebar() {
    document.getElementById("aside").style.width = "70px";
    // document.getElementById("grid-sidebar").style.width = "100px";
    document.getElementById("grid-body").style.marginLeft = "0px";
}

function showdp(){
    document.getElementById("drop-down-menu2").style.display = "block";
    document.getElementById("main-burger-icon").style.display = "none";
}

function hidedp(){
    document.getElementById("drop-down-menu2").style.display = "none";
    document.getElementById("main-burger-icon").style.display = "block";
}