"use strict";$(".include").each(function(){if($(this).attr("file1")){var t=$(this);$(this).load($(this).attr("file1"),function(i){t.after(i).remove()})}}),$(".include").each(function(){if($(this).attr("file2")){var t=$(this);$(this).load($(this).attr("file2"),function(i){t.after(i).remove()})}}),function(i){var t=i(".banner_nav li"),s=i(".list"),o=i(".list .list1");t.on("mouseover",function(){i(this).addClass("active").siblings("li").removeClass("active"),s.show(),i(window).scrollTop()>i(".banner_nav").offset().top?s.css({top:i(window).scrollTop()-i(".banner_nav").offset().top}):s.css({top:0}),o.eq(i(this).index()).show().siblings(".list .list1").hide()}),t.on("mouseout",function(){t.removeClass("active"),s.hide()}),s.on("mouseover",function(){i(this).show()}),s.on("mouseout",function(){i(this).hide()})}(jQuery);