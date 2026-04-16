<?php
//path to the json file for storing reviews
$jsonFile = __DIR__ . '/../JSON/Reviews.json';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// helper functions for read/write reviews

function readReviews(string $path): array {
    if (!file_exists($path)) {
        return [];
    }
    $raw = file_get_contents($path);
    $data = json_decode($raw, true);
    return (is_array($data) && isset($data['reviews'])) ? $data['reviews'] : [];
}

function writeReviews(string $path, array $reviews): void {
    $json = json_encode(['reviews' => $reviews], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents($path, $json, LOCK_EX);  //prevents concurrent writes from corrupting the file
}

//routes

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //return reviews
    $reviews = readReviews($jsonFile);
    echo json_encode(['reviews' => $reviews]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //read json
    $body = json_decode(file_get_contents('php://input'), true);

    if (
        !$body ||
        empty($body['product']) ||
        empty($body['rating']) ||
        empty($body['text'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: product, rating, text']);
        exit;
    }

    //build review object
    $review = [
        'product' => htmlspecialchars($body['product'], ENT_QUOTES, 'UTF-8'),
        'rating'  => intval($body['rating']),
        'text'    => htmlspecialchars($body['text'], ENT_QUOTES, 'UTF-8'),
        'date'    => date('c') 
    ];

    //add and save
    $reviews = readReviews($jsonFile);
    array_unshift($reviews, $review);   // newest first
    writeReviews($jsonFile, $reviews);

    echo json_encode(['success' => true, 'review' => $review]);
    exit;
}

//other methods
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
