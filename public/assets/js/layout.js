$('.header-menubar').on('click', function () {
    $('.submenu').css('visibility', 'visible');
    $('.submenu').addClass('show_menu');
    $('.header-menubar').css('visibility', 'hidden');
});

$('.submenu-close').on('click', function () {
    $('.submenu').removeClass('show_menu');
    $('.submenu').css('visibility', 'hidden');
    $('.header-menubar').css('visibility', 'visible');
});

$('.header-login-btn').on('click', function () {
    $('.modal').fadeIn()
})

$('.btn-close').click(function () {
    $('.modal').fadeOut()
})

$(document).ready(function () {
    $('#scroll-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
    });
});
