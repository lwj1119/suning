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
    function showgood(sid, num) {
        $.ajax({
            url: 'http://localhost/jsLwj/src/suning/php/alldata.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (sid === value.sid) {
                    // let $clonebox = $('.goods-item:hidden').clone(true, true);//克隆隐藏元素
                    let $clonebox = $('.goodlist:hidden').clone(true, true);
                    $clonebox.find('.cart_img img').attr('src', value.url);
                    $clonebox.find('.cart_img img').attr('sid',value.sid)
                    $clonebox.find('.cart_goods span').html(value.title)
                    $clonebox.find('.cart_price .price1').html(value.price);
                    $clonebox.find('.cart_num .num1').val(num);
                    $clonebox.find('.cart_sum .sum1').html((value.price * num).toFixed(2));
                    $clonebox.css("display", "block");
                    //$clonebox.css("visibility","visible");
                    $('.goodlist0').append($clonebox);
                    total()
                }
            })
        });


    };
    //console.log($('.cart_num input').val())

    //获取cookie里面的数据 对购物车进行渲染
    if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {//确认是否存在存储编号 数量的cookie 有的话取出分成数组
        let arrsid1 = jscookie.get('cookiesid').split(',');
        let arrnum1 = jscookie.get('cookienum').split(',');
        $.each(arrsid1, function (index, value) {
            showgood(arrsid1[index], arrnum1[index])//遍历取出对应的商品编号索引  商品数量索引
        });
    }
    //封装计算总价
    function total() {
        let $num = 0;
        let $sum = 0;
        $('.goodlist:visible').each(function (index, ele) {//找到所有显示盒子 并运行相同的函数
            if ($(ele).find('.quanxuan1 input').prop('checked')) {//找到盒子下面 选择的按钮  其中是选中状态的按钮
                $num += parseInt($(ele).find('.cart_num input').val()); //取出选中按钮 下的数量 叠加得出总数量
                $sum += parseInt($(ele).find('.cart_sum .sum1').html());//取出选中按钮 下的单个商品总价  叠加算总价
            }
        });
        //console.log($num);
        $('.goodlistfoot .xuanze span').html($num); //赋值总数量
        $('.zongjia1').html($sum.toFixed(2));//赋值总价     
    };
    //封装 单个商品总价
    function totalprice(obj) {
        let $price = parseFloat(obj.parents('.goodlist').find('.price1').html());//获取单价
        let $num = parseInt(obj.parents('.goodlist').find('.num1').val());//获取数量
        return ($price * $num).toFixed(2);
    }

    //全选框
    $('.allsel').on('change', function () {//给全选框添加事件  
        $('.goodlist:visible').find(':checkbox').prop('checked', $(this).prop('checked'));//全选框状态  所有选择框状态同步
        $('.allsel').prop('checked', $(this).prop('checked'));//全选框状态  所有全选框状态同步
        total()
    });
    let $inputs = $('.goodlist:visible').find(':checkbox');
    $('.goodlist0').on('change', $inputs, function () {//事件委托  找到父元素 给所有单个选择按钮添加事件
        if ($('.goodlist:visible').find(':checkbox').length === $('.goodlist:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);//如果列表中 所有选择按钮的个数 等于 选中 按钮的个数  全选框也选中
        } else {
            $('.allsel').prop('checked', false);//否则 全选框不选中
        }
        total()
    });

    //选择数量的按钮 添加事件
    //-号添加点击事件
    $('.numdown').on('click', function () {
        let $num = $(this).parents('.goodlist').find('.num1').val();
        $num--;
        if ($num < 1) {
            $num = 1
        }
        $(this).parents('.goodlist').find('.num1').val($num);
        $(this).parents('.goodlist').find('.sum1').html(totalprice($(this)));
        total();
        setcookie($(this));//将改变后的数量存入到cookie
    });
    //+号添加点击事件
    $('.numup').on('click', function () {
        let $num = $(this).parents('.goodlist').find('.num1').val();
        $num++;
        if ($num < 1) {
            $num = 1
        }
        $(this).parents('.goodlist').find('.num1').val($num);
        $(this).parents('.goodlist').find('.sum1').html(totalprice($(this)));
        total();
        setcookie($(this));//将改变后的数量存入到cookie

    });
    //数量框 添加改变事件
    $('.cart_num input').on('input', function () {
        let $reg = /^\d+$/g;//只能匹配数字 一个或多个
        $val = $(this).val();
        if (!$reg.test($val)) {
            $(this).val(1);
        }
        $(this).parents('.goodlist').find('.cart_sum .sum1').html(totalprice($(this)));
        total();
        setcookie($(this));//将改变后的数量存入到cookie
    });

    //存储改变后的 数量cookie
    //将改变后的数量存放到cookie中
    let arrsid = [];
    let arrnum = [];
    function cookie1() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')){
            arrsid = jscookie.get('cookiesid').split(',');
            arrnum = jscookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    };
    function setcookie(obj){
        cookie1();
        let $sid=obj.parents('.goodlist').find('img').attr('sid');
        arrnum[$.inArray($sid,arrsid)]=obj.parents('.goodlist').find('.num1').val();
        jscookie.add('cookienum',arrnum,10)
    };
    //点击删除 添加事件
    //封装删除cookie
    function cookiedel(sid,arrsid){
        let $index=-1;
        $.each(arrsid,function(index,value){
            if(sid===value){
               $index=index;
            }
        })
        arrsid.splice($index,1);
        arrnum.splice($index,1);

        jscookie.add('cookiesid',arrsid,10);
        jscookie.add('cookienum',arrnum,10);

    };
    //列表页删除键 添加删除事件
    $('.cart_caozuo .del1').on('click',function(){
        //alert(1);
        cookie1();
        if(window.confirm("你确认要删除吗")){
            $(this).parents('.goodlist').remove();
            cookiedel($(this).parents('.goodlist').find('img').attr('sid'),arrsid);            
            total();
        }    
    });

    $('.del2 span').on('click',function(){
        //alert(1);
        cookie1();
        if(window.confirm("你确定要清空购物车吗？")){
           $('.goodlist:visible').each(function(){
               if($(this).find(':checkbox').is(':checked')){
                   $(this).remove();
                   cookiedel($(this).find('img').attr('sid'),arrsid)

               }
           }) 
           total();
        }
    })


}(jQuery);


