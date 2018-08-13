<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-CSRF-TOKEN');
$json_url="https://pool.viabtc.com/user/api/e573c6ac371821077c0fded1cb5d3fdc/";
$json = file_get_contents($json_url);

echo $json;

?>