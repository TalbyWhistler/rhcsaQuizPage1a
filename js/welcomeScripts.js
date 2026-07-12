function welcomeInit()
{
    console.log("Welcome to welcome");
    selectNav();
}

function selectNav()
{
    let el=document.getElementById("welcomeButton");
    el.classList.add('selectedNav');
}

welcomeInit();