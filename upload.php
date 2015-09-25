<?php
require_once './vendor/autoload.php';

$config = new Config();
$config->setTempDir(storage_path() . '/upload_cache');
$destination = storage_path() . '/resources/';
$file = new File($config);
$request = new \Flow\Request();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if ( ! $file->checkChunk() ) {
        return \Response::make('',204);
    }
} else {
    if ($file->validateChunk()) {
        $file->saveChunk();
    } else {
        return \Response::make('', 400);
    }
}
if ($file->validateFile() && $file->save($destination . $request->getFileName())) {
    return \Response::make('File upload was completed', 200);
}