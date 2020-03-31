//引入相同的头部尾部文件
$(".include").each(function () {
    if (!!$(this).attr("file1")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file1"), function (html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});
$(".include").each(function () {
    if (!!$(this).attr("file2")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file2"), function (html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});

!function ($) {
    //banner 二级菜单渲染打开
    !function () {
        let $bannerli = $('.banner_nav li');
        let $list = $('.list');
        let $list1 = $('.list .list1');
        $bannerli.on('mouseover', function () {//给点击的li添加鼠标移入事件
            $(this).addClass('active').siblings('li').removeClass('active');//点击的li添加active类名，其他的li去掉
            $list.show();//对应的大盒子显示
            if ($(window).scrollTop() > $('.banner_nav').offset().top) {//如果浏览器滑轮高度大于banner_nav的高度 定位的盒子高度等于他们的差
                $list.css({
                    top: $(window).scrollTop() - $('.banner_nav').offset().top
                })
            } else {
                $list.css({
                    top: 0
                })
            }
            $list1.eq($(this).index()).show().siblings('.list .list1').hide();//找到点击li的索引，显示对应索引的小盒子并显示出来，其他的小盒子隐藏

        });
        $bannerli.on('mouseout', function () {//添加鼠标移出事件 点击的li去掉active 大盒子不显示
            $bannerli.removeClass('active');
            $list.hide();
        });
        $list.on('mouseover', function () {
            $(this).show();
        });
        $list.on('mouseout', function () {
            $(this).hide();
        })
    }();
    //banner 二级菜单区内容渲染
    !function () {
        $.ajax({
            url: 'http://localhost/jsLwj/src/suning/php/index.php',
            dataType: 'json',

        }).done(function (d) {
            let $list0 = $('.banner .list .list1');
            let $strhtml = `<ul>`;
            let $shuju2 = d.shuju2;
            $.each($shuju2, function (index, value) {
                $strhtml += `
                <li>
                <a href="list.html">
                    <img src="${value.url}"/>
                    <p class="sl">${value.title}</p>
                    <span class="price1">￥:${value.price}</span>
                    <span class="num1">销量：${value.sailnumber}</span>
                </a>
                </li>
                `
            });
            $strhtml += `</ul>`;
            $list0.html($strhtml);
        });
    }();

    //轮播图渲染
    !function () {
        let $olli = $('.banner .lunbo ol li');
        let $ulli = $('.banner .lunbo ul li');
        $olli.on('mouseover', function () {
            $(this).addClass("active").siblings('li').removeClass("active");
            $ulli.eq($(this).index()).show().siblings('li').hide();
        });
        let $left = $('.banner .left');
        let $right = $('.banner .right');
        $left.on('click', function () {
            //alert(1);
            let $index = $(this).parents('.banner').find('.active').index();
            if ($index < 1) {
                $index = $olli.length;
            }
            $olli.eq($index - 1).addClass("active").siblings('li').removeClass("active");
            $ulli.eq($index - 1).show().siblings('li').hide();
        });
        $right.on('click', function () {
            let $index = $(this).parents('.banner').find('.active').index();
            $olli.eq($index + 1).addClass("active").siblings('li').removeClass("active");
            $ulli.eq($index + 1).show().siblings('li').hide();
            if ($index >= $olli.length - 1) {
                $olli.eq(0).addClass("active").siblings('li').removeClass("active");
                $ulli.eq(0).show().siblings('li').hide();
            }
        });
    }();


    //秒杀区渲染
    $.ajax({
        url: 'http://localhost/jsLwj/src/suning/php/index.php',
        dataType: 'json'
    }).done(function (d) {
        //console.log(d.shuju1);
        let $shuju1 = d.shuju1;
        //console.log($shuju1);
        let $ul = $('.product ul')
        let $strhtml = ``;
        $.each($shuju1, function (index, value) {
            $strhtml += `<li>
                <a href="list.html">
                    <img class="lazy" data-original="${value.url}" width="180" height="180"/>
                    <p class="sl">${value.title}</p>
                    <span class="price1">￥:${value.price}</span>
                    <span class="num1">销量：${value.sailnumber}</span>
                </a>
            </li>
            `;
        });
        $ul.html($strhtml);
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });
}(jQuery);


!function ($) {
    $.ajax({
        url: 'http://localhost/jsLwj/src/suning/php/index.php',
        dataType: 'json'
    }).done(function (d) {
        let $shuju1 = d.shuju1;
        let $ul = $('.computer ul')
        let $strhtml = ``;
        
        $.each($shuju1, function (index, value) {
                $strhtml += `<li>
                    <a href="list.html">
                        <img class="lazy1" data-original="${value.url}" width="180" height="180"/>                       
                        <p class="sl">${value.title}</p>
                        <span class="price1">￥:${value.price}</span>
                        <span class="num1">销量：${value.sailnumber}</span>
                    </a>
                </li>
                `;
            });
        $ul.html($strhtml);
        $(function () {
                $("img.lazy1").lazyload({ effect: "fadeIn" });
        });
        

        $('.computer a').on('click', function () {
            $strhtml = ``;
            let arr1 = new Array();
            let arr2 = new Array();
            for (var i = 0; i < 20; i++) {
                arr1.push(i);
            }
            for (var k = 0; k < 10; k++) {
                var id = Math.ceil(Math.random() * 19);
                if (arr2.indexOf(arr1[id]) === -1) {
                    arr2.push(arr1[id]);
                } else {
                    k = k - 1;
                    continue;
                }
            }
            for (var i = 0; i < arr2.length; i++) {
                console.log(arr2[i]);
                $strhtml += `<li>
                        <a href="list.html">
                            <img class="lazy2" data-original="${$shuju1[arr2[i]].url}" width="180" height="180"/>   
                            <p class="sl">${$shuju1[arr2[i]].title}</p>
                            <span class="price1">￥:${$shuju1[arr2[i]].price}</span>
                            <span class="num1">销量：${$shuju1[arr2[i]].sailnumber}</span>
                        </a>
                    </li>
                    `;
            };
            $ul.html($strhtml);
            $(function () {
                $("img.lazy2").lazyload({ effect: "fadeIn" });
            });
        });




    });



}(jQuery);






