//引入相同的头部尾部文件
$(".include").each(function() {
    if (!!$(this).attr("file1")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file1"), function(html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});
$(".include").each(function() {
    if (!!$(this).attr("file2")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file2"), function(html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});

!function($){
    let $bannerli=$('.banner_nav li');
    let $list=$('.list');
    let $list1=$('.list .list1');
    $bannerli.on('mouseover',function(){//给点击的li添加鼠标移入事件
        $(this).addClass('active').siblings('li').removeClass('active');//点击的li添加active类名，其他的li去掉
        $list.show();//对应的大盒子显示
        if($(window).scrollTop()>$('.banner_nav').offset().top){//如果浏览器滑轮高度大于banner_nav的高度 定位的盒子高度等于他们的差
            $list.css({
                top:$(window).scrollTop()-$('.banner_nav').offset().top
            })
        }else{
            $list.css({
                top:0
            })
        }
        $list1.eq($(this).index()).show().siblings('.list .list1').hide();//找到点击li的索引，显示对应索引的小盒子并显示出来，其他的小盒子隐藏
        
    });
    $bannerli.on('mouseout',function(){//添加鼠标移出事件 点击的li去掉active 大盒子不显示
        $bannerli.removeClass('active');
        $list.hide();
    });
    $list.on('mouseover',function(){
        $(this).show();
    });
    $list.on('mouseout',function () {
        $(this).hide();
    })
}(jQuery);
