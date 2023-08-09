$('.submenu-login').click(function(){
    $('.modal').fadeIn()
    $('.submenu').removeClass('show_menu');
    $('.header-menubar').css('visibility', 'visible');
})
$('.btn-close').click(function(){
    $('.modal').fadeOut()
})

const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    mousewheel: {
        invert: false,
    },
    autoHeight: true,
    speed: 600,
});