/*-----------------------------------------------------------------
Theme Name: Charityow
Author: Exdesigners
Author URI: https://themeforest.net/user/exdesigners 
Version: 1.0.0 
Description: Charityow - Charity & Donation Html Template

-------------------------------------------------------------------
JS TABLE OF CONTENTS
-------------------------------------------------------------------

01. Mobile Menu 
02. Sidebar Toggle 
03. Body Overlay  
04. Sticky Header   
05. Counterup 
06. Wow Animation 
07. Set Background Image Color & Mask 
08. Testimonial Slider  
09. Blog Slider   
10. Back to top   
11. SelectPricing 
12. Progress Bar Animation 
13. Mouse Cursor   
14. Preloader  


------------------------------------------------------------------*/

(function ($) {
    "use strict";

    $(document).ready(function () {


        /*-----------------------------------
          01. Mobile Menu  
        -----------------------------------*/   
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });



        /*-----------------------------------
          02. Sidebar Toggle  
        -----------------------------------*/   
        $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function () {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });



        /*-----------------------------------
          03. Body Overlay 
        -----------------------------------*/  
        $(".body-overlay").on("click", function () {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });
 


        /*-----------------------------------
          04. Sticky Header 
        -----------------------------------*/    
        $(window).scroll(function () {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

    

        /*-----------------------------------
          05. Counterup 
        -----------------------------------*/  
        $(".counter-number").counterUp({
            delay: 10,
            time: 1000,
        });



        /*-----------------------------------
          06. Wow Animation 
        -----------------------------------*/  
        new WOW().init();



        /*-----------------------------------
          07. Set Background Image Color & Mask   
        -----------------------------------*/   
        if ($("[data-bg-src]").length > 0) {
            $("[data-bg-src]").each(function () {
                var src = $(this).attr("data-bg-src");
                $(this).css("background-image", "url(" + src + ")");
                $(this).removeAttr("data-bg-src").addClass("background-image");
            });
        }
 

        if ($('[data-mask-src]').length > 0) {
            $('[data-mask-src]').each(function () {
                var mask = $(this).attr('data-mask-src');
                $(this).css({
                    'mask-image': 'url(' + mask + ')',
                    '-webkit-mask-image': 'url(' + mask + ')'
                });
                $(this).addClass('bg-mask');
                $(this).removeAttr('data-mask-src');
            });
        };


 
        /*-----------------------------------
           08. Testimonial Slider
        -----------------------------------*/   
        if ($('.testimonial-slider-one').length > 0) {
            const testimonialSliderOne = new Swiper(".testimonial-slider-one", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,                 
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },               
                navigation: {
                    nextEl: ".arrow-prev",
                    prevEl: ".arrow-next",
                },
                breakpoints: {
                    1499: {
                        slidesPerView: 2,
                    },
                    1399: {
                        slidesPerView: 2,
                    },
                    1199: {
                        slidesPerView: 2,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }



        /*-----------------------------------
            09. Blog Slider     
        -----------------------------------*/     
        if ($('.blog-slider-one').length > 0) {
            const testimonialSliderOne = new Swiper(".blog-slider-one", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,                 
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },               
                navigation: {
                    nextEl: ".arrow-prev",
                    prevEl: ".arrow-next",
                },
                breakpoints: {
                    1499: {
                        slidesPerView: 4,
                    },
                    1399: {
                        slidesPerView: 4,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 2,
                    },
                },
            });
        }



        /*-----------------------------------
           10. Back to top    
        -----------------------------------*/  
        $(window).scroll(function () {
            if ($(this).scrollTop() > 20) {
                $("#back-top").addClass("show");
            } else {
                $("#back-top").removeClass("show");
            }
        });
        $("#back-top").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 800);
            return false;
        });
     

                    
        /*-----------------------------------
           11. SelectPricing  
        -----------------------------------*/ 
        $(".selectPricing li").click(function () { 
            $(this).toggleClass('active').siblings().removeClass('active');
    
            // Get the data-amount value from the clicked element
            var amount = $(this).data('amount');
    
            // Update the input field with the new amount
            $(".left_default_amount").val(amount);
        });



        /*-----------------------------------
            12. Progress Bar Animation 
        -----------------------------------*/  
            $('.progress-bar').each(function () {
                var $this = $(this);
                var progressWidth = $this.attr('style').match(/width:\s*(\d+)%/)[1] + '%';

                $this.waypoint(function () {
                    $this.css({
                        '--progress-width': progressWidth,
                        'animation': 'animate-positive 1.8s forwards',
                        'opacity': '1'
                    });
                }, { offset: '75%' });
            });



        /*-----------------------------------
            13. Mouse Cursor    
        -----------------------------------*/   
        function mousecursor() {
            if ($("body")) {
                const e = document.querySelector(".cursor-inner"),
                    t = document.querySelector(".cursor-outer");
                let n,
                    i = 0,
                    o = !1;
                (window.onmousemove = function(s) {
                    o ||
                        (t.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                        (e.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                        (n = s.clientY),
                        (i = s.clientX);
                }),
                $("body").on("mouseenter", "a, .cursor-pointer", function() {
                    e.classList.add("cursor-hover");
                    t.classList.add("cursor-hover");
                }),
                $("body").on("mouseleave", "a, .cursor-pointer", function() {
                    ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
                    (e.classList.remove("cursor-hover"),
                        t.classList.remove("cursor-hover"));
                }),
                (e.style.visibility = "visible"),
                (t.style.visibility = "visible");
            }
        }
        $(function() {
            mousecursor();
        });



    }); // End Document Ready Function


        /*-----------------------------------
            14. Preloader   
        -----------------------------------*/ 
     
        function loader() {
            $(window).on('load', function () {
                // Animate loader off screen
                $(".preloader").addClass('loaded');
                $(".preloader").delay(600).fadeOut();
            });
        }

        loader();


})(jQuery); // End jQuery

