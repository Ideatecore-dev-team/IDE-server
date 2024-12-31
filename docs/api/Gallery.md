# Gallery

## Overview

This API provides endpoints to get, create, update, and delete gallery.

---

## Description Gallery

    {
        "description":"Gallery description",
        "title":"Gallery",
    }

---

### Get Gallery description

#### Endpoint : GET /api/gallery/description

Request Body: No request body required.

Response Body:

    {
        "data": {
            "description":"Leadership is the capacity to translate vision into reality.",
            "id": "uuid",
            "title":"Our Story in Pictures",
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

### Update Gallery description

#### Endpoint : PUT /api/gallery/description

Request Body:

    {
        "description":"Updated Gallery description",
        "title":"Updated Gallery",
    }

Response Body Success:

    {
        "data": {
            "description":"Updated Gallery description",
            "id": "uuid",
            "title":"Updated Gallery",
        },
        "error": false,
        "message": "success update data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

---

### Get Gallery

#### Endpoint : GET /api/gallery/images

Request Body: No request body required.

Response Body:

    {
        "data": [
            {
                "id": "uuid",
                "image": "https://example.com/image.jpg",
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

### Get Gallery By ID

#### Endpoint : GET /api/gallery/images/:id

Request Body: No request body required.

Response Body:

    {
        "data": {
            "id": "uuid",
            "image": "https://example.com/image.jpg",
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

### Create Gallery

#### Endpoint : POST /api/gallery/images

Request Body:

    {
        "image":"https://example.com/image.jpg",
    }

Response Body Success:

    {
        "error": false,
        "message": "success create data",
        "status": "success",
        "statusCode": 201,
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

### Update Gallery

#### Endpoint : PUT /api/gallery/images/:id

Request Body:

    {
        "image":"https://example.com/image.jpg",
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

### Delete Gallery

#### Endpoint : DELETE /api/gallery/images/:id

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
