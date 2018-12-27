$(document).ready(function(){
	
	$("#getOne_btn").click(function(){
				getOneRecord();
			});
	
	$("#getAll_btn").click(function(){
				getAllRecords();
			});
	
	$("#post_btn").click(function(){
				postRecord();
			});
			
	$("#update_btn").click(function(){
				putRecord();
			});	
});

function getOneRecord(){
	record_id = 1;
	if ($('#rid').val()) {
		record_id = $('#rid').val();
	}
	$.ajax({
        method : "GET",
		dataType: 'json',
        url: "http://geniusgamedev.eu/cordova/rest_api/rest_srv/"+record_id,
        cache: false
    })
		.done(function (response) {
			add_record_to_table(response.data);
		})
		.fail(function (msg){
			alert(JSON.stringify(msg));
		});
}

function getAllRecords(){
	$.ajax({
        method : "GET",
		dataType: 'json',
        url: "http://geniusgamedev.eu/cordova/rest_api/rest_srv/",
        cache: false
    })
		.done(function (response) {
			var data = response.data;
			for (let index in data){
				add_record_to_table(data[index]);
			}
			
			//add_record_to_table(response.data);
		})
		.fail(function (msg){
			alert(JSON.stringify(msg));
		});
}

function postRecord(){
	var new_element = {};
	new_element.id = $("#nid").val();
	new_element.name = $("#name").val();
	new_element.score = $("#score").val();
	var data_to_send ={};
	data_to_send.data = new_element;
	$.ajax({
        method : "POST",
		dataType: 'json',
		data: JSON.stringify(data_to_send),
        url: "http://geniusgamedev.eu/cordova/rest_api/rest_srv/",
        cache: false
    })
		.done(function (response) {
			add_record_to_table(response.data);
		})
		.fail(function (msg){
			alert(JSON.stringify(msg));
		});
}

function putRecord(){
	var new_element = {};
	new_element.id = $("#nid").val();
	new_element.name = $("#name").val();
	new_element.score = $("#score").val();
	var data_to_send ={};
	data_to_send.data = new_element;
	$.ajax({
        method : "PUT",
		dataType: 'json',
		data: JSON.stringify(data_to_send),
        url: "http://geniusgamedev.eu/cordova/rest_api/rest_srv/"+new_element.id,
        cache: false
    })
		.done(function (response) {
			add_record_to_table(response.data);
		})
		.fail(function (msg){
			alert(JSON.stringify(msg));
		});
}

function deleteRecord(record_id, row_to_delete){
	$.ajax({
        method : "DELETE",
		dataType: 'json',
        url: "http://geniusgamedev.eu/cordova/rest_api/rest_srv/"+record_id,
        cache: false
    })
		.done(function (response) {
			row_to_delete.remove();
		})
		.fail(function (msg){
			alert(JSON.stringify(msg));
		});
}

function add_record_to_table(data){
	var table = $("#result_tbl");
	var new_row = $("<tr/>");
	var cell = $("<td/>");
	cell.html(data.id);
	cell.appendTo(new_row);
	cell = $("<td/>");
	cell.html(data.name);
	cell.appendTo(new_row);
	cell = $("<td/>");
	cell.html(data.score);
	cell.appendTo(new_row);
	cell = $("<td/>");
	var btn = $("<button/>");
	btn.html("DELETE");
	btn.appendTo(cell);
	cell.appendTo(new_row);
	new_row.appendTo(table);
	btn.click(function (){
		deleteRecord(data.id, new_row);
	});
}