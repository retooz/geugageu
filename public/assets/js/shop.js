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

let viewAllItems = []
let viewBestItems = []
let bestItems = []
let sortDirection = null; // 높은가격 + 낮은가격을 위한 전역변수값
let allItems = []; // 높은가격 + 낮은가격을 위한 전역변수값
let favList = [''];
let bs = 0;

function getCurrentCategory() {
    const url = window.location.pathname; // 현재페이지의 url을 가져옵니다
    const category = url.split('/').pop(); //urlpath를 '/'기준으로 나누어서 맨 마지막 요소, 즉 카테고리 값을 얻습니다.
    return category;
}

// 아이템 로드 함수
function loadItems(page) {
    const category = getCurrentCategory();
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            $.ajax({
                url: `http://localhost:3333/shop/${category}/${page}`,
                type: 'GET',
                success: function (result) {
                    if (result.favList != undefined) {
                        favList = result.favList;
                    }
                    allItems = [...result.result]
                    viewAllItems = [...result.result]
                    bestItems = [...allItems.filter((value) => value.best_sell == "Y")]
                    viewBestItems = [...allItems.filter((value) => value.best_sell == "Y")]
                    console.log('done')
                    resolve(result.result);
                },
                error: function (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }, 600)
    });
}

function renderItems(items) {
    items.forEach(function (item) {
        if (favList.includes(item.p_id)) {
            // 템플릿 동적 생성
            const newItem = `
            <article>
                <a href="/product/${item.p_id}">
                    <div class="thumb">
                        <div class="image-container">
                            <img src="${item.img_url}">
                        </div>
                    </div>
                    <div class="desc-container">
                        <h2>${item.p_name}</h2>
                        <p>${item.p_type}<</p>
                        <div class="price">${item.p_price.toLocaleString()}</div>
                        <div>★ (${item.rat_value})</div>
                    </div>
                </a>
                <button class="wishlist-button" id="${item.p_id}">
                <div style="display:none;>
                <i class="far fa-heart"></i> 
                </div>
                <div class="filled">
                <i class="fas fa-heart filled"></i>
                </div>
                </button>
            </article>
            `;
            $(".list").append(newItem);
        } else {
            // 템플릿 동적 생성
            const newItem = `
            <article>
                <a href="/product/${item.p_id}">
                    <div class="thumb">
                        <div class="image-container">
                            <img src="${item.img_url}">
                        </div>
                    </div>
                    <div class="desc-container">
                        <h2>${item.p_name}</h2>
                        <p>${item.p_type}<</p>
                        <div class="price">${item.p_price.toLocaleString()}</div>
                        <div>★ (${item.rat_value})</div>
                    </div>
                </a>
                <button class="wishlist-button" id="${item.p_id}">
                    <div>
                    <i class="far fa-heart"></i> 
                    </div>
                    <div class="filled" style="display:none;>
                    <i class="fas fa-heart filled"></i>
                    </div>
                </button>
            </article>
        `;
            $(".list").append(newItem);
        }
    });
}

// 정렬 함수
function sortItems(items, direction, sortBy) {
    if (sortBy === "rating") {
        return items.sort((a, b) => b.rat_value - a.rat_value);
    } else {
        let priceSort = items.sort((a, b) => direction === "asc" ? a.p_price - b.p_price : b.p_price - a.p_price)
        return priceSort;
    }
}

function filterItems(items, colors) {
    const filteredItems = items.filter((value) => colors.includes(value.colors));
    return filteredItems;
}

function loadFilteredBestItems() {
    if (currentPage === 0) {
        $(".list article").remove();
    }
    if (bestItems.length === 0) {
        loadItems().then(items => {
            bestItems = filterItems(items, selectedColors);
            renderItems(bestItems.slice(0, itemsPerPage));
            currentPage++;
        })
    } else {
        bestItems = [...viewBestItems]
        bestItems = filterItems(bestItems, selectedColors);
        const start = currentPage * itemsPerPage;
        const slicedItems = bestItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
}

function loadFilteredItems() {
    if (currentPage === 0) {
        $(".list article").remove();
    }
    if (allItems.length === 0) {
        loadItems().then(items => {
            allItems = filterItems(items, selectedColors);
            renderItems(allItems.slice(0, itemsPerPage));
            currentPage++;
        })
    } else {
        allItems = filterItems(viewAllItems, selectedColors);
        const start = currentPage * itemsPerPage;
        const slicedItems = allItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
}

function renderBestAll() {
    $(".list article").remove();
    const start = currentPage * itemsPerPage;
    const slicedItems = viewBestItems.slice(start, start + itemsPerPage);
    renderItems(slicedItems);
    currentPage++;
}

function renderAllItems() {
    if (currentPage === 0) {
        $(".list article").remove();
    }
    const start = currentPage * itemsPerPage;
    const slicedItems = viewAllItems.slice(start, start + itemsPerPage);
    renderItems(slicedItems);
    currentPage++;
}

function loadSortedItems() {
    if (currentPage === 0) {
        $(".list article").remove();
    }
    if (allItems.length === 0) {
        loadItems().then(items => {
            allItems = items;
            const sortedItems = sortItems(items, sortDirection);
            renderItems(sortedItems.slice(0, itemsPerPage));
            currentPage++;
        });
    } else {
        allItems = [...viewAllItems]
        let sortedItems
        if (sortDirection === 'rating'){
            sortedItems = sortItems(allItems, 'desc', 'rating');
        } else {
            sortedItems = sortItems(allItems, sortDirection)
        }
        const start = currentPage * itemsPerPage;
        const slicedItems = sortedItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
}

function loadSortedFilterdItems() {
    if (currentPage === 0) {
        $(".list article").remove();
    }
    if (allItems.length === 0) {
        loadItems().then(items => {
            allItems = filterItems(items, selectedColors);
            allItems = sortItems(allItems, sortDirection);
            renderItems(allItems.slice(0, itemsPerPage));
            currentPage++;
        });
    } else {
        allItems = [...viewAllItems]
        const filteredItems = filterItems(allItems, selectedColors);
        let sortedItems
        if (sortDirection === 'rating'){
            sortedItems = sortItems(filteredItems, 'desc', 'rating');
        } else {
            sortedItems = sortItems(filteredItems, sortDirection)
        }
        const start = currentPage * itemsPerPage;
        const slicedItems = sortedItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
}

// 더 보기 버튼 클릭 이벤트
$("#loadMore").on("click", function () {
    bs = 0;
    if (sortDirection == null && selectedColors < 2) {
        renderAllItems()
    } else if (sortDirection == null) {
        console.log('filtered')
        loadFilteredItems();
    } else if (selectedColors.length < 2) {
        console.log('sorted')
        loadSortedItems();
    } else {
        console.log('filtered sorted')
        loadSortedFilterdItems();
    };
});

// 정렬 버튼 클릭 이벤트
$("#sortHighPrice, #sortLowPrice").on("click", function () {
    bs = 0;
    $("#loadMore").show()
    sortDirection = $(this).data("sort");
    currentPage = 0;
    if (selectedColors.length > 1) {
        loadSortedFilterdItems();
    } else {
        loadSortedItems();
    }
});

// 별점 정렬 버튼
$("#sortHighRating").on("click", function () {
    bs = 0;
    console.log('rating')
    $("#loadMore").show()
    sortDirection = "rating";
    currentPage = 0;
    if (selectedColors.length > 1) {
        loadSortedFilterdItems();
    } else {
        loadSortedItems();
    }
    if (allItems.length - (12 * currentPage) < 12) {
        $("#loadMore").hide()
    }

});

// 전체 보기 버튼
$("#showAll").on("click", function () {
    bs = 0;
    $("#loadMore").show()
    sortDirection = null;
    currentPage = 0;
    if (selectedColors.length > 1) {
        loadFilteredItems()
    } else {
        renderAllItems()
    }
    if (viewAllItems.length - (12 * currentPage) < 12) {
        $("#loadMore").hide()
    }
})

// 베스트셀러 버튼
$("#bestSell").on("click", function () {
    bs = 1;
    $("#loadMore").show()
    $(".list article").not(".sort").remove();
    if (selectedColors.length > 1) {
        bestItems = [...viewBestItems]
        bestItems = filterItems(bestItems, selectedColors)
    } else {
        bestItems = [...viewBestItems]
    }
    renderItems(bestItems.slice(0, itemsPerPage));
    currentPage = 0;
    currentPage++;
    if (bestItems.length - (12 * currentPage) < 12) {
        $("#loadMore").hide()
    }
})


// 기본 화면에서의 오류 수정 
// 더보기를 했을 때 똑같은 값이 한번 더 나옴
function init() {
    loadItems().then(items => {
        allItems = items;
        currentPage++; // 페이지를 2로 설정해 기본형 화면에서 더 보기를 누를 때 나중 값들이 나오도록 합니다.
    });
}

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
    $(".slider > ul").bxSlider({
        easing: "linear",
        auto: true, // 자동으로 슬라이드 전환 활성화
        pause: 2500, // 각 슬라이드마다 1000ms(1초)마다 멈춤
    });
    // 초기 로드
    let wishlist = $('.wishlist-button')
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

    init();
});