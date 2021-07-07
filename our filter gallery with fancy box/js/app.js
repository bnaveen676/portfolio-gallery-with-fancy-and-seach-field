//start preloader
$(window).on('load', () => {
    $(".preloader").fadeOut(800);
    $(".preloadContainer").delay(800).fadeOut(1000);
});
// end preloader

// start filter image into array
const filterImages = [

    // start mobile
    { id: 1, url: '../img/filterImageGallery/mobile/mobile (1).jpg', category: 'mobile' },
    { id: 2, url: '../img/filterImageGallery/mobile/mobile (2).jpg', category: 'mobile' },
    { id: 3, url: '../img/filterImageGallery/mobile/mobile (3).jpg', category: 'mobile' },
    { id: 4, url: '../img/filterImageGallery/mobile/mobile (4).jpg', category: 'mobile' },
    { id: 5, url: '../img/filterImageGallery/mobile/mobile (5).jpg', category: 'mobile' },
    { id: 6, url: '../img/filterImageGallery/mobile/mobile (6).jpg', category: 'mobile' },
    // start car
    { id: 8, url: '../img/filterImageGallery/car/car (1).jpg', category: 'car' },
    { id: 9, url: '../img/filterImageGallery/car/car (1).png', category: 'car' },
    { id: 10, url: '../img/filterImageGallery/car/car (2).jpg', category: 'car' },
    { id: 11, url: '../img/filterImageGallery/car/car (3).jpg', category: 'car' },
    { id: 12, url: '../img/filterImageGallery/car/car (4).jpg', category: 'car' },
    { id: 13, url: '../img/filterImageGallery/car/car (5).jpg', category: 'car' },
    // start bike
    { id: 14, url: '../img/filterImageGallery/bike/bike (1).jpg', category: 'bike' },
    { id: 15, url: '../img/filterImageGallery/bike/bike (2).jpg', category: 'bike' },
    { id: 16, url: '../img/filterImageGallery/bike/bike (3).jpg', category: 'bike' },
    { id: 17, url: '../img/filterImageGallery/bike/bike (4).jpg', category: 'bike' },
    { id: 18, url: '../img/filterImageGallery/bike/bike (5).jpg', category: 'bike' },
    // start laptop
    { id: 19, url: '../img/filterImageGallery/laptop/laptop (1).jpg', category: 'laptop' },
    { id: 20, url: '../img/filterImageGallery/laptop/laptop (1).png', category: 'laptop' },
    { id: 21, url: '../img/filterImageGallery/laptop/laptop (2).jpg', category: 'laptop' },
    { id: 22, url: '../img/filterImageGallery/laptop/laptop (3).jpg', category: 'laptop' },
    { id: 23, url: '../img/filterImageGallery/laptop/laptop (4).jpg', category: 'laptop' },
    { id: 24, url: '../img/filterImageGallery/laptop/laptop (5).jpg', category: 'laptop' },

];


class FilterGallery {
    galleryMethod(obj, elements) {
        $(elements.buttons).each((i, btn) => {
            $(btn).on(elements.eventName, (e) => {
                // active current button with color 
                const correntBtn = e.currentTarget;
                $(elements.buttons).each((id, elementOfbtn) => {
                    if (correntBtn !== elementOfbtn) {
                        $(elementOfbtn).removeClass(elements.className);
                    }
                });
                $(correntBtn).toggleClass(elements.className);

                const correnAtr = $(correntBtn).attr(elements.attrName);

                $(obj).each((idx, ele) => {
                    const matchAtr = $(ele).children().children().attr(elements.matchName);
                    if (matchAtr === correnAtr) {
                        $(ele).show(300);
                    } else if (correnAtr === 'all') {
                        $(ele).show(300);
                    } else {
                        $(ele).hide(300);
                    }
                });

            });
        });

    }
    reuseComp(data, ele) {
        // get elements
        let imageObjects = data.map((imageObj) => {
            return `<div class="imageContainer">
                       <a data-fancybox="gallery" data-caption="${imageObj.category}" href="${imageObj.url}"><img src="${imageObj.url}" alt="image" data-match="${imageObj.category}"></a>
                    </div>`;
        });
        const getImageComp = imageObjects.join('');
        $(ele.filterImageCon).html(getImageComp);

    }

    searchFilter(gallery, elements) {
        $(elements.searchField).on(elements.eventName, () => {
            const matchSearhValue = $(elements.searchField).val().toLowerCase();
            $(gallery).each((index, ele) => {
                const img = $(ele).children().children()[0];
                const matchAtrr = $(img).attr(elements.dataMatch);
                if (matchAtrr === matchSearhValue) {
                    $(ele).show(300);
                } else if (matchSearhValue === 'all') {
                    $(gallery).show(300);
                } else {
                    $(ele).hide(300);
                }
            });
        });
    }
}

// end filter image into array


// dom content loaded
$(() => {
    //  filter image
    const gallery = new FilterGallery;
    // reuse filter images
    gallery.reuseComp(filterImages, {
        filterImageCon: '.filterImages',
    });
    // 
    gallery.galleryMethod('.imageContainer', {
        filterImageCon: '.filterImages',
        buttons: '.filterButtons > button',
        eventName: 'click',
        className: 'active',
        attrName: 'data-filter',
        matchName: 'data-match'
    });
    // startfancy light boc
    $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
        loop: true,
        buttons: [
            "zoom",
            "share",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],

        animationEffect: 'circular',
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        animationDuration: 2000

    });
    // start search filed
    gallery.searchFilter('.imageContainer', {
        searchField: '.inputContainer input',
        eventName: 'keyup',
        dataMatch: 'data-match'

    });
});