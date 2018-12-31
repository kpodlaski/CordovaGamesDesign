/* Author: Krzysztof Podlaski, University of Lodz */
<?php
header("Content-Type:application/json");
require "score.php";

header('Access-Control-Allow-Origin: *');

switch( $_SERVER['REQUEST_METHOD'] ){
	case "GET" : get_request(); break;
	case "POST" : post_request(); break;
	case "PUT" : put_request(); break;
	case "DELETE" : delete_request(); break;
	default: send("def");
}

function get_request(){
	if(!empty($_GET['id']))
	{
		$id=$_GET['id'];
		$element = get_result($id);
	
		if(empty($element))
		{
			send(NULL);
		}
		else
		{
			send($element);
		}
	}
	else {
		$element = get_all_results();
		send($element);
	}
}

function post_request(){
	$obj = json_decode(file_get_contents("php://input"));
	$o =post_result($obj->data);
	send($o);
}

function put_request(){
	$obj = json_decode(file_get_contents("php://input"));
	$o =put_result($obj->data);
	send($o);
}

function delete_request(){
	if (isset($_GET['id'])){
		$list = delete_result($_GET['id']);
		send($list);
	} 
	else {
		send(null);
	}
}

function send($data)
{
	header("HTTP/1.1 ".$st);	
	$resp['data']=$data;
	$json = json_encode($resp);
	echo $json;
}