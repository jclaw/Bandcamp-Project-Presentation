$(function(){
    init();
});

/*---- Key Code ----
(space)       32
page up       33
page down     34
left arrow    37
up arrow      38
right arrow   39
down arrow    40
enter         13
---------------------*/
$("body").keydown(function(e) {
    if (e.keyCode == 34 || e.keyCode == 40 || e.keyCode == 39) {
        nextSlide();
    }
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 33) {
        prevSlide();
    }
});

$('[next-on-click]').click(function() {
    nextSlide();
});
$('[prev-on-click]').click(function() {
    prevSlide();
});

// Tools Comparison
$("#tools .tools-list img").each(function(){
    var graph = "g#graph-" + $(this).attr("id").slice(8);
    $(graph).data({"hidden": true});

    $(this).click(function(){
        if ($(graph).data("hidden")) {
            $(this).addClass("on");
            $(graph).animate({"opacity": 0.5});
            $("g#graph-base").animate({"opacity": 0});
            $(graph).data({"hidden": false});
        } else {
            $(this).removeClass("on");
            $(graph).animate({"opacity": 0});
            $(graph).data({"hidden": true});
        }
    });

    $(this).hover(function(){
        $(graph).animate({"opacity": 1});
        if ($("#tools .tools-list .on").length != 0) {
            $("g#graph-base").animate({"opacity": 0});
        } else {
            $("g#graph-base").animate({"opacity": 0.5});
        }

    }, function(){
        if (!$(this).hasClass("on")){
            $(graph).animate({"opacity": 0});
        } else {
            $(graph).animate({"opacity": 0.5});
        }
    });
});

var init = function(){
    var count = 0;
    $(".slide").each(function(){
        $(this).attr({"data-id": count, "data-hidden": true});
        count++;
    });
    $(".slide[data-id = 0]").attr({"data-hidden": false});

    buildNav();
    showSlide();
    showProgress();
};

var showSlide = function(){
    $(".slide").each(function(){
        if ($(this).data("hidden") == false) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
};

var buildNav = function(){
    var slides = $(".slide");
    $("body").append("<nav></nav>");

    for (i=0; i < slides.length; i++) {
        $("nav").append("<div class='nav-" + i + "'></div>");
    }

    // Go to a selected slide
    $("nav div").each(function(){
        $(this).click(function(){
            var clickedID = $(this).removeClass("active").attr("class").slice(4),
            slideToShow = $(".slide[data-id="+ clickedID +"]"),
            currentSlide = $(".slide[data-hidden='false']");

            currentSlide.attr({"data-hidden": true}).fadeOut();
            slideToShow.attr({"data-hidden": false}).fadeIn();

            console.log(slideToShow);

            showProgress();
        });
    });

}

var showProgress = function(){
    $("nav").children().removeClass("active");
    var activeID = $(".slide[data-hidden = 'false']").data("id");
    console.log(activeID);
    for (i=0; i<= activeID; i++){
        $(".nav-" + i).addClass("active");
    }
}

var nextSlide = function() {
    if ($(".slide[data-hidden='false'] .delay").length) {
        $(".slide[data-hidden='false'] .delay").first().animate({"opacity": 1}, 300, function(){
            $(this).removeClass("delay");
        });
    } else {
        $(".slide[data-hidden='false']:not(:last-of-type)").nextSlide();
    }
}

var prevSlide = function() {
    $(".slide[data-hidden='false']:not(:first-of-type)").prevSlide();
}

$.fn.extend({
    nextSlide: function() {
        this.attr({"data-hidden": true}).fadeOut()
        .next().attr({"data-hidden": false}).fadeIn();
        showProgress();
    },
    prevSlide: function() {
        this.attr({"data-hidden": true}).fadeOut()
        .prev().attr({"data-hidden": false}).fadeIn();
        showProgress();
    }
});
