$('.header-menubar').on('click', function() {
    $('.submenu').css('visibility', 'visible');
    $('.submenu').addClass('show_menu');
    $('.header-menubar').css('visibility', 'hidden');
});

$('.submenu-close').on('click', function() {
    $('.submenu').removeClass('show_menu');
    $('.submenu').css('visibility', 'hidden');
    $('.header-menubar').css('visibility', 'visible');
});



