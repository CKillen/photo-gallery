# Photo Gallery

A flexible, responsive photo gallery made with vanilla JavaScript. It is easy to implement and eliminates the need for
the logic that is required to have a photo gallery within a website.

## Functions

### init(images, thumbnailHolderId, mainImageId)
#### Description
Initializes the gallery
#### Chainable
#### Parameters
###### images - Either a number or an array of sources for images. A number will generate that many random images, while an array will generate the images in the array
  
###### thumbnailHolderId - The ID of the thumbnailHolder (where thumbnails will be stored)

###### mainImageId - the ID of the mainImage (where the MainImage will be stored)
#### Examples 
###### gallery.init(5, "my-thumbnail-place", "my-main-img") makes a gallery with 5 random images
###### gallery.init(["kitten.png", "kitten2.png"] , "my-thumbnail-place", "my-main-img") makes a gallery with kitten and kitten2


### populateGallery()
#### Description
populates the thumbnails and the main image, used after changes
#### Nonchainable
#### Parameters
###### none
#### Examples
###### gallery.changeMainImage("kitten.png").populateGallery() populates the gallery after changing image


### changeMainImage(src)
#### Description
Changes the current image to the new specified img that matches the src given, must call populateGallery() to see changes
#### Chainable
#### Parameters
###### src - src of image to change to
#### Examples
###### gallery.changeMainImage("kitten.png").populateGallery() changes main image to the image with a src of kitten.png


### addThumbnailClass(newClass)
#### Description
Adds a new class to ALL thumbnails, can add multiple classes with spaces but multiple classes must be removed the same way
#### Chainable
#### Parameters
###### newClass - Class to add to thumbnails
#### Examples
###### gallery.addThumbnailClass("thumbnails").populateGallery() Adds class thumbnails to all thumbnails
###### gallery.addThumbnailClass("border border-danager").populateGallery() Adds border border-danger to all thumbnails 
##### NOTE: This can only be removed by removing both at the same time such as .removeThumbnailClass("border border-danger")

### addCurrentThumbnailClass(newClass)
#### Description
Adds a new class to currently selected thumbnail, can add multiple classes with spaces but multiple classes must be removed the same way
#### Chainable
#### Parameters
###### newClass - Class to add to currently selected thumbnail
#### Examples
###### gallery.addCurrentThumbnailClass("current").populateGallery() Adds class current currently selected thumbnail
###### gallery.addCurrentThumbnailClass("border border-danager").populateGallery() Adds border border-danger to currently selected thumbnail
##### NOTE: This can only be removed by removing both at the same time such as .removeCurrentThumbnailClass("border border-danger")

### removeThumbnailClass(removeClass)
#### Description
removes class from all thumbnails
#### Chainable
#### Parameters
###### newClass - Class to remove from all thumbnails
#### Examples
###### gallery.removeThumbnailClass("thumbnail").populateGallery() removes thumbnail class from all thumbnails
###### gallery.removeThumbnailClass("border border-danager").populateGallery() removes border border-danger ONLY if it was declared the same way

### removeCurrentThumbnailClass(removeClass)
#### Description
removes class from currently selected thumbnail
#### Chainable
#### Parameters
###### newClass - Class to remove from currently selected thumbnail
#### Examples
###### gallery.removeCurrentThumbnailClass("current").populateGallery() removes current class from currently selected thumbnail
###### gallery.removeCurrentThumbnailClass("border border-danager").populateGallery() removes border border-danger ONLY if it was declared the same way


### setGallery(array)
#### Description
Sets the gallery to the passed array of image srcs
#### Chainable
#### Parameters
###### array - array of image srcs
#### Examples
###### gallery.setGallery(['dog.png', 'dog1.png']).populateGallery() Sets gallery to dog.png and dog1.png


### setMainImageId(mainImageId)
#### Description
Sets the main image to dispaly in the div that's ID was passed 
#### Chainable
#### Parameters
###### mainImageId - the ID of the div the main image is needed to display in
#### Examples
###### gallery.mainImageId("new-main-image-div").populateGallery() Displays the main image in div with id new-main-image-div



### setThumbnailHolderId(thumbnailHolderId)
#### Description
Sets the div where thumbnails are to be held 
#### Chainable
#### Parameters
###### thumbnailHolderDiv - the ID of the div where the thumbnails are to be displayed
#### Examples
###### gallery.thumbnailHolderDiv("new-thumbnail-div").populateGallery() Displays the thumbnails inside of the new-thumbnail-div



### setButtons(leftButtonId, rightButtonId)
#### Description
Sets buttons for navigating through thumbnails
#### Chainable
#### Parameters 
###### leftButtonId - ID of the left button 
###### rightButtonId - ID of the right button
#### Examples
###### gallery.setButtons("left-button", "right-button")

