$(".include").each(function () {
    if (!!$(this).attr("file2")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file2"), function (html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});

!function ($) {
    let $username= $('.username');
    let $usernameflag = true;
    //验证用户名
    $username.on('blur', function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/jsLwj/src/suning/php/login.php',
            data: {
                username: $username.val()
            }
        }).done(function (result) {
            if (!result) {
                let namereg = /^[a-zA-Z]+\w{5,}/g;

                if ($username.val() != '') {
                    if (namereg.test($username.val())) {
                        $('.name span').html('✔').css('color', 'green')
                        $usernameflag = true;
                    } else {
                        $('.name span').html('不可以输入特殊字符').css('color', 'red')
                        $usernameflag = false;
                    }
                } else {
                    $('.name span').html('用户名不能为空').css('color', 'red')
                    $usernameflag = false;
                }
            } else {
                $('.name span').html('用户名已存在').css('color', 'red');
                $usernameflag = false;

            }
        });
    });
    //验证密码
    let $passwordflag = true;
    let $password = $('.password0');
    $password.on('blur', function () {
        let passreg1 = /\d+/g;
        let passreg2 = /[a-z]+/g;
        let passreg3 = /[A-Z]+/g;
        let passreg4 = /[\W_]+/g;
        let num = 0;
        if ($password.val() != '') {
            if ($password.val().length >= 6 && $password.val().length <= 12) {
                if (passreg1.test($password.val())) {
                    num++;
                }
                if (passreg2.test($password.val())) {
                    num++;
                }
                if (passreg3.test($password.val())) {
                    num++;
                }
                if (passreg4.test($password.val())) {
                    num++;
                }
                if (num >= 2) {
                    $('.password span').html('✔').css('color', 'green');
                    $passwordflag = true;
                } else {
                    $('.password span').html('密码至少包含两种字符').css('color', 'red');
                    $passwordflag = false;
                }
            } else {
                $('.password span').html('请输入6-12位密码').css('color', 'red');
                $passwordflag = false;
            }
        } else {
            $('.password span').html('密码不能为空').css('color', 'red');
            $passwordflag = false;
        }

    });

    //验证重复密码
    let $repassflag = true;
    let $repass = $('.repass0');
    $repass.on('blur', function () {
        if ($password.val() != '') {
            if ($password.val() == $repass.val()) {
                $('.repass span').html('✔').css("color", "green");
                $repassflag = true;
            } else {
                $('.repass span').html('两次输入密码不一样，请重新输入').css("color", "red");
                $repassflag = false;
            }
        } else {
            $('.repass span').html('密码不能为空').css("color", "red");
            $repassflag = false;
        }
    });
    //验证手机号码
    let $telflag = true;
    let $tel = $('.tel');
    $tel.on('blur', function () {
        let telreg = /^1[35678]\d{9}$/g;
        if ($tel.val() != '') {
            if (telreg.test($tel.val())) {
                $('.shouji span').html('✔').css("color", "green");
                $usernameflag = true;
            } else {
                $('.shouji span').html('请输入正确的手机号码').css("color", "red")
                $usernameflag = false;
            }
        } else {
            $('.shouji span').html('手机号码不能为空').css("color", "red")
            $usernameflag = false;
        }
    });
    //验证邮箱
    let $emailflag = true;
    let $email = $('.email0');
    $email.on('blur', function () {
        let emailreg = /^\w+(@)\w+(.com)$/g;
        if ($email.val() != '') {
            if (emailreg.test($email.val())) {
                $('.email span').html("✔").css("color", "green");
                $emailflag = true;
            } else {
                $('.email span').html("请输入正确的邮箱").css("color", "red");
                $emailflag = false;
            }
        } else {
            $('.email span').html("邮箱地址不能为空").css("color", "red");
            $emailflag = false;
        }
    })

    //验证提交
    $('form').on('submit', function () {
        if($username.val()===''){
            $('.name span').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        };
        if($password.val()===''){
            $('.password span').html('密码不能为空').css('color', 'red');
            $passwordflag = false;
        };
        if($repass.val()===''){
            $('.repass span').html('密码不能为空').css("color", "red");
            $repassflag = false;
        };
        if($tel.val()===''){
            $('.shouji span').html('手机号码不能为空').css("color", "red")
            $usernameflag = false;
        };
        if($email.val()===''){
            $('.email span').html("邮箱地址不能为空").css("color", "red");
            $emailflag = false;
        };


        if (!$usernameflag || !$passwordflag || !$repassflag || !$telflag || !$emailflag) {
            return false;//阻止提交
        }
    });


}(jQuery);
