<?php


function get_all_results()
{
	$db = new SQLite3('db/score.db');
	$q = $db->query('SELECT * FROM scores');
	$results = array();
	while ($el = $q->fetchArray(SQLITE3_ASSOC)){
		$results[$el['id']] = $el;
	}
	$db->close();
	return $results;
}

function get_result($id)
{	
	$db = new SQLite3('db/score.db');
	$q = $db->prepare('SELECT * FROM scores WHERE id = :id;');
	$q->bindValue(':id', $id);
	$row = $q->execute();
	$result = $row->fetchArray(SQLITE3_ASSOC);
	$q->close();
	$db->close();
	return $result;
}

function post_result($result)
{
	$db = new SQLite3('db/score.db', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
	$q = $db->prepare('INSERT INTO scores (name, score) VALUES (:name,:score)');
	$q->bindValue(':name', $result->name);
	$q->bindValue(':score', $result->score);
	$row = $q->execute();
	$result->id = $db->lastInsertRowid ();
	$q->close();
	$db->close();
	return $result;
}

function delete_result($id){
	$db = new SQLite3('db/score.db', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
	$q = $db->prepare('DELETE FROM scores WHERE id = :id;');
	$q->bindValue(':id', $id);
	$row = $q->execute();
	$q->close();
	$db->close();
	return get_all_results();
}
function put_result($result)
{
	$test = get_result($result->id);
	if ($test){
		$db = new SQLite3('db/score.db', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
		$q = $db->prepare('UPDATE scores SET name= :name , score= :score WHERE id=:id');
		$q->bindValue(':name', $result->name);
		$q->bindValue(':score', $result->score);
		$q->bindValue(':id', $result->id);
		$row = $q->execute();
	}
	else {
		$db = new SQLite3('db/score.db', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
		$q = $db->prepare('INSERT INTO scores (name, score) VALUES (:name,:score)');
		$q->bindValue(':name', $result->name);
		$q->bindValue(':score', $result->score);
		$row = $q->execute();
		$result->id = $db->lastInsertRowid ();
	}
	$q->close();
	$db->close();
	return $result;
}