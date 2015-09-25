<?php
require_once './vendor/autoload.php';

$config = new \Flow\Config();
$config->setTempDir('./upload_cache');
$request = new \Flow\Request();
$info = new SplFileInfo($request->getFileName());
if (\Flow\Basic::save('./uploads/'.$request->getIdentifier().'.'.$info->getExtension(), $config, $request)) {
  // file saved successfully and can be accessed at './final_file_destination'
}
else {
	echo ("ERROR!");
}
?>