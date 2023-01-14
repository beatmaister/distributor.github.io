document.addEventListener("DOMContentLoaded", function(){
    var home = document.getElementById("home");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var foot = document.getElementsByClassName('foot');

    const burger = document.getElementById("burger");
    var menu = document.getElementsByClassName('nav');
    var content = document.getElementById("content");

    var text = document.getElementById("card_text");
    var card = document.getElementById("card_info");

    var title = document.getElementById("card_title");
    var textL = document.getElementById("card_textL");
    var textJ = document.getElementById("card_textJ");
    var textP = document.getElementById("card_textP");
    var textJS = document.getElementById("card_textJS");
    var textH = document.getElementById("card_textH");
    var textC = document.getElementById("card_textC");

    var linux = document.getElementById("linux");
    var java = document.getElementById("java");
    var python = document.getElementById("python");
    var js = document.getElementById("js");
    var html = document.getElementById("html");
    var css = document.getElementById("css");

    //menu bar slide in-out
    burger.addEventListener('click', ()=>{
        Array.from(menu).forEach((x) => {
            if (x.style.display == "flex") {
                
                content.style.animationPlayState = "running";
                console.log(content.style.animationPlayState);
                content.style.animationName = "slideU";
                x.style.display = "none";
                
            } else {
                content.style.animationPlayState = "running";
                content.style.animationName = "slideD";
                x.style.display = "flex";
            }
            
        });
    })
    home.addEventListener('click', ()=>{
        window.scrollTo(0,0)
    })
    skills.addEventListener('click', ()=>{
        window.scrollTo(0,500)
    })
    projects.addEventListener('click', ()=>{
        window.scrollTo(0,1300)
    })
    contact.addEventListener('click', ()=>{
        window.scrollTo(0,window.outerHeight*5);      
    })

    //switch card text
    card.style.display = "none";
    linux.addEventListener('click', ()=>{
        if(card.style.display=="none") card.style.display="flex";
        else if(card.style.display=="flex" && title.innerHTML=="Linux") card.style.display="none";
        text.innerHTML = textL.innerHTML;
        title.innerHTML = "Linux";
    })
    java.addEventListener('click', ()=>{
        if(card.style.display=="none") card.style.display="flex";
        else if(card.style.display=="flex" && title.innerHTML=="Java") card.style.display="none";
        text.innerHTML = textJ.innerHTML;
        title.innerHTML = "Java";
    })
    python.addEventListener('click', ()=>{
        if(card.style.display=="none") card.style.display="flex";
        else if(card.style.display=="flex" && title.innerHTML=="Python") card.style.display="none";
        text.innerHTML = textP.innerHTML;
        title.innerHTML = "Python";
    })
    js.addEventListener('click', ()=>{
        if(card.style.display=="none") card.style.display="flex";
        else if(card.style.display=="flex" && title.innerHTML=="JavaScript") card.style.display="none";
        text.innerHTML = textJS.innerHTML;
        title.innerHTML = "JavaScript";
    })
    html.addEventListener('click', ()=>{
        if(card.style.display=="none") card.style.display="flex";
        else if(card.style.display=="flex" && title.innerHTML=="HTML") card.style.display="none";
        text.innerHTML = textH.innerHTML;
        title.innerHTML = "HTML";
    })
    css.addEventListener('click', ()=>{
        if(card.style.display=="none") card.style.display="flex";
        else if(card.style.display=="flex" && title.innerHTML=="CSS") card.style.display="none";
        text.innerHTML = textC.innerHTML;
        title.innerHTML = "CSS";
    })


    
});

