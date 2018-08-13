<?php
	include('./config_head.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,IE=9,IE=8">
	<title><?php echo title; ?></title>
	<style>
		h1{
			font-size: 0;
		}
	</style>
</head>

<body>
	<h1>sdadsadad</h1>
	<div class="container">
		<pre class="eth"></pre>
	</div>
</body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>

<script>
	$(function () {
		$.ajax({
			url: 'getAPI.php',
			dataType: 'json',
			success: function(data) {
				$('.eth').html(data.eth)
				console.log(data.eth)
			},
			error:function(err){
				console.log('error',err)
			}
		});
	})

</script>

</html>