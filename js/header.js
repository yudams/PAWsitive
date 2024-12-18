window.addEventListener("load", function () {

    let btn_gnb = this.document.querySelector(".btn_gnb>div")
    let gnb = this.document.querySelector(".gnb_wrap")
    let closed_gnb = this.document.querySelector(".btn_closed_gnb")
    let gnb_modal = this.document.querySelector(".gnb_modal")

    // btn클릭 시 메뉴 나옴
    btn_gnb.addEventListener("click", function () {
        gnb.style.transform = "translateY(0%)"
        gnb_modal.classList.add("on")
        gnb.classList.add("on")
    })
    closed_gnb.addEventListener("click", function () {
        gnb.style.transform = "translateY(-100%)"
        gnb_modal.classList.remove("on")
        gnb.classList.remove("on")

    })

    let fixed_menu = this.document.querySelector(".btn_gnb")
    let btn_top = this.document.querySelector(".btn_top")
    let lastScrollTop = 0
    let hideTimeout1
    let hideTimeout2
    let working = false


    this.window.addEventListener("scroll", function () {

        
        if(working){return}
        // 스크롤 했을 때 실행되는 동작

        let scrollTop = this.document.documentElement.scrollTop
        // 위에서 스크롤바가 얼만큼 내려왔는지 계산해 변수에 저장


        // 2초 뒤에 함수가 실행(고정 메뉴가 사라짐)
        if (scrollTop < lastScrollTop) {
            // 마우스 휠을 위로 올렸을 때
            fixed_menu.classList.add("on")
            btn_top.classList.add("on")

            // 이미 존재하는 예약 타임이 있다면 제거
            if (hideTimeout1) {
                this.clearTimeout(hideTimeout1)
            }
            if (hideTimeout2) {
                this.clearTimeout(hideTimeout2)
            }

            hideTimeout1 = this.setTimeout(function () {
                fixed_menu.classList.remove("on")
            }, 2000)
            hideTimeout2 = this.setTimeout(function () {
                btn_top.classList.remove("on")
            }, 2000)
        } else {
            // 마우스 휠을 아래로 내렸을 때
            fixed_menu.classList.remove("on")
            btn_top.classList.remove("on")

        }

        lastScrollTop = scrollTop
    })

    // 하단 메뉴에 마우스를 올리면 기존에 설정되어 있던 함수(2초 뒤에 사라지는 동작)이 취소됨
    fixed_menu.addEventListener("mouseover", function () {
        clearInterval(hideTimeout1)
    })
    btn_top.addEventListener("mouseover", function () {
        clearInterval(hideTimeout2)
    })

    fixed_menu.addEventListener("mouseout", () => {
        hideTimeout1 = this.setTimeout(function () {
            fixed_menu.classList.remove("on")
        }, 2000)
    })
    btn_top.addEventListener("mouseout", () => {
        hideTimeout2 = this.setTimeout(function () {
            fixed_menu.classList.remove("on")
        }, 2000)
    })

    // 위로가기 버튼을 클릭하면 페이지 최상단으로 부드럽게 스크롤하여 이동되는 기능
    btn_top.addEventListener("click", function(e) {
        e.preventDefault()
        btn_top.classList.remove("on")
        working = true
        window.scrollTo({ top: 0, behavior: "smooth" })
        setTimeout(function(){
            working = false
        },1000)

    })

    let station1_txt = document.querySelector(".station1_txt")
    let txt_array = [
        `
        <h4><strong>포지티브,</strong> <br class="mobile"> 반려동물의 가능성을 믿습니다.</h4>
        <p>작은 발걸음이 큰 변화를 만듭니다.<br>포지티브는 반려동물이 가진 가능성을 긍정적인 훈련으로 이끌어 더 행복한 일상을 만들어갑니다.</p>
        `,
        `
        <h4><strong>포지티브,</strong> <br class="mobile">함께 만들어가는 행복</h4>
        <p>반려동물의 성장을 믿습니다.<br>포지티브는 과학적이고 안전한 훈련으로 보호자와 반려동물이 더 나은 일상을 만들어가도록 돕습니다.</p>
        `,
        `
        <h4><strong>포지티브,</strong> <br class="mobile">반려동물과의 특별한 순간</h4>
        <p>작은 훈련으로 새로운 가능성을 발견합니다.<br>포지티브는 반려동물의 특성을 존중하며, 긍정적인 훈련 방식으로 보호자와의 관계를 강화합니다.</p>
        `,
        `
        <h4><strong>포지티브,</strong> <br class="mobile">긍정의 시작</h4>
        <p>안전하고 체계적인 훈련이 행복한 변화를 만듭니다.<br>포지티브는 반려동물이 가진 가능성을 발견하고 발전시킬 수 있도록 돕습니다.</p>
        `,
        `
        <h4><strong>포지티브,</strong> <br class="mobile">긍정의 힘을 믿습니다.</h4>
        <p>훈련을 통해 가능성을 열어갑니다.<br>포지티브는 반려동물에게 맞춤형 훈련을 제공하여 지속적인 변화를 이끌어냅니다.</p>
        `
    ]
    const swiper1 = new Swiper('.station1', {
        // Optional parameters
        direction: 'vertical',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        speed: 900,
    });

    swiper1.on('slideChange', function () {
        station1_txt.innerHTML = txt_array[this.realIndex]
    });

    let station2 = new Swiper('.station2', {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        speed: 900

    })
    let station3 = new Swiper('.station3', {
        loop: true,
        speed: 900
    })
    // let station4 = new Swiper('.station4',{
    //     loop: true,
    //     speed: 900,
    //     slidesPerView: 4,
    //     spaceBetween: 20,
    // })

    station2.on("slideChange", function () {
        // station2 슬라이드가 변할 떄 실행되는 동작
        station3.slideToLoop(station2.activeIndex)
        // station3는 station2의 활성화된 슬라이드 순번에 맞추어 이동한다.
        // station4.slideToLoop(station2.activeIndex)
    })


    let pawsitive = this.document.querySelector(".pawsitive_img")
    let gnb_list = this.document.querySelector(".pawsitive")

    gnb_list.addEventListener("mouseover", function () {
        pawsitive.setAttribute('src', `./img/icn/logo-ver.svg`)
    })
    gnb_list.addEventListener("mouseleave", function () {
        pawsitive.setAttribute('src', `./img/icn/icn_gnb_3.svg`)
    })


})