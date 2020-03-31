$(".include").each(function() {
    if (!!$(this).attr("file2")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file2"), function(html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});

!function($){
    $('.bth').on('click',function(){
        $.ajax({
            type:'post',
            url:'http://localhost/jsLwj/src/suning/php/log.php',
            data:{
                username:$('.username').val(),
                password:$('.password0').val()
            }
        }).done(function(result){
            if(result){
                location.href="index.html";
                localStorage.setItem('username',$('.username').val());
            }else{
                $('.password0').val('');
                $('.tishi span').html('您输入的账户名与密码不匹配，请重新输入！').css("color","red");
            }
        });
    })
}(jQuery);