# Our Program

## Overview

This API provides endpoints to get, create, update, and delete our programs.

## Description Our Program

    {
        "title":"Bersama Membangun Masa Depan yang Lebih Baik",
        "description":"Kami menyediakan ruang untuk demokrasi, pendidikan, kewirausahaan, kolaborasi sosial, dan harmoni antaragama. Melalui program yang berdampak, IDE Indonesia mendukung generasi muda menjadi pemimpin masa depan yang siap bersaing di tingkat global."
    }

---

### Get Our Program

#### Endpoint : GET /api/ourprogram

Request Body: No request body required.

Response Body:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success get data",
        "data": {
            "id":"uuid",
            "title":"Bersama Membangun Masa Depan yang Lebih Baik",
            "description":"Kami menyediakan ruang untuk demokrasi, pendidikan, kewirausahaan, kolaborasi sosial, dan harmoni antaragama. Melalui program yang berdampak, IDE Indonesia mendukung generasi muda menjadi pemimpin masa depan yang siap bersaing di tingkat global."
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed get data",
    }

### Update Our Program

#### Endpoint : PUT /api/ourprogram

- Headers :
  - Authorization : token

Request Body:

    {
        "title":"Bersama Membangun Masa Depan yang Lebih Baik",
        "description":"Kami menyediakan ruang untuk demokrasi, pendidikan, kewirausahaan, kolaborasi sosial, dan harmoni antaragama. Melalui program yang berdampak, IDE Indonesia mendukung generasi muda menjadi pemimpin masa depan yang siap bersaing di tingkat global."
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success update data",
        "data": {
            "id":"uuid",
            "title":"Bersama Membangun Masa Depan yang Lebih Baik",
            "description":"Kami menyediakan ruang untuk demokrasi, pendidikan, kewirausahaan, kolaborasi sosial, dan harmoni antaragama. Melalui program yang berdampak, IDE Indonesia mendukung generasi muda menjadi pemimpin masa depan yang siap bersaing di tingkat global."
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed update data",
    }

---

## What We Do

    {
        "category": "Program",
        "description": "Kajian demokrasi dan dialog politik.",
        "detail": "Menyediakan ruang kajian, penelitian, diskusi, dialog, serta kolaborasi untuk memperkuat wawasan demokrasi dan pendidikan politik.",
        "icon": "https://example.com/icon.png",
        "image": "https://example.com/image.png",
        "link": "https://example.com/whatwedo",
        "title": "Democracy Affairs"
    }

---

### Get What We Do

#### Endpoint : GET /api/ourprogram/whatwedo

Request Body: No request body required.

Response Body:

    {
        "data": [
            {
                "category": "Program",
                "description": "Kajian demokrasi dan dialog politik.",
                "detail": "Menyediakan ruang kajian, penelitian, diskusi, dialog, serta kolaborasi untuk memperkuat wawasan demokrasi dan pendidikan politik.",
                "icon": "https://example.com/icon.png",
                "id": "uuid",
                "image": "https://example.com/image.png",
                "link": "https://example.com/whatwedo",
                "title": "Democracy Affairs"
            }
        ],
        "error": false,
        "message": "success get data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

Response Body Failed:

    {
        "error": true,
        "message": "failed get data",
        "status": "failed",
        "statusCode": 400,
        "success": false
    }

---

### Get What We Do By ID

#### Endpoint : GET /api/ourprogram/whatwedo/:id

Request Body: No request body required.

Response Body:

    {
        "data": {
            "category": "Program",
            "description": "Kajian demokrasi dan dialog politik.",
            "detail": "Menyediakan ruang kajian, penelitian, diskusi, dialog, serta kolaborasi untuk memperkuat wawasan demokrasi dan pendidikan politik.",
            "icon": "https://example.com/icon.png",
            "id": "uuid",
            "image": "https://example.com/image.png",
            "link": "https://example.com/whatwedo",
            "title": "Democracy Affairs"
        },
        "error": false,
        "message": "success get data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

Response Body Failed:

    {
        "error": true,
        "message": "failed get data",
        "status": "failed",
        "statusCode": 400,
        "success": false
    }

---

### Create What We Do

#### Endpoint : POST /api/ourprogram/whatwedo

- Headers :
  - Authorization : token

Request Body:

    {
        "category": "Program",
        "description": "Kajian demokrasi dan dialog politik.",
        "detail": "Menyediakan ruang kajian, penelitian, diskusi, dialog, serta kolaborasi untuk memperkuat wawasan demokrasi dan pendidikan politik.",
        "icon": "https://example.com/icon.png",
        "image": "https://example.com/image.png",
        "link": "https://example.com/whatwedo",
        "title": "Democracy Affairs"
    }

Response Body Success:

    {
        "error": false,
        "message": "success create data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

Response Body Failed:

    {
        "error": true,
        "message": "failed create data",
        "status": "failed",
        "statusCode": 400,
        "success": false
    }

---

### Update What We Do

#### Endpoint : PUT /api/ourprogram/whatwedo/:id

- Headers :
  - Authorization : token

Request Body:

    {
        "category": "Program",
        "description": "Kajian demokrasi dan dialog politik.",
        "detail": "Menyediakan ruang kajian, penelitian, diskusi, dialog, serta kolaborasi untuk memperkuat wawasan demokrasi dan pendidikan politik.",
        "icon": "https://example.com/icon.png",
        "image": "https://example.com/image.png",
        "link": "https://example.com/whatwedo",
        "title": "Democracy Affairs"
    }

Response Body Success:

    {
        "error": false,
        "message": "success update data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

---

### Delete What We Do

#### Endpoint : DELETE /api/ourprogram/whatwedo/:id

- Headers :
  - Authorization : token

Request Body: No request body required.

Response Body Success:

    {
        "error": false,
        "message": "success delete data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

Response Body Failed:

    {
        "error": true,
        "message": "failed delete data",
        "status": "failed",
        "statusCode": 400,
        "success": false
    }

---
