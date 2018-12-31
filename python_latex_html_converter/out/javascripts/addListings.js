window.addEventListener("load", function(event) {
    addListings();
  });

function loadFile(fileUrl, textfile, calback){
	textfile = new XMLHttpRequest();
	textfile.onreadystatechange = function ()
        {
            if (textfile.readyState == 4 && textfile.status == 200)
            {
                content = textfile.responseText;
                calback(content);
            }
        }
        textfile.open("GET", fileUrl, true);
        textfile.send();
}

function addListingToTag(tag){
	var lsrc = tag.getAttribute('src');
	loadFile(lsrc, "", function (content){
		content = content.replace(/</g,"&lt;");
		lines = content.split("\n");
		for (i =0; i<lines.length; i++) {
            _code = document.createElement("code");
            if (i<9) _code.setAttribute("class","one_digit");
            else if (i<99) _code.setAttribute("class","two_digit");
            else _code.setAttribute("class","three_digit");
            _code.innerHTML = lines[i] + "\n";
            tag.appendChild(_code);
        }
	});
}

function addListings(){
	var pre_tags = document.getElementsByTagName("pre");
	for (index=0; index<pre_tags.length; index++){
		if (pre_tags[index].className == "from_file"){
			addListingToTag(pre_tags[index]);
		}
			
	}
}
