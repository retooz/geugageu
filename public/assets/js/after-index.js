const swiper = new Swiper('.swiper', {
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    },
    navigation : {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    slidesPerView: 4,
    spaceBetween: 50,
    centeredSlides: true,
    mousewheel: {
        invert: false,
    },
    initialSlide: 1,
    autoHeight: true,
    speed: 600,
});