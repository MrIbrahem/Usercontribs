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

function fetch_url(url,params) {
	var result = [];
	$.ajax({
		url: url,
		data: params,
		async: false,
		success: function(data) {
			result = data;
			// create url with params and log it to console
			console.log( url + "?" + jQuery.param(params) )
		}
	});
	return result;
}

function create_rows(recentchanges,numb) {
	// var numb = 0;
	console.log("numb = " + numb);
	for (var rc in recentchanges) {
		var date = make_date(recentchanges[rc].timestamp);
		var space = "&nbsp;";
		var line = "";
		if (numb < 10) line += "&nbsp;";
		//line = "<span>" + recentchanges[rc].timestamp + "</span>&rlm;" + space;

		line += "<span id='ns' style='display:none;'>" + recentchanges[rc].ns + "</span>";
		line += "<span id='edittype' style='display:none;'>" + recentchanges[rc].type + "</span>";

		line += "<span class='date' id='date'>" + date + "</span>";

		var dh = "<a href='" + url + recentchanges[rc].title + "&diff=prev&oldid=" + recentchanges[rc].revid + "' target='_blank'>فرق</a>";
		dh += space + "-" + space + "<a href='" + url + recentchanges[rc].title + "&action=history' target='_blank'>تاريخ</a>";

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

		line += "\n<a href='" + url + recentchanges[rc].title + "' target='_blank'>" + recentchanges[rc].title + "</a>\n";

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
	return numb;
}

function get_url_params(){
	var result = {};
	var params = window.location.search.substring(1).split("&");
	for (var i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		result[param[0]] = param[1];
	}
	return result;
}

function get2(user, mainlimit, rccontinue) {
	// $("#username").text(user);
	// make user url

	var url2 = "https://ar.wikipedia.org/w/api.php";
	//---------------------
	// limit the limit to 500
	var limit = mainlimit;
	var lima = 500;
	var limit2 = 0;
	limit = parseInt(limit);
	if (limit > lima) {
		limit2 = limit - lima;
		limit = lima;
	};
	//---------------------
	var params = {
		action: "query",
		list: "recentchanges",
		rcprop: "title|timestamp|ids|tags|sizes|sha1|redirect|patrolled|parsedcomment|loginfo|oresscores|flags|comment|userid|user",
		rclimit: limit,
		format: "json",
		utf8: 1,
		rcuser: user,
		rctype: "edit|new",
		rcnamespace: "*",
		origin: "*"
	};

	if (rccontinue != '') {
		params.rccontinue = rccontinue;
	};
	//----------------------
	var parame = get_url_params();
	if (parame.ns != undefined) {
		params.rcnamespace = parame.ns;
	};
	//----------------------
	if (parame.edittype == "edit" || parame.edittype == "new") {
		params.rctype = parame.edittype;
	};
	//----------------------
	var response = fetch_url(url2,params);
	var recent1 = response.query.recentchanges;
	// ---
	var rcc = '';
	if (response.continue != undefined) {
		rcc = response.continue.rccontinue;
	};
	console.log("rcc = " + rcc);
	// ---
	var numb = create_rows(recent1,0);
	// ---
	// ---
	// re create if limit > lenth of recentchanges
	// if (response.continue && limit > recent1.length && limit2 > 0) {
	// if ( limit2 > 0) {
	while (numb < mainlimit && rcc) {
		// --------------
		console.log("re create");
		// --------------
		var limit3 = mainlimit - numb;
		// --------------
		if (limit3 < lima) {
			limit3 = limit3;
		} else {
			limit3 = lima;
		}
		// --------------
		console.log("limit3: " + limit3);
		// --------------
		var params2 = params;
		params2.rccontinue = rcc;
		params2.rclimit = limit3;
		// --------------
		var response2 = fetch_url(url2,params2);
		var recent2 = response2.query.recentchanges;
		// --------------
		rcc = response2.continue.rccontinue;
		console.log("rcc2 = " + rcc);
		numb = create_rows(recent2,numb);
		// --------------
	}
	// ---
	if (rcc != undefined && rcc != null) {
		var ure = 'index.php?user=' + user + '&rccontinue=' + rcc + '&before=' + rccontinue + '&limit=' + mainlimit;
		$(".next1").html("<a href='" + ure + "'>أقدم " + mainlimit + "</a>");
	};
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

	$(".nowlimit").text(limit);

	if (rccontinue != '') {
		$(".newst").html("<a href='" + 'index.php?user=' + user + '&limit=' + limit + "'>الأحدث</a>");
		var ure = 'index.php?user=' + user + '&limit=' + limit;
		if (before != '') {
			var ure = 'index.php?user=' + user + '&rccontinue=' + before + '&limit=' + limit;
		};
		$(".pref1").html("<a href='" + ure + "'>أحدث " + limit + "</a>");

	};

	$("#username").html("مساهمات <a href='https://ar.wikipedia.org/wiki/user:" + user + "' target='_blank'>مستخدم:" + user + "</a>");

	get2(user, limit, rccontinue);

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
function filtertext() {
    var input, filter, ol, li, a, i, txtValue;
    input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	// if value != numbers only
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
	if (filter == '') {
		filterSelection(edit_types);
	}
}
//-------------------

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

// remove .png
