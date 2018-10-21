const domGalleryThumbnail = document.getElementById("gallery-thumbnail");

const gallery = {
    gallery: [],
    maxShown: null,
    currentSelected: 0,
    domMainImage: null,
    thumbnailClasses: [],
    currentThumbnailClasses: [],
    domThumbnailHolder: null,
    initalize: function(imageArray, thumbnailId, mainImgId){

        //set object for populating thumbnails and main image
        this.setMainImageId(mainImgId);
        this.setThumbnailHolderId(thumbnailId);
        
        //Determine if user passes an array of imgs or if passing a number for random images
        if(!isNaN(imageArray))
        {
            this.makeRandomGallery(imageArray);
        }
        else
        {
            this.setGallery(imageArray);
        }

        //determine screen size and how many thumbnails should be displayed
        this.determineMaxThumbnails();
        //populate the thumbnails and main image
        this.populateGallery();
        
        //need to assign this to a varaiable do to addEventListener being outside of the context of the object
        const galleryObj = this;

        //add event listener for resize of the screen
        addEventListener('resize', function() {
            galleryObj.determineMaxThumbnails();
            galleryObj.populateThumbnails();
        });

        //this is a chainable function
        return this;
    },
    determineMaxThumbnails: function(){
        //helper function needs an object with the value of this
        const galleryObj = this;

        //determine screen size and how many thumbnails to display
        //would like to make this user customizable as well possible having an object 
        // that has { 1200: 9; } then loop through each property to determine the screen 
        //deimensions/maxthumbnails
        if(document.documentElement.clientWidth > 1200 || window.innerWidth > 1200){
            gallerySizeCheck(9);            
        }
        else if(document.documentElement.clientWidth > 900 || window.innerWidth > 900){
            gallerySizeCheck(7);
        }
        else if(document.documentElement.clientWidth > 720 || window.innerWidth > 720){
            gallerySizeCheck(5);
        }
        else if(document.documentElement.clientWidth > 550 || window.innerWidth > 550){
            gallerySizeCheck(3);
        }
        else{
            this.maxShown = 0;
        }
            
            //helper function to see if gallery is less then max
            
            function gallerySizeCheck(maxShownConstant)
            {
                if(galleryObj.gallery.length > maxShownConstant)
                {
                    galleryObj.maxShown = maxShownConstant;
                }
                else{
                    galleryObj.maxShown = galleryObj.gallery.length;
                }
            }
    },
    createThumbnailElemenet: function(galleryIndex){
        domNewImg = document.createElement("img");
        //add classes
        domNewImg.src = this.gallery[galleryIndex];

        attachClasses(this.thumbnailClasses, domNewImg);

        domNewImg.style.width = "75px"

        if(galleryIndex === this.currentSelected)
        {
            //add currentClass
            attachClasses(this.currentThumbnailClasses, domNewImg);
        }

        domGalleryThumbnail.appendChild(domNewImg);
    
        //helper function to loop through classes and attach on to new img
        function attachClasses(classArray, element)
        {
            
            for(let i = 0; i < classArray.length; i++)
            {
                element.className += " " + classArray[i];
            }
        }

        //need for event listener
        let galleryObj = this;

        domNewImg.addEventListener("click" , function()
        {
            //this.src returns the absolute path, this gets the src directly from the html which will be exactly what the 
            //user passes everytime
            let firstQuote = this.outerHTML.indexOf('"' , this.outerHTML.indexOf('src')) + 1;
            relativeSrc = this.outerHTML.substring(firstQuote , this.outerHTML.indexOf('"', firstQuote));

            galleryObj.currentSelected = galleryObj.gallery.indexOf(relativeSrc);

            galleryObj.populateGallery();
        })
    },
    populateGallery: function(){
        this.populateThumbnails();
        this.changeMainImage();

        //this doesn't return this because it should be used at the end of chains to show changes
    },
    makeRandomGallery: function(numOfPics){
        for(let i = 0; i < numOfPics; i++)
        {
            this.gallery.push("https://picsum.photos/" + randomImageSize(1500) + "x" + randomImageSize(1500) + "?random" + i);
        }
            //helper function to randomize images
            function randomImageSize(max)
            {
                return Math.floor(Math.random() * Math.floor(max));
            }
    },
    changeMainImage: function(src) {

        //check if src is given if not skip this and just change image
        if(src !== undefined && src !== null)
        {
            this.currentSelected = this.gallery.indexOf(src);
        }

        this.domMainImage.src = this.gallery[this.currentSelected];

        return this;
    },
    populateThumbnails: function() {
        this.domThumbnailHolder.innerHTML = "";

        if(this.currentSelected === 0 || this.gallery.length === this.maxShown)
        {
            for(let i = 0; i < this.maxShown; i++)
            {
                this.createThumbnailElemenet(i);
            }
        }
        else if(this.currentSelected === this.gallery.length - 1)
        {
            for(let i = this.gallery.length - this.maxShown; i < this.gallery.length; i++)
            {
                this.createThumbnailElemenet(i);
            }
        }
        else if(this.currentSelected - (this.maxShown / 2) < 0)
        {
            for(let i = 0; i < this.maxShown; i++)
            {
                this.createThumbnailElemenet(i);
            }
        }
        else if(this.currentSelected + (this.maxShown / 2) > this.gallery.length)
        {
            for(let i = this.gallery.length - this.maxShown; i < this.gallery.length; i++)
            {
                 this.createThumbnailElemenet(i);
            }        
        }
        else if(this.currentSelected > 0 && this.currentSelected < this.gallery.length)
        {
            for(let i = this.currentSelected - ((this.maxShown - 1) / 2); i <= this.currentSelected + ((this.maxShown - 1) / 2); i++)
            {
                this.createThumbnailElemenet(i);
            }        
        }
    },
    addThumbnailClass: function(newClass){
        //push to thumbnail class array
        this.thumbnailClasses.push(newClass);
        //repopulate thumbnails to show change
        this.populateThumbnails();

        return this;
    },
    removeThumbnailClass: function(removeClass){
        //find and remove class from array
        let indexOfClass = this.thumbnailClasses.indexOf(removeClass);

        if(indexOfClass !== -1)
        {
            this.thumbnailClasses.splice(indexOfClass, 1);
        }

        //repopulate thumbnails to show change
        this.populateThumbnails();

        return this;
    },  
    addCurrentThumbnailClass: function(newClass){
        //push to currentThumbnailArray
        this.currentThumbnailClasses.push(newClass);

        //repopulate thumbnails to show change
        this.populateThumbnails();

        return this;
    },
    removeCurrentThumbnailClass: function(removeClass){
        //find and remove class from array
        let indexOfClass = this.currentThumbnailClasses.indexOf(removeClass);

        if(indexOfClass !== -1)
        {
            this.currentThumbnailClasses.splice(indexOfClass, 1);
        }
        //repopulate thumbnails to show change
        this.populateThumbnails();

        return this;
    },
    setGallery: function(array){
        this.gallery = array;
        this.currentSelected = 0;

        this.determineMaxThumbnails();
        this.populateGallery();
        
        //Make chainable
        return this;
    },
    setMainImageId: function(mainImageSrc){
        this.domMainImage = document.getElementById(mainImageSrc);

        return this;
    },
    setThumbnailHolderId: function(thumbnailId){
        this.domThumbnailHolder = document.getElementById(thumbnailId);

        return this;
    },
    setButtons: function(leftButtonId, rightButtonId)
    {
        let galleryObj = this;

        document.getElementById(leftButtonId).addEventListener("click" ,function(){
            if(galleryObj.currentSelected !== 0)
            {
                galleryObj.currentSelected--;
                galleryObj.populateThumbnails();
                galleryObj.changeMainImage();
            }
        });
        
        document.getElementById(rightButtonId).addEventListener("click" , function(){
            if(galleryObj.currentSelected < galleryObj.gallery.length - 1)
            {
                galleryObj.currentSelected++;
                galleryObj.populateThumbnails();
                galleryObj.changeMainImage();
            }
        });

        return this;
    }

    
}

images = ["assets/images/untitled-5.jpg" , "assets/images/untitled-11.jpg" , "assets/images/untitled-12.jpg" , 
    "assets/images/untitled-15.jpg" , "assets/images/untitled-16.jpg" , "assets/images/untitled-22.jpg" ,
    "assets/images/untitled-23.jpg" , "assets/images/untitled-33.jpg" , "assets/images/untitled-35.jpg" ,
    "assets/images/untitled-37.jpg" , "assets/images/untitled-38.jpg" , "assets/images/untitled-43.jpg" , 
    "assets/images/untitled-46.jpg"]

gallery.initalize(8, "gallery-thumbnail", "main-gallery-img").setButtons("gallery-left", "gallery-right");

gallery.addThumbnailClass("m-2").addCurrentThumbnailClass("border border-danger");

