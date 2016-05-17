var directory = process.cwd();
var asciidoctor = require('asciidoctor.js')();
var opal = asciidoctor.Opal;
var fs = require("fs") ;

function eachChildFile (path, callBack){
	fs.readdirSync(path).forEach(function(item, index){// 遍历文件夹里的文件
		callBack.call(this, item, index);
	})
}

var processor = asciidoctor.Asciidoctor(true);

var options = opal.hash({
	//配置
	doctype: 'article',
	backend: 'html5',
	//safe: 'safe',
	attributes: ['showtitle', 'allow-uri-read']
});

var basicHtml = fs.readFileSync(directory + "/action/basic.html", "utf8");

eachChildFile(directory, function (item) {
	if(item.indexOf('.adoc') > 0){
		var filePath = directory + '/' + item;
		var newFile = directory + '/' + item.replace('.adoc', '.html');
		//console.log(filePath);
		//console.log(newFile);

		var data = fs.readFileSync(filePath, "utf8");
		//转换asciidoc文档内容为html标签
		var contentHtml = processor.$convert(data, options);
		//合并html
		html = basicHtml + contentHtml + "</body></html>";
		// 编辑文档
		fs.writeFile(newFile, html,  function(error) {
			if(error) throw error ;
			console.log("finish: " + item);
		});
	}
});