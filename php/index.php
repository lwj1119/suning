<?php
include 'conn.php';
$sql1 = "select * from suning"; //获取所有的数据
$result1 = $conn->query($sql1); //获取数据的结果集(记录集)
$arr1 = array();
for ($i = 0; $i < $result1->num_rows; $i++) {
    $arr1[$i] = $result1->fetch_assoc();
};

$sql2 = "select * from taobaogoods";
$result2 = $conn->query($sql2); //获取数据的结果集(记录集)
$arr2 = array();
for ($i = 0; $i < $result2->num_rows; $i++) {
    $arr2[$i] = $result2->fetch_assoc();
};

class data
{
};
$d1 = new data();

$d1->shuju1 = $arr1;
$d1->shuju2 = $arr2;

// $d1->shuju1 = $arr1; //将数组的值给对象的成员(属性)
// $d1->shuju2 = $arr2; //将数组的值给对象的成员(属性)
// $d1->shuju3 = $arr3; //将数组的值给对象的成员(属性)


echo json_encode($d1);
