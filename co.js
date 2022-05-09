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
	Object.keys(params).forEach(function(key) {
		url2 += "&" + key + "=" + params[key];
	});

	fetch(url2)
		.then(function(response) {
			return response.json();
		})
		.then(function(response) {

			var recentchanges = response.query.recentchanges;

			var numb = 0;

			for (var rc in recentchanges) {

				const d = new Date(recentchanges[rc].timestamp);

				var month = months[d.getMonth()];

				var min = d.getMinutes();
				if (min.toString().length == 1) min = "0" + min;

				var hou = d.getHours();
				if (hou.toString().length == 1) hou = "0" + hou;

				var day = d.getDate();
				if (day.toString().length == 1) day = "0" + day;

				var date = min + ":&rlm;" + hou + "، " + day + " " + month + " " + d.getFullYear();

				var space = "&nbsp;";
				var line = "";
				if (numb < 10) line += "&nbsp;";
				//line = "<span>" + recentchanges[rc].timestamp + "</span>&rlm;" + space;

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

				var colimit = 200;
				var comment = recentchanges[rc].comment;
				if (comment.indexOf("/*") == -1) {
					comment = recentchanges[rc].parsedcomment;
					colimit = 500;
				};

				// strip long comments to 70 
				if (comment.length > colimit) {
					comment = comment.substring(0, colimit) + "...";
				};

				line += "\n<span id='comment'>(" + comment + ")</span>&rlm;\n";

				$("#li" + numb).html(line);
				$("#li" + numb).addClass(recentchanges[rc].type);
				/*
				var newli = "\n<li class='filterDiv " + recentchanges[rc].type + "'>" + line + "</li>\n";
				tableBody = $("#rc");
				tableBody.append(newli);
				*/

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

	// var lll = $("#tablimit1").html();
	// $("#tablimit2").text('sss');
};

function filterSelection(c) {
	if (c == "all") c = "filterDiv";
	$(".filterDiv").hide();
	$("." + c).show();
}