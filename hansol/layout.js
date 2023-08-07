$('.header-menubar').on('click', function() {
    $('.submenu').addClass('show_menu');
    $('.header-menubar').css('visibility', 'hidden');
});

$('.submenu-close').on('click', function() {
    $('.submenu').removeClass('show_menu');
    $('.header-menubar').css('visibility', 'visible');
});



$('.header-login-btn').click(function(){
    $('.modal').fadeIn()
})
$('.submenu-login').click(function(){
    $('.modal').fadeIn()
})
$('.btn-close').click(function(){
    $('.modal').fadeOut()
})
