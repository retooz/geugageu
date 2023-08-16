
// 더보기 버튼
const itemsPerPage = 12; // 한 번에 로드할 아이템 수
let currentPage = 2; // 현재 페이지
let canLoadMore = true; // 더보기 가능 여부

let viewAllItems = [];
let bestItems = [];

function getCurrentQuery() {
    const url = decodeURI(window.location.pathname); // 현재 페이지의 URL을 가져옵니다.
    const query = url.split('/').pop(); // URLpath를 '/' 기준으로 나누어 맨 마지막 요소, 즉 카테고리 값을 얻습니다.
    return query;
};

// 아이템 로드 함수
function loadItems(page) {
    const query = getCurrentQuery();
    console.log(query)
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3333/search/${query}/${page}`,
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
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

let sortDirection = null; // 높은가격 + 낮은가격을 위한 전역변수값
let allItems = []; // 높은가격 + 낮은가격을 위한 전역변수값

// 더 보기 버튼 클릭 이벤트
$("#loadMore").on("click", function () {
    if (sortDirection === null) {
        loadItems(currentPage).then(items => {
            const start = (currentPage - 1) * itemsPerPage;
            const slicedItems = items.slice(start, start + itemsPerPage);
            renderItems(slicedItems);
            currentPage++;
        });
    } else if (sortDirection === "rating") {
        const start = (currentPage - 1) * itemsPerPage;
        const slicedItems = allItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
    else {
        loadSortedItems();
    }
});


function loadSortedItems() { // 가격 정렬 함수
    if (allItems.length === 0) {
        loadItems().then(items => {
            allItems = sortItems(items, sortDirection);
            renderItems(allItems.slice(0, itemsPerPage));
            currentPage++;
        });
    } else {
        allItems = sortItems(allItems, sortDirection);
        const start = (currentPage - 1) * itemsPerPage;
        const slicedItems = allItems.slice(start, start + itemsPerPage);
        renderItems(slicedItems);
        currentPage++;
    }
}


// 정렬 함수
function sortItems(items, direction, sortBy) {
    if (sortBy === "rating") {
        return items.sort((a, b) => b.rat_value - a.rat_value);
    } else {
        return items.sort((a, b) => direction === "asc" ? a.p_price - b.p_price : b.p_price - a.p_price);
    }
}

// 가격 정렬 버튼 
$("#sortHighPrice, #sortLowPrice").on("click", function () {
    $("#loadMore").show()
    allItems = viewAllItems;
    sortDirection = $(this).data("sort");
    $(".list article").not(".sort").remove();
    currentPage = 1;
    loadSortedItems();
    console.log(allItems.length)
});

// 별점 정렬 버튼
$("#sortHighRating").on("click", function () {
    $("#loadMore").show()
    sortDirection = "rating";
    sortItems(allItems, "desc", "rating")
    $(".list article").not(".sort").remove();
    renderItems(allItems.slice(0, itemsPerPage));
    currentPage = 1;
    currentPage++;
});

// 전체 보기 버튼
$("#showAll").on("click", function () {
    $("#loadMore").show()
    sortDirection = null;
    allItems = viewAllItems;
    $(".list article").not(".sort").remove();
    renderItems(allItems.slice(0, itemsPerPage));
    currentPage = 1;
    currentPage++;
})

// 베스트셀러 버튼
$("#bestSell").on("click", function() {
    $("#loadMore").show()
    allItems = bestItems;
    $(".list article").not(".sort").remove();
    renderItems(allItems.slice(0, itemsPerPage));
    currentPage = 1;
    currentPage++;
    console.log(allItems.length)
})


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
                    <div class="desc-container">
                    <h2>${item.p_name}</h2>
                    <p>${item.p_type}</p>
                    <div class="price">${item.p_price.toLocaleString()}</div>
                    <p>★ (${item.rat_value})</p>
                    </div>
                </a>
            </article>
        `;
        $(".list").append(newItem);
    });
}



// 기본 화면에서의 오류 수정 
// 더보기를 했을 때 똑같은 값이 한번 더 나옴
function init() {
    loadItems().then(items => {
        allItems = items;
        currentPage++; // 페이지를 2로 설정해 기본형 화면에서 더 보기를 누를 때 나중 값들이 나오도록 합니다.
    });
}

// 처음 실행 시 함수 호출
// $(document).ready(function () {
//     $(".list article").not(".sort").remove();
//     init()
//     loadItems().then(items => { 
//         renderItems(allItems.slice(0, itemsPerPage));
//         viewAllItems = items;
//         bestItems = items.filter(item => item.best_sell == 'Y');
//         console.log(bestItems)
//         currentPage++;
//     })
// });