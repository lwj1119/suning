<?php
include "conn.php";

//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from huiyuan where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

// //接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repass = $_POST['repass'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $conn->query("insert huiyuan values(null,'$username','$password','$repass','$tel','$email',NOW())");
    header('location:http://localhost/jsLwj/src/suning/html/log.html');
}
