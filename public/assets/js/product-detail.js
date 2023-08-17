$('#write-review-btn').on('click', function () {
    if ($('.review-form').css('display') == 'none') {
        $('.review-form').css('display', 'block');
    }
    else {
        $('.review-form').css('display', 'none');
    }
})

function addWishList(p_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3333/shop/favAdd/${p_id}`,
            type: 'POST',
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                console.log(error);
                reject(error);
            }
        });
    });
}

function delWishList(p_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3333/shop/favDel/${p_id}`,
            type: 'POST',
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                console.log(error);
                reject(error);
            }
        });
    });
}

$(document).ready(function () {
    let wishlist = $('.mark')
    wishlist.click(function () {
        let filled = $(this).find('div.filled')
        let id = $(this).attr('id')
        if (filled.css('display') == 'none') {
            addWishList(id)
        } else {
            delWishList(id)
        }
        $(this).find('div').toggle()
    })
})