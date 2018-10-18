console.log('hello');
const domGalleryThumbnail = document.getElementById("gallery-thumbnail");
let currentSelected = 0;
const maxShown = 5;


const gallery = ["http://placehold.it/30x31", "http://placehold.it/30x32", "http://placehold.it/30x33", "http://placehold.it/30x34", "http://placehold.it/30x30", "http://placehold.it/30x31", "http://placehold.it/30x32", "http://placehold.it/30x33", "http://placehold.it/30x34", "http://placehold.it/30x30"];

populateThumbnails();

document.getElementById("gallery-left").addEventListener("click" ,function(){
    if(currentSelected !== 0)
    {
        currentSelected--;
        populateThumbnails();
    }
});

document.getElementById("gallery-right").addEventListener("click" , function(){
    if(currentSelected < gallery.length - 1)
    {
        currentSelected++;
        populateThumbnails();
    }
});


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
}

