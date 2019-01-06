var slideshow = document.getElementById("slideshow");
while(slideshow.firstChild)
    slideshow.removeChild(slideshow.firstChild);
var backgroundImg = [];
var allCountries = null;

//creeaza containerul pentru lista de destinatii (versiunea de mobil)
var mobileContent = document.getElementById("mobileContent");
while(mobileContent.firstChild)
    mobileContent.removeChild(mobileContent.firstChild);
var countriesList = document.createElement("ul");
countriesList.classList.add("countriesList");
mobileContent.appendChild(countriesList);

//creeaza harta interactiva

var worldMap = document.getElementById("worldMap");
while(worldMap.firstChild)
    worldMap.removeChild(worldMap.firstChild);
worldMap.style.position = "relative";

var worldMapFigure = document.createElement("img");
worldMapFigure.classList.add("responsiveImg");
worldMapFigure.setAttribute("src", "./data/WorldMap.png");
worldMapFigure.setAttribute("alt", "World Map");
worldMap.appendChild(worldMapFigure);

var worldMapGrid = document.createElement("div");
worldMapGrid.classList.add("mapGrid");
worldMap.appendChild(worldMapGrid);

var cd = document.getElementById("chooseDestination");
cd.removeChild(document.getElementById("exh"));

var chosenItem = document.getElementById("chosenItem");
while(chosenItem.firstChild)
    chosenItem.removeChild(chosenItem.firstChild);
chosenItem.classList.add("chosenItem");
var chosenItemParagraph = document.createElement("p");
chosenItem.appendChild(chosenItemParagraph);

function changePageContent()
{

    if(window.innerWidth <= 768)
    {
        worldMap.style.display = "none";
        chosenItem.style.display = "none";
        mobileContent.style.display = "block";
    }
    else
    {
        worldMap.style.display = "block";
        chosenItem.style.display = "block";
        mobileContent.style.display = "none";
    }
}

changePageContent();

fetch('http://localhost:3000/destinatii').then(
    function (response) 
    {
        if (response.status !== 200) 
        {
            console.log('Problema ' + response.status);
        }

        response.json().then(function (data) { 
            allCountries = data;
            //marcheaza pe harta o destinatie
            for (let i = 0; i < data.length; i++) 
            {
                let newImg = document.createElement("img");
                newImg.src = "./data/location.png";
                newImg.alt = "position";
                newImg.className = "responsiveImg";
                let newDiv = document.createElement("div");
                newDiv.id = data[i]["denumire"];
                newDiv.className = "responsiveImg";
                newDiv.style.gridColumn = data[i]["mapX"];
                newDiv.style.gridRow = data[i]["mapY"];
                newDiv.style.cursor = "pointer";
                newDiv.appendChild(newImg);

                newDiv.addEventListener("mouseenter", function () { 
                    chosenItemParagraph.innerHTML = data[i]["denumire"];
                });

                newDiv.addEventListener("mouseout", function () {
                    chosenItemParagraph.innerHTML = "";
                });

                newDiv.addEventListener("click", function(){
                    localStorage.setItem("selectedCountry", JSON.stringify(data[i]));
                    location.href = "destinatii.html";
                });

                worldMapGrid.appendChild(newDiv);

                //adauga o destinatie in lista
                //
                let listItem = document.createElement("li");
                let innercontainer = document.createElement("div");
                innercontainer.classList.add("listItemContainer");
                let img = document.createElement("img");
                img.src = "./data/location.png";
                img.style.width = "2rem";
                img.style.height = "2rem";
                innercontainer.appendChild(img);
                let countryName = document.createElement("p");
                countryName.style.width = "calc(100% - 2rem)";
                countryName.style.fontSize = "1.5rem";
                countryName.innerHTML = data[i].denumire;
                innercontainer.appendChild(countryName);
                listItem.appendChild(innercontainer);
                listItem.addEventListener("click", () => {
                    localStorage.setItem("selectedCountry", JSON.stringify(data[i]));
                    location.href = "destinatii.html";
                });
                countriesList.appendChild(listItem);
            }
        });

    }
).catch(function (err) {
    console.log('Eroare ', err);
});

//creeaza slide-urile cu oferte

fetch('http://localhost:3000/slide').then(
    function (response) 
    {
        if (response.status !== 200) 
        {
            console.log('Problema ' + response.status);
        }

        response.json().then(function (data) { 
            for(let i = 0; i < data.length; i ++)
            {
                let page = document.createElement("div");
                page.id = "slideshowPage" + (i + 1).toString();

                page.style.backgroundImage = "url('" + data[i]["imagineFundalSlide"] + "')";
                backgroundImg.push(data[i]["imagineFundalPagina"]);
                
                let colorArray = data[i]["culoareText"];
                let color = colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2];

                let text = document.createElement("p");
                text.style.color = "rgb(" + color + ")";
                text.innerHTML = data[i]["descriere"];
                text.style.gridRow = data[i]["randDescriere"];
                text.style.gridColumn = data[i]["coloanaDescriere"];
                
                text.classList.add("slideshowText");
                page.appendChild(text);

                let button = document.createElement("button");
                button.innerHTML = data[i]["textButon"];
                button.style.gridRow = data[i]["randButon"];
                button.style.gridColumn = data[i]["coloanaButon"];
  
                button.classList.add("slideshowButton");
                button.style.backgroundColor = "rgba(0, 0, 0, 0)";
                button.addEventListener("click", () => {
                    let selectedCountry;
                    for(let j = 0; j < allCountries.length; j ++)
                    {
                        if(allCountries[j].denumire === data[i]["destinatie"])
                        {
                            selectedCountry = allCountries[j];
                            break;
                        }
                    }
                    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
                    location.href = "destinatii.html";
                });
                
                button.style.borderColor = button.style.color = "rgb(" + color + ")";
                button.addEventListener("mouseenter", () =>
                {
                    button.style.backgroundColor = "rgba(" + color + ", 1)";
                    if((colorArray[0] + colorArray[1] + colorArray[2]) / 3 > 125)
                        button.style.color = "black";
                    else button.style.color = "white";
                });
                button.addEventListener("mouseout", () =>
                {
                    button.style.backgroundColor = "rgba(0, 0, 0, 0)";
                    button.style.color = "rgb(" + color + ")";
                });
                page.appendChild(button);

                page.classList.add("slide");
                page.classList.add("fade");
                slideshow.appendChild(page);
            }
            showSlides();
        });

    }
).catch(function (err) {
    console.log('Eroare ', err);
});



let previousButton = document.createElement("a");
previousButton.addEventListener("click", function(){
    prevSlide();
});
previousButton.classList.add("prev");
previousButton.innerHTML = "&#10094;";

let nextButton = document.createElement("a");
nextButton.addEventListener("click", function(){
    nextSlide();
});
nextButton.classList.add("next");
nextButton.innerHTML = "&#10095;";

slideshow.appendChild(previousButton);
slideshow.appendChild(nextButton);
slideshow.classList.add("slideshowContainer");

var slideIndex = 1;

var slideTimeoutID;

function showSlides()
{
    var slides = document.getElementsByClassName("slide");
   
    for(let i = 0; i < slides.length; i ++)
    {
        slides[i].style.display = "none";
    }
    if(slideIndex < 1)
    {
        slideIndex = slides.length;   
    }
    if(slideIndex > slides.length)
    {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "grid";
    if(window.innerWidth > 768)
        document.body.style.backgroundImage = "url(" + backgroundImg[slideIndex - 1].toString() + ")";
    slideIndex += 1;
    if(slideTimeoutID != null)
        clearTimeout(slideTimeoutID);
    slideTimeoutID = setTimeout(showSlides, 3000);
}

function nextSlide()
{
    showSlides();
}

function prevSlide()
{
    slideIndex -= 2;
    showSlides();
}

window.addEventListener("resize", ()=>{
    if(window.innerWidth <= 768)
    {    
        document.body.style.backgroundImage = "none";
    }
    else 
    {
        document.body.style.backgroundImage = "url(" + backgroundImg[slideIndex - 2].toString() + ")";
    }
});

window.addEventListener("resize", changePageContent);

document.getElementById("pgDestinatii").addEventListener("click", () => {
    localStorage.setItem("selectedCountry", null);
});
