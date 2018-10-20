const domGalleryThumbnail = document.getElementById("gallery-thumbnail");

const gallery = {
    gallery: [],
    maxShown: null,
    currentSelected: 0,
    domMainImage: null,
    domThumbnailHolder: null,
    initalize: function(imageArray, thumbnailId, mainImgId){
        
        if(!isNaN(imageArray))
        {
            this.makeRandomGallery(imageArray);
        }
        else
        {
            this.setGallery(imageArray);
        }

        this.domMainImage = document.getElementById(mainImgId);
        this.domThumbnailHolder = document.getElementById(thumbnailId);

        gallery.determineMaxThumbnails();
        gallery.populateGallery();
        
        addEventListener('resize', function() {
            gallery.determineMaxThumbnails();
            gallery.populateThumbnails();
        });

        return this;
    },
    determineMaxThumbnails: function(){
        if(document.documentElement.clientWidth > 1200 || window.innerWidth > 1200){
            if(this.gallery.length > 9)
            {
                this.maxShown = 9;
            }
            else{
                this.maxShown = this.gallery.length;
            }
            
        }
        else if(document.documentElement.clientWidth > 900 || window.innerWidth > 900){
            if(this.gallery.length > 7)
            {
                this.maxShown = 7;
            }
            else{
                this.maxShown = this.gallery.length;
            }
        }
        else if(document.documentElement.clientWidth > 720 || window.innerWidth > 720){
            if(this.gallery.length > 5)
            {
                this.maxShown = 5;
            }
            else{
                this.maxShown = this.gallery.length;
            }
        }
        else if(document.documentElement.clientWidth > 530 || window.innerWidth > 530){
            if(this.gallery.length > 3)
            {
                this.maxShown = 3;
            }
            else{
                this.maxShown = this.gallery.length;
            }
        }
        else{
            this.maxShown = 0;
        }
    },
    createThumbnailElemenet: function(galleryIndex){
        domNewImg = document.createElement("img");
        domNewImg.src = this.gallery[galleryIndex];
        domNewImg.classList.add("m-2");
        domNewImg.style.width = "75px"
        if(this.galleryIndex === this.currentSelected)
        {
            domNewImg.classList.add("border", "border-danger");
        }
        domGalleryThumbnail.appendChild(domNewImg);
        
        let galleryObj = this;

        domNewImg.addEventListener("click" , function()
        {
            galleryObj.currentSelected = galleryObj.gallery.indexOf(this.src);
            galleryObj.populateThumbnails();
            galleryObj.changeMainImage();
        })
    },
    populateGallery: function(){
        this.populateThumbnails();
        this.changeMainImage();

        let galleryObj = this;

    },
    makeRandomGallery: function(numOfPics){
        for(let i = 0; i < numOfPics; i++)
        {
            
            this.gallery.push("https://picsum.photos/" + randomImageSize(1500) + "x" + randomImageSize(1500) + "?random" + i);
        }

        function randomImageSize(max)
        {
            return Math.floor(Math.random() * Math.floor(max));
        }
    },
    changeMainImage: function() {
        let domMainImg = document.getElementById("main-gallery-img");

        domMainImg.src = this.gallery[this.currentSelected];
    },
    populateThumbnails: function() {
        this.domThumbnailHolder.innerHTML = "";

        if(this.currentSelected === 0)
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
    addThumbnailCss: function(){

    },
    removeThumbnailCss: function(){

    },
    addThumbnailClass: function(){

    },
    removeThumbnailClass: function(){

    },
    setGallery: function(array){

    },
    setMainImageId: function(mainImageId){

    },
    setThumbnailHolderId: function(thumbnailId){

    },
    setButtons: function(leftButtonId, rightButtonId)
    {
        galleryObj = this;

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
    }

    
}



gallery.initalize(100, "gallery-thumbnail", "main-gallery-img").setButtons("gallery-left", "gallery-right");

