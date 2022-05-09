<!DOCTYPE HTML>
<html dir=rtl>
<head>
    <title>Usercontribs</title>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
<?php
    //---------------- 
    $new = '
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    ';
    //---------------- 
    if ( $_SERVER['SERVER_NAME'] == 'localhost' ) { 
        echo $new;
    } else {
        echo ' 
    <script src="https://tools-static.wmflabs.org/cdnjs/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://tools-static.wmflabs.org/cdnjs/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://tools-static.wmflabs.org/cdnjs/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">
    ';
    };
?>
    <link rel="stylesheet" type="text/css" href="https://tools-static.wmflabs.org/cdnjs/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">

    <script src="co.js"></script>
<style>
    .boldfont {
        font-weight: bold;
    }
    .changeslist {
        content: '. .';
    }
    .btne {
        border: none;
        outline: none;
        padding: 6px 12px;
        background-color: #f1f1f1;
        cursor: pointer;
    }

    .btne:hover {
        background-color: #ddd;
    }
</style>
</head>
<body>
<!-- <span id="rccontinue" style="display:none;"></span> -->
<header class="app-header">
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<span class="navbar-brand" style="color:blue;"> 
                    <a href="index.php">Usercontribs</a>
                </span>
			</div>
			<ul class="nav navbar-nav">
				<li class=""><a href="https://github.com/MrIbrahem/Usercontribs" target="_blank"><span style="font-size:16px">Github</span></a></li>
			</ul>
		</div>
	</nav>
</header>
<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">
                <form id='form' action='index.php' method='get'>
                    <input type='text' name='user' id='user' placeholder='اسم المستخدم' required>
                    <input type='number' name='limit' id='limit' value='250'>
                    <!-- <input type='submit' value='بدء' onclick='test()'> -->
                    <input type='submit' value='بدء'>
                </form>
                <p><span id="msg" style='color:red;'></span></p>
        </div>
    </div>
  <div class="panel panel-default">
      <h2><span id="username">اسم المستخدم</span></h2><br>
    <div class="panel">
        <div class="row">
            <div class="col-sm-6"> 
                <input id="myInput" type="text" placeholder="فرز">
            </div>
            <div class="col-sm-6"> 
                <div id="myBtnContainer">
                    <button class="btne active" onclick="filterSelection('all')"> الكل</button>
                    <button class="btne" onclick="filterSelection('edit')">تعديلات</button>
                    <button class="btne" onclick="filterSelection('new')">إنشاء صفحات</button>
                </div>	
            </div>
        </div>
    </div>
        <div>
            (<span class="newst boldfont">الأحدث</span> | الأقدم)
            عرض (<span class="pref1 boldfont">أحدث <span class="nowlimit"></span></span>  | <span class="next1 boldfont">أقدم <span class="nowlimit"></span></span>)&nbsp;( <span class="limit20 boldfont">20</span> | <span class="limit50 boldfont">50</span> | <span class="limit100 boldfont">100</span> | <span class="limit250 boldfont">250</span> | <span class="limit500 boldfont">500</span> ).
        </div>
    <div id="panel-body" class="panel-body">
        <ol id="rc">

        <?php
            $limit = $_REQUEST["limit"] ? $_REQUEST["limit"] : '250';
            #------------------------
            for ( $i = 0; $i < $limit; $i++ ) {
                echo '<li class="filterDiv" id="li'.$i.'"></li>';
            };
            #------------------------
        ?>
        </ol>
    </div>
    <div>
            (<span class="newst boldfont">الأحدث</span> | الأقدم)
            عرض (<span class="pref1 boldfont">أحدث <span class="nowlimit"></span></span>  | <span class="next1 boldfont">أقدم <span class="nowlimit"></span></span>)&nbsp;( <span class="limit20 boldfont">20</span> | <span class="limit50 boldfont">50</span> | <span class="limit100 boldfont">100</span> | <span class="limit250 boldfont">250</span> | <span class="limit500 boldfont">500</span> ).
        </div>
  </div>

</div>
<?php
    $limit = $_REQUEST["limit"] ? $_REQUEST["limit"] : '250';

    $rccontinue = $_REQUEST["rccontinue"] ? $_REQUEST["rccontinue"] : '';
    $user = $_REQUEST["user"] ? $_REQUEST["user"] : 'Mr.Ibrahembot';
    $before = $_REQUEST["before"] ? $_REQUEST["before"] : '';
    #------------------------
    print("
    <script>
    $('#limit').val('$limit');
    $('.nowlimit').text('$limit');
    $('#user').val('$user');
    get('$user','$limit','$rccontinue','$before');
    // filterSelection('all');
    </script>
    ");

?>
<script>
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#rc li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
</script>

</div>

</body>

</html>