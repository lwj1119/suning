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
    let $sid=location.search.substring(1).split('=')[1];//获取在地址栏中的sid号码
    console.log($sid)
    //如果没有sid编号，默认sid为1
    if(!$sid){
        $sid=1;
    }
    $.ajax({
        url:'http://localhost/jsLwj/src/suning/php/giesid.php',
        //传输sid号码，获取对应的商品资料
        data:{
            sid:$sid
        },
        dataType: 'json'
    }).done(function(d){
        console.log(d);
        let $sp=$('.sp');//小图
        let $sf=$('.sf');//小放
        let $bp=$('.bp');//大图
        let $bf=$('.bf');//大放
        $sp.attr('src',d.url);//赋值小图地址
        $bp.attr('src',d.url);
        $('.good_right .name').html(d.title);//赋值标题
        $('.good_right .price span').html(d.price);//赋值价格
        $('.good_right .sailnumber span').html(d.sailnumber);//赋值销量
        $('.good_right .sailnumber span').css({
            "color":"black",
            "font-weight":"600",
            "font-size":"20px"
        })
        let picurlist=d.picurlist.split(",");
        let strhtml='';
        //渲染列表图片
        $.each(picurlist,function(index,value){
            strhtml+='<li><img  src="'+ value +'"></li>';        
        });
        $('.good .list ul').html(strhtml);
        //列表图片添加点击事件 切换到小图
        $('.good .list ul').on('click','li',function(){
           let $listurl=$(this).find('img').attr('src');
           $sp.attr('src',$listurl)
           $bp.attr('src',$listurl)
        })

        //放大镜效果
        $sf.width($bf.width()*$sp.width()/$bp.width());
        $sf.height($bf.height()*$sp.height()/$bp.height());
        console.log($sf.width())
        console.log($sf.height())
        let $bili=$bp.width()/$bf.width();
        $('.picuter').hover(function(){
            $sf.css('visibility','visible');
            $bf.css('visibility','visible');
            $(this).on('mousemove',function(ev){
                let $leftvalue=ev.pageX-$('.good').offset().left-$sf.width()/2;
                let $topvalue=ev.pageY-$('.good').offset().top-$sf.height()/2;

                if($leftvalue<0){
                    $leftvalue=0;
                }else if($leftvalue>$('.picuter').width()-$sf.width()){
                    $leftvalue=$('.picuter').width()-$sf.width()
                }
           
                if($topvalue<0){
                    $topvalue=0;
                }else if($topvalue>$('.picuter').height()-$sf.height()){
                   $topvalue=$('.picuter').height()-$sf.height()
                }
                $sf.css({
                    left:$leftvalue,
                    top:$topvalue
                })
                $bp.css({
                    left:-$leftvalue*$bili,
                    top:-$topvalue*$bili
                })
            })
            

        },function(){
            $sf.css('visibility','hidden');
            $bf.css('visibility','hidden');
        });
       
    });
    //图列表箭头事件
    let $num=6;
    const $left=$('#left')
    const $right=$('#right')
    const $list=$('.ullist .list')
    //右箭头事件
    $right.on('click',function(){
        //alert(1)
        const $lists=$('.ullist .list li');
        if($lists.length>$num){
            $num++;
            $left.css('color', '#333');
            if($lists.length==$num){
                $right.css('color', '#fff');
            }
            $('.list ul').animate({
                left:-$lists.eq(0).outerWidth(true)*($num-6)
            })
        }

    })
    //左箭头事件
    $left.on('click',function(){
        //alert(1)
        const $lists=$('.ullist .list li');
        if($num>6){
            $num--;
            $right.css('color', '#333');
            if($num==6){
                $left.css('color', '#fff');
            }
            $('.list ul').animate({
                left:-$lists.eq(0).outerWidth(true)*($num-6)
            })
        }
    })
    //购物车事件 cookie 点击购物车  存储商品编号 数量 到cookie
    let arrsid=[];
    let arrnum=[];
    //判断在此页面之前是否存有sid num 的cookie 如果有就取出并返回成数组
    function cookiearr(){
        if(jscookie.get('cookiesid')&& jscookie.get('cookienum')){
            arrsid=jscookie.get('cookiesid').split(',');
            arrnum=jscookie.get('cookienum').split(',');
        }else{
            arrsid=[];
            arrnum=[];
        }
    }
    //添加购物车点击事件
    $('.btn a').on('click',function(){
        //alert(1);
        cookiearr();
        let $sid=location.search.substring(1).split('=')[1];
        if($.inArray($sid,arrsid)!=-1){
            let $num1=parseInt(arrnum[$.inArray($sid,arrsid)])+parseInt($('.btn input').val());
            arrnum[$.inArray($sid,arrsid)]=$num1;
            jscookie.add('cookienum',arrnum,10)
        }else{
            arrsid.push($sid);
            jscookie.add('cookiesid',arrsid,10);
            arrnum.push($('.btn input').val());
            jscookie.add('cookienum',arrnum,10);
        }     
    });
    //添加结算事件
    $('.buy a').on('click',function(){
        //alert(1)
        cookiearr();
        let $sid=location.search.substring(1).split('=')[1];
        if($.inArray($sid,arrsid)!=-1){
            let $num1=parseInt(arrnum[$.inArray($sid,arrsid)]);
            arrnum[$.inArray($sid,arrsid)]=$num1;
            jscookie.add('cookienum',arrnum,10)
        }else{
            arrsid.push($sid);
            jscookie.add('cookiesid',arrsid,10);
            arrnum.push($('.btn input').val());
            jscookie.add('cookienum',arrnum,10);
        }     
    })
}(jQuery);

