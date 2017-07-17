<?php
include_once('db.php');
echo $_POST;
/*
switch($_POST['role']) {
	case 'cto':
		$role = 'CTO';
		break;

	case 'dev':
		$role = 'DEV';
		break;

	default:
		$role = 'DEV';
}
echo $role;
die();
//$res = $db->query('SELECT * FROM user WHERE firstname = "'.$db->escape_string($_POST['firstname']).'"');
$res = $db->query('SELECT * FROM user WHERE $role = 1');
while ($row = $res->fetch_assoc()) {
	$user[] = $row;
}

echo $user;
*/
die();
?>