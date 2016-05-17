$(function(){
	$("div.admonitionblock table td.icon div").each(function(){
		var div = $(this);
		var title = div.html();
		var i = $("<i class='fa icon-" + title.toLowerCase() + "' title='" + title + "'></i>");
		div.after(i).remove();
	});

	$("code b.conum").each(function(){
		var b = $(this);
		var num = b.html().replace("(", "").replace(")", "");
		var i = $("<i class='conum' data-value='" + num + "'></i>");
		b.after(i).remove();
	});

	$(".colist.arabic ol").each(function(){
		var ol = $(this);
		var contents = [];
		ol.find("p").each(function(){
			contents.push($(this).html());
		});

		var table = $("<table><tbody></tbody></table>");
		var tbody = table.find("tbody");
		for(var i = 0; i < contents.length; i++){
			$("<tr><td><i class='conum' data-value='" + (i + 1) + "'></i><b>" + (i + 1) + "</b></td><td>" + contents[i] + "</td></tr>").appendTo(tbody);
		}
		ol.after(table).remove();
	});

	/*����DOM�ṹ�������ʽҪ��*/
	$('<div>', {id: 'content'})	.append(
		$('.sect1')
	).prependTo('body');

	$('<div>', {id: 'header'})
		.append(
			$('h1')
		)
		.append(
			$('#toc').attr('class', 'toc2')
		).prependTo('body');
	/*����title*/
	$('title').text($('h1').text());
});
