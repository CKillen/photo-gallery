const domGalleryThumbnail = document.getElementById("gallery-thumbnail");

const maxShown = 5;

let currentSelected = 0;



const gallery = [ "http://placehold.it/400x500", "http://placehold.it/400x501", "http://placehold.it/400x502", "http://placehold.it/400x504", "http://placehold.it/400x505", "http://placehold.it/400x506", "http://placehold.it/400x507", "http://placehold.it/400x508", "http://placehold.it/800x600"];

populateThumbnails();
changeMainImage();

//add event click listener on thumbnails so you dont have to use arrow
Array.from

document.getElementById("gallery-left").addEventListener("click" ,function(){
    if(currentSelected !== 0)
    {
        currentSelected--;
        populateThumbnails();
        changeMainImage();
    }
});

document.getElementById("gallery-right").addEventListener("click" , function(){
    if(currentSelected < gallery.length - 1)
    {
        currentSelected++;
        populateThumbnails();
        changeMainImage();
    }
});



function changeMainImage()
{
    let domMainImg = document.getElementById("main-gallery-img");

    domMainImg.src = gallery[currentSelected];
}


function populateThumbnails()
{
    domGalleryThumbnail.innerHTML = "";

    if(currentSelected === 0)
    {
        for(let i = 0; i < maxShown; i++)
        {
            createThumbnailElemenet(i);
            
        }
    }
    else if(currentSelected === gallery.length - 1)
    {
        for(let i = gallery.length - maxShown; i < gallery.length; i++)
        {
            createThumbnailElemenet(i);
        }
    }
    else if(currentSelected - (maxShown / 2) < 0)
    {
        for(let i = 0; i < maxShown; i++)
        {
            createThumbnailElemenet(i);
        }
    }
    else if(currentSelected + (maxShown / 2) > gallery.length)
    {
        console.log("here");
        for(let i = gallery.length - maxShown; i < gallery.length; i++)
        {
            createThumbnailElemenet(i);
        }        
    }
    else if(currentSelected > 0 && currentSelected < gallery.length)
    {
        for(let i = currentSelected - ((maxShown - 1) / 2); i <= currentSelected + ((maxShown - 1) / 2); i++)
        {
            createThumbnailElemenet(i);
        }        
    }


    

}

function createThumbnailElemenet(galleryIndex)
{
    domNewImg = document.createElement("img");
    domNewImg.src = gallery[galleryIndex];
    domNewImg.classList.add("m-2");
    domNewImg.style.width = "75px"
    if(galleryIndex === currentSelected)
    {
        domNewImg.classList.add("border", "border-danger");
    }
    domGalleryThumbnail.appendChild(domNewImg);
    domNewImg.addEventListener("click" , function()
    {
        currentSelected = gallery.indexOf(this.src);
        populateThumbnails();
        changeMainImage();
    })
}

