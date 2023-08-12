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
    // AJAX 요청 또는 가상의 데이터 로드 코드
    // 여기서는 setTimeout을 사용한 가상의 데이터 로드
    setTimeout(function () {
        for (let i = 0; i < itemsPerPage; i++) {
            // 새로운 상품 아이템 생성 및 추가
            const newItem = `
                <article>
                <a href="#">
                <div class="thumb">
                    <div class="image-container"></div>
                </div>
                <h2>상품명</h2>
                <p>간단한 상품 설명</p>
                <div class="price">27,000</div>
            </a>
                </article>
                `;
            $(".list").append(newItem);
        }
    }, 1000); // 1초 뒤에 실행
    currentPage++;
}

// 더 보기 버튼 클릭 이벤트
$("#loadMore").on("click", function () {
    loadItems(currentPage);
});