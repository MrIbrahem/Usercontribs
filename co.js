$("#user").attr("required", true);

url = "https://ar.wikipedia.org/w/index.php?title=";

const months = [
	"يناير",
	"فبراير",
	"مارس",
	"أبريل",
	"مايو",
	"يونيو",
	"يوليو",
	"أغسطس",
	"سبتمبر",
	"أكتوبر",
	"نوفمبر",
	"ديسمبر",
];

function make_date(timestamp) {

	const d = new Date(timestamp);

	var month = months[d.getMonth()];

	var min = d.getMinutes();
	if (min.toString().length == 1) min = "0" + min;

	var hou = d.getHours();
	if (hou.toString().length == 1) hou = "0" + hou;

	var day = d.getDate();
	if (day.toString().length == 1) day = "0" + day;

	var date = min + ":&rlm;" + hou + "، " + day + " " + month + " " + d.getFullYear();
	return date;
};

function make_comment(comment, parsedcomment) {
	var colimit = 200;
	var com = comment;
	if (com.indexOf("/*") == -1) {
		com = parsedcomment;
		colimit = 900;
	};

	// strip long comments to colimit
	if (com.length > colimit) {
		com = com.substring(0, colimit) + "...";
	};
	// replace (href="/wiki/) by (href="https://ar.wikipedia.org/wiki/) in com
	var wikiurl = "https://ar.wikipedia.org/wiki/";

	com = com.replace(/href="\/wiki\//g, 'href="' + wikiurl);
	com = com.replace(/href='\/wiki\//g, "href='" + wikiurl);
	return com;
}

function get2(user, limit, rccontinue, before) {
	// $("#username").text(user);
	// make user url

	$(".nowlimit").text(limit);

	if (rccontinue != '') {

		$(".newst").html("<a href='" + 'index.php?user=' + user + '&limit=' + limit + "'>الأحدث</a>");

		var ure = 'index.php?user=' + user + '&limit=' + limit;

		if (before != '') {
			var ure = 'index.php?user=' + user + '&rccontinue=' + before + '&limit=' + limit;
		};


		$(".pref1").html("<a href='" + ure + "'>أحدث " + limit + "</a>");
		$("#pref2").html("<a href='" + ure + "'>أحدث " + limit + "</a>");

	};

	$("#username").html("مساهمات <a href='https://ar.wikipedia.org/wiki/user:" + user + "' target='_blank'>مستخدم:" + user + "</a>");

	var url2 = "https://ar.wikipedia.org/w/api.php";
	var params = {
		action: "query",
		list: "recentchanges",
		rcprop: "title|timestamp|ids|tags|sizes|sha1|redirect|patrolled|parsedcomment|loginfo|oresscores|flags|comment|userid|user",
		rclimit: limit,
		format: "json",
		utf8: 1,
		rcuser: user,
		rctype: "edit|new"
	};

	if (rccontinue != '') {
		params.rccontinue = rccontinue;
	};

	url2 = url2 + "?origin=*";
	// url2 = url2 + "?format=json";
	Object.keys(params).forEach(function(key) {
		url2 += "&" + key + "=" + params[key];
	});

	fetch(url2)
		.then(function(response) {
			return response.json();
		})
		.then(function(response) {
			/*{
                "type": "new",
                "ns": 0,
                "title": "مانداكس",
                "pageid": 8759796,
                "revid": 58098959,
                "old_revid": 0,
                "rcid": 270123409,
                "user": "7MaNdAx",
                "userid": 2268617,
                "new": "",
                "oldlen": 0,
                "newlen": 8774,
                "timestamp": "2022-05-14T22:17:12Z",
                "comment": "kul",
                "parsedcomment": "kul",
                "unpatrolled": "",
                "tags": [
                    "تمت إضافة وسم nowiki",
                    "visualeditor"
                ],
                "sha1": "bc4551a6c5fd0612bd4726bcce99d4c8d2ac2161",
                "oresscores": {
                    "damaging": {
                        "true": 0.106,
                        "false": 0.894
                    }
                }
            }*/
			var recentchanges = response.query.recentchanges;
			var numb = 0;
			for (var rc in recentchanges) {
				var date = make_date(recentchanges[rc].timestamp);
				var space = "&nbsp;";
				var line = "";
				if (numb < 10) line += "&nbsp;";
				//line = "<span>" + recentchanges[rc].timestamp + "</span>&rlm;" + space;

				line += "<span id='ns' style='display:none;'>" + recentchanges[rc].ns + "</span>";
				line += "<span id='edittype' style='display:none;'>" + recentchanges[rc].type + "</span>";

				line += "<span class='date' id='date'>" + date + "</span>";

				var dh = "<a href='" + url + recentchanges[rc].title + "&diff=prev&oldid=" + recentchanges[rc].revid + "'>فرق</a>";
				dh += space + "-" + space + "<a href='" + url + recentchanges[rc].title + "&action=history'>تاريخ</a>";

				line += "\n<span> . . </span>( " + dh + " )<span> . . </span>&rlm;\n";

				// diffrent between old lenth and new lenth
				var lenthdiff = recentchanges[rc].newlen - recentchanges[rc].oldlen;
				var diff = '';
				if (lenthdiff > 0) {
					lenthdiff = "+" + lenthdiff;
					diff = "<span class='diff' style='color:green;' id='diff" + numb + "'>" + lenthdiff + "</span>";
				} else {
					diff = "<span class='diff' style='color:red;' id='diff" + numb + "'>" + lenthdiff + "</span>";
				}

				line += '(' + diff + ')<span> . . </span>';

				if (recentchanges[rc].type == "edit") {
					line += "";
				} else {
					line += '<abbr style="text-underline-position: under;font-weight: bold;" title="أنشأ هذا التعديل صفحة جديدة">ج&zwnj;</abbr>';
				};


				var len = lenthdiff.toString().length;
				// alert(len);
				var digits = 8 - len;
				// line += '(' + digits +  ')';

				var sas = "";
				for (var i = 0; i < digits; i++) {
					sas += "&nbsp;";
				};

				line += sas + '&rlm;\n';

				line += "\n<a href='" + url + recentchanges[rc].title + "'>" + recentchanges[rc].title + "</a>\n";

				var comment = make_comment(recentchanges[rc].comment, recentchanges[rc].parsedcomment);
				
				line += "\n<span id='comment'>(" + comment + ")</span>&rlm;\n";

				$("#li" + numb).html(line);
				$("#li" + numb).addClass(recentchanges[rc].type);

				$("#li" + numb).addClass("nsall");
				$("#li" + numb).addClass("ns" + recentchanges[rc].ns);
				//----------------------
				var ns = recentchanges[rc].ns;
				if (ns == 2 || ns == 3) $("#ns2").show();
				if (ns == 4 || ns == 5) $("#ns4").show();
				if (ns == 6 || ns == 7) $("#ns6").show();
				if (ns == 10 || ns == 11) $("#ns10").show();
				if (ns == 12 || ns == 13) $("#ns12").show();
				if (ns == 100 || ns == 101) $("#ns100").show();
				if (ns == 828 || ns == 829) $("#ns828").show();
				//----------------------
				numb++;
			}

			var rcc = response.continue.rccontinue;

			if (rcc != undefined && rcc != null) {
				var ure = 'index.php?user=' + user + '&rccontinue=' + rcc + '&before=' + rccontinue + '&limit=' + limit;

				$(".next1").html("<a href='" + ure + "'>أقدم " + limit + "</a>");

			};

		})
		.catch(function(error) {
			console.log(error);
		});

};

function get(user, limit, rccontinue, before) {
	var urs = 'index.php?user=' + user;
	if (rccontinue != '') urs += '&rccontinue=' + rccontinue;
	urs += '&limit=';

	$(".limit20").html("<a href='" + urs + "20'>20</a>");
	$(".limit50").html("<a href='" + urs + "50'>50</a>");
	$(".limit100").html("<a href='" + urs + "100'>100</a>");
	$(".limit250").html("<a href='" + urs + "250'>250</a>");
	$(".limit500").html("<a href='" + urs + "500'>500</a>");
	$(".limit500").html("<a href='" + urs + "500'>500</a>");

	get2(user, limit, rccontinue, before);

};
let edit_types = 'all';
let ns_types = 'all';

function filterSelection(c) {
	edit_types = c;
	if (c == "all") c = "filterDiv";
	$(".filterDiv").hide();
	//-------------
	$("." + c).show();
	//-------------
	filterbyns(ns_types);
	//-------------
}

function filterbyns(c) {
	ns_types = c;
	$(".nsall").hide();
	$(".ns" + c).show();
	//-------------------
	if (edit_types != 'all') {
		if (edit_types == 'edit')  $(".new").hide();
		if (edit_types == 'new')   $(".edit").hide();
	};
	//-------------------
}
function myFunction() {
    var input, filter, ol, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ol = document.getElementById("rc");
    li = ol.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = $(a).text();
        if (txtValue.toUpperCase().indexOf(filter) > -1 && li[i].style.display != "none") {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

$(document).ready(function(){
	
	// Add active class to the current control button (highlight it)
	$(".btn2").click(function(){
		$(".btn2").removeClass("active");
		$(this).addClass("active");
	});
	// Add active class to the current control button (highlight it)
	$(".btn1").click(function(){
		$(".btn1").removeClass("active");
		$(this).addClass("active");
	});
});