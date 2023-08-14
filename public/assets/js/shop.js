
$(document).ready(function () {
    $(".slider > ul").bxSlider({
        easing: "linear",
        auto: true, // 자동으로 슬라이드 전환 활성화
        pause: 2500, // 각 슬라이드마다 1000ms(1초)마다 멈춤
    });
    // 초기 로드
});

$(function () {
    var best = $("aside > .best");

    $(window).scroll(function () {
        var t = $(this).scrollTop();

        if (t > 620) {
            best.css({
                position: "fixed",
                top: "0",
            });
        } else {
            best.css({ position: "static" });
        }
    });
});


// 더보기 버튼
const itemsPerPage = 12; // 한 번에 로드할 아이템 수
let currentPage = 1; // 현재 페이지

// 아이템 로드 함수
function loadItems(page) {
    const category = getCurrentCategory();

    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3333/shop/${category}/${page}`,
            type: 'GET',
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

let sortDirection = null; // 높은가격 & 낮은가격을 위한 전역변수값
let allItems = []; // 높은가격 & 낮은가격을 위한 전역변수값



function renderItems(items) {
    items.forEach(function (item) {
        // 템플릿 동적 생성
        const newItem = `
            <article>
                <a href="${item.pip_url}">
                    <div class="thumb">
                        <div class="image-container">
                            <img src="${item.img_url}">
                        </div>
                    </div>
                    <h2>${item.p_name}</h2>
                    <p>${item.p_type}</p>
                    <div class="price">${item.p_price.toLocaleString()}</div>
                </a>
            </article>
        `;
        $(".list").append(newItem);
    });
}

// 정렬 함수
function sortItems(items, direction, sortBy) {
    if (sortBy === "rating") {
        return items.sort((a, b) => b.rat_value - a.rat_value);
    } else {
        return items.sort((a, b) => direction === "asc" ? a.p_price - b.p_price : b.p_price - a.p_price);
    }
}


function loadSortedItems() {
    if (allItems.length === 0) {
        loadItems().then(items => {
            allItems = sortItems(items, sortDirection);
            renderItems(allItems.slice(0, itemsPerPage));
            currentPage++;
        });
    } else {
        allItems = sortItems(allItems, sortDirection);
        const start = currentPage * itemsPerPage;
        const slicedItems = allItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
}


// 더 보기 버튼 클릭 이벤트
$("#loadMore").on("click", function () {
    if (sortDirection === null) {
        loadItems(currentPage).then(items => {
            const start = currentPage * itemsPerPage;
            const slicedItems = items.slice(start, start + itemsPerPage);
            renderItems(slicedItems);
            currentPage++;
        });
    } else {
        loadSortedItems();
    }
});

//전체보기 함수



// 정렬 버튼 클릭 이벤트
$("#sortHighPrice, #sortLowPrice").on("click", function () {
    sortDirection = $(this).data("sort");
    $(".list article").not(".sort").remove();
    currentPage = 0;

    loadSortedItems();
});




// 기본 화면에서의 오류 수정 
// 더보기를 했을 때 똑같은 값이 한번 더 나옴
function init() {
    loadItems().then(items => {
        allItems = items;
        currentPage++; // 페이지를 2로 설정해 기본형 화면에서 더 보기를 누를 때 나중 값들이 나오도록 합니다.
    });
}

// 처음 실행 시 함수 호출
$(document).ready(function () {
    init();
});


// 하트

$(document).ready(function() {
    $(".wishlist-button").click(function() {
        $(this).toggleClass("active");
        // let heart = $(this).find('.fa-heart')
        // for(i=0; i<heart.length; i++){
        //     console.log(heart[i])
        //     heart[i].toggle()
        // }
        var isFilled = $(this).hasClass("active");
        if (isFilled) {
            console.log($(this).find('.fa-heart.filled'))
            $(this).find(".fa-heart.filled").show();
            $(this).find(".fa-heart").hide();
        } else {
            $(this).find(".filled").hide();
            $(this).find(".far").show();
        }
    });
})








// 별점....?
$(document).ready(function() {
    $(".ratings .star").click(function() {
        $(this).toggleClass("active");
        $(this).prevAll().toggleClass("active");
        $(this).nextAll().removeClass("active");
    });
});
