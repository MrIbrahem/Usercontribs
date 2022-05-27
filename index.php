<!DOCTYPE HTML>
<html lang="ar" dir="rtl">
<head>
    <title>Usercontribs</title>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
<?php
    //---------------- 
    $new = '
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
    ';
    //---------------- 
    if ( $_SERVER['SERVER_NAME'] == 'localhost' ) { 
        echo $new;
    } else {
        echo ' 
    <script src="https://tools-static.wmflabs.org/cdnjs/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://tools-static.wmflabs.org/cdnjs/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://tools-static.wmflabs.org/cdnjs/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.rtl.min.css">
    ';
    };
    echo '<link rel="stylesheet" type="text/css" href="https://tools-static.wmflabs.org/cdnjs/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">';
    // -----------------
    if ($_REQUEST['test'] == '' ) {
        echo '<script src="co.js"></script>';
    }
    // -----------------
?>
<style>
    :root {    --bs-font-sans-serif: "";}
    .boldfont {
        font-weight: bold;
    }
    .changeslist {
        content: '. .';
    }
    .btn {
    }

    .btn:hover {
        background-color: #ddd;
    }
    .page-link1 {
        border:1px;
    }
    .btn1 {
        padding: 6px 5px;
    }
    .smallbtn {
        padding: 6px 1px;
    }
</style>
</head>
<!-- <span id="rccontinue" style="display:none;"></span> -->
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="index.php">Usercontribs</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="عرض/إخفاء لوحة التنقل">
    <span class="navbar-toggler-icon"></span>
  </button>
  <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="بحث" aria-label="بحث"> -->
  <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="https://github.com/MrIbrahem/Usercontribs" target="_blank">Github</a>
    </div>
  </div>
</header>

<body>
<div class="container mt-3">
    <div class="card">
        
        <div class="card-header">
            <form id='form' action='index.php' method='get'>
            <div class="row">
                <div class="col-sm-6">
                    <div class="input-group mb-3">
                        <span class="input-group-text">المستخدم</span>
                        <input type='text' size="10" class="form-control" name='user' id='user' placeholder='اسم المستخدم' required>

                        <span class="input-group-text">النطاق</span>
                        <select class="" name="ns" id="ns">
                            <option value="all" selected>الكل</option>
                            <option value="0">(مقالات)</option>
                            <option value="1">نقاش</option>
                            <option value="2">مستخدم</option>
                            <option value="3">نقاش المستخدم</option>
                            <option value="4">ويكيبيديا</option>
                            <option value="5">نقاش ويكيبيديا</option>
                            <option value="6">ملف</option>
                            <option value="7">نقاش الملف</option>
                            <option value="8">ميدياويكي</option>
                            <option value="9">نقاش ميدياويكي</option>
                            <option value="10">قالب</option>
                            <option value="11">نقاش القالب</option>
                            <option value="12">مساعدة</option>
                            <option value="13">نقاش المساعدة</option>
                            <option value="14">تصنيف</option>
                            <option value="15">نقاش التصنيف</option>
                            <option value="100">بوابة</option>
                            <option value="101">نقاش البوابة</option>
                            <option value="828">وحدة</option>
                            <option value="829">نقاش الوحدة</option>
                        </select>
                    </div>
                    
                </div>
                <div class="col-sm-5">
                    <div class="input-group mb-3">
                        <span class="input-group-text">النوع:</span>
                        <select  class="form-control" name="edittype" id="edittype">
                            <option value="all">الكل</option>
                            <option value="new">إنشاء صفحات</option>
                            <option value="edit">تعديلات</option>
                        </select>
                        <span class="input-group-text">الحد:</span>
                        <input type='number' class="form-control" style="width: 4em" name='limit' id='limit' value='<?php echo $_REQUEST['limit']; ?>'>
                    </div>
                </div>
                <div class="col-sm-1">
                    <input class="btn btn-primary form-control"  type='submit' value='بدء'>
                </div>
            </div>
            </form>
        </div>
        <div class="card-body">
            <h2><span id="username">اسم المستخدم</span></h2>
        </div>
        <div>
            <div class="row">
                <div class="col-sm-3">
                    <button type="button" class="btn btn2 btn-outline-primary active" onclick="filterSelection('all')"> الكل</button>
                    <button type="button" class="btn btn2 btn-outline-primary" onclick="filterSelection('edit')">تعديلات</button>
                    <button type="button" class="btn btn2 btn-outline-primary" onclick="filterSelection('new')">إنشاء</button>
                </div>
                <div class="col-sm-3"> 
                    <input id="myInput" type="text" placeholder="فرز" onkeyup="filtertext()">
                </div>
                <div class="col-sm-6"> 
                    <div id="myBtnContainer">
                        <button class="btn btn-outline-primary btn1 active" onclick="filterbyns('all')">الكل</button>
                        <button class="btn btn-outline-primary btn1" onclick="filterbyns('0')">مقالة</button>
                        <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('1')">(ن)</button>

                        <button class="btn btn-outline-primary btn1" onclick="filterbyns('14')">تصنيف</button>
                        <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('15')">(ن)</button>
                        <span id="ns10" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('10')">قالب</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('11')">(ن)</button>
                        </span>
                        <span id="ns2" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('2')">مستخدم</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('3')">(ن)</button>
                        </span>
                        <span id="ns4" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('4')">ويكيبيديا</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('5')">(ن)</button>
                        </span>
                        <span id="ns6" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('6')">ملف</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('7')">(ن)</button>
                        </span>
                        <span id="ns12" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('12')">مساعدة</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('13')">(ن)</button>
                        </span>
                        <span id="ns100" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('100')">بوابة</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('101')">(ن)</button>
                        </span>
                        <span id="ns828" style="display:none;">
                            <button class="btn btn-outline-primary btn1" onclick="filterbyns('828')">وحدة</button>
                            <button class="btn btn-outline-secondary btn1 smallbtn" onclick="filterbyns('829')">(ن)</button>
                        </span>
                    </div>	
                </div>
            </div>
        </div>
    
    </div>
    <br>
    <div class="card">
        <div class="card-header">
            <ul class="breadcrumb">
                <li>(<span class="newst boldfont">الأحدث</span> | الأقدم)&nbsp;</li>
                <li>عرض (<span class="pref1 boldfont">أحدث <span class="nowlimit"></span></span></li>
                <li>&nbsp;|&nbsp;<span class="next1">أقدم <span class="nowlimit"></span></span>)</li>
                <li>&nbsp;(</li>
                <li class="breadcrumb-item limit20"><a href='#'>20</a></li>
                <li class="breadcrumb-item limit50"><a href='#'>50</a></li>
                <li class="breadcrumb-item limit100"><a href='#'>100</a></li>
                <li class="breadcrumb-item limit250"><a href='#'>250</a></li>
                <li class="breadcrumb-item limit500"><a href='#'>500</a></li>
                <li>).</li>
            </ul>
        </div>
        <div class="card-body">
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
        <div class="card-footer">
            <ul class="breadcrumb">
                <li>(<span class="newst boldfont">الأحدث</span> | الأقدم)&nbsp;</li>
                <li>عرض (<span class="pref1 boldfont">أحدث <span class="nowlimit"></span></span></li>
                <li>&nbsp;|&nbsp;<span class="next1">أقدم <span class="nowlimit"></span></span>)</li>
                <li>&nbsp;(</li>
                <li class="breadcrumb-item limit20"><a href='#'>20</a></li>
                <li class="breadcrumb-item limit50"><a href='#'>50</a></li>
                <li class="breadcrumb-item limit100"><a href='#'>100</a></li>
                <li class="breadcrumb-item limit250"><a href='#'>250</a></li>
                <li class="breadcrumb-item limit500"><a href='#'>500</a></li>
                <li>).</li>
            </ul>
        </div>
    </div>
    <br>

</div>

<?php
    $limit = $_REQUEST["limit"] ? $_REQUEST["limit"] : '250';
    $rccontinue = $_REQUEST["rccontinue"] ? $_REQUEST["rccontinue"] : '';
    $user = $_REQUEST["user"] ? $_REQUEST["user"] : 'Mr.Ibrahembot';
    $before = $_REQUEST["before"] ? $_REQUEST["before"] : '';
    $ns = $_REQUEST["ns"] != '' ? $_REQUEST["ns"] : 'all';
    $edittype = $_REQUEST["edittype"] != '' ? $_REQUEST["edittype"] : 'all';
    #------------------------
    $show = '';
    #------------------------
    if ($_REQUEST['test'] != '' ){
        $show = '
		$("#ns2").show();
		$("#ns4").show();
		$("#ns6").show();
		$("#ns10").show();
		$("#ns12").show();
		$("#ns100").show();
		$("#ns828").show();';
    }
    #------------------------
    print("
    <script>
    $show;
    document.getElementsByName('ns')[0].value = '$ns'
    document.getElementsByName('edittype')[0].value = '$edittype'
    $('#limit').val('$limit');
    $('.nowlimit').text('$limit');
    $('#user').val('$user');
    get('$user','$limit','$rccontinue','$before');
    </script>
    ");

?>

</div>
<script>
    
</script>
</body>

</html>