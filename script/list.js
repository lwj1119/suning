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



!function ($) {

    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;

    let $main = $('.main');//找到需要渲染的位置
    $.ajax({
        url: 'http://localhost/jsLwj/src/suning/php/list.php',//接收需要渲染的数据
        dataType: 'json'//设置渲染数据的格式
    }).done(function (data) {   //返回渲染的数据
        let $strhtml = '<ul>'; //渲染框架
        $.each(data, function (index, value) {//对渲染的数据进行遍历
            console.log(value);
            $strhtml += `
            <li>
             <a href="detal.html?sid=${value.sid}"  target="_blank">
                <img src="${value.url}"/>
                <p>${value.title}</P>
                <span class="price">￥${value.price}</span>
                <span>销量${value.sailnumber}</span>
             </a>
            </li>
            `;
            //添加渲染的数据
        })

        $strhtml += '</ul>';
        $main.html($strhtml)
        array_default = [];//排序前的li数组
        array = [];//排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.main li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
    //跳转页面  重新渲染
    $('.page').pagination({
        pageCount: 3,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback:function(api){
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://localhost/jsLwj/src/suning/php/list.php',//接收需要渲染的数据
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'//设置渲染数据的格式
            }).done(function (data) {   //返回渲染的数据
                let $strhtml = '<ul>'; //渲染框架
                $.each(data, function (index, value) {//对渲染的数据进行遍历
                    $strhtml += `
                    <li>
                     <a href="detal.html?sid=${value.sid}"  target="_blank">
                        <img src="${value.url}"/>
                        <p>${value.title}</P>
                        <span class="price">￥${value.price}</span>
                        <span>销量${value.sailnumber}</span>
                     </a>
                    </li>
                    `;
                    //添加渲染的数据
                })
        
                $strhtml += '</ul>';
                $main.html($strhtml)
                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;
                //将页面的li元素加载到两个数组中
                $('.main li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }
    })

    //3.排序

    $('button').eq(0).on('click', function () {
        $.each(array_default, function (index, value) {
            $('.main ul').append(value);
        });
        return;
    });
    $('button').eq(1).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    // let temp = array[j];
                    // array[j] = array[j + 1];
                    // array[j + 1] = temp;
                    [array[j],array[j+1]]=[array[j+1],array[j]]
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        $('.main ul').empty();//清空原来的列表
        $.each(array, function (index, value) {
            $('.main ul').append(value);
        });
    });
    $('button').eq(2).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    // let temp = array[j];
                    // array[j] = array[j + 1];
                    // array[j + 1] = temp;
                    [array[j],array[j+1]]=[array[j+1],array[j]]
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        $('.main ul').empty();//清空原来的列表
        $.each(array, function (index, value) {
            $('.main ul').append(value);
        });
    })

}(jQuery);