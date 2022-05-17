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
    .btn {
        border: none;
        outline: none;
        padding: 6px 12px;
        background-color: #f1f1f1;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #ddd;
    }
    .btn.active {
        background-color: #666;
        color: white;
    }
    .smallbtn {
        padding: 6px 1px;
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
<div class="container" dir="rtl">
    <div class="panel panel-default">
        <div class="panel-heading">
                <form id='form' action='index.php' method='get'>
                    <input type='text' name='user' id='user' placeholder='اسم المستخدم' required>
                    <input type='number' name='limit' id='limit' value='250'>
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
                <div id="myBtnContainer">
                    <button class="btn btn1 active" onclick="filterbyns('all')">الكل</button>
                    <button class="btn btn1" onclick="filterbyns('0')">مقالات</button>
                    <button class="btn btn1 smallbtn" onclick="filterbyns('1')">(ن)</button>

                    <button class="btn btn1" onclick="filterbyns('14')">تصنيفات</button>
                    <button class="btn btn1 smallbtn" onclick="filterbyns('15')">(ن)</button>
                    <span id="ns10" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('10')">قوالب</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('11')">(ن)</button>
                    </span>
                    <span id="ns2" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('2')">مستخدم</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('3')">(ن)</button>
                    </span>
                    <span id="ns4" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('4')">ويكيبيديا</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('5')">(ن)</button>
                    </span>
                    <span id="ns6" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('6')">ملف</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('7')">(ن)</button>
                    </span>
                    <span id="ns12" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('12')">مساعدة</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('13')">(ن)</button>
                    </span>
                    <span id="ns100" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('100')">بوابة</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('101')">(ن)</button>
                    </span>
                    <span id="ns828" style="display:none;">
                        <button class="btn btn1" onclick="filterbyns('828')">وحدة</button>
                        <button class="btn btn1 smallbtn" onclick="filterbyns('829')">(ن)</button>
                    </span>
                </div>	
            </div>
            <div class="col-sm-3"> 
                <input id="myInput" type="text" placeholder="فرز" onkeyup="myFunction()">
            </div>
            <div class="col-sm-3"> 
                <div id="myBtnContainer1">
                    <button class="btn btn2 active" onclick="filterSelection('all')"> الكل</button>
                    <button class="btn btn2" onclick="filterSelection('edit')">تعديلات</button>
                    <button class="btn btn2" onclick="filterSelection('new')">إنشاء</button>
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
    </script>
    ");

?>

</div>

</body>

</html>