# Article

## Overview

This API provides endpoints to get, create, update, and delete article.

---

## Description Article

    {
        "description":Temukan berita menarik seputar pemuda indonesia disini!",
        "title":"Article IDE Indonesia",
    }

---

## Get Article description

#### Endpoint : GET /api/article/description

Request Body: No request body required.

Response Body:

    {
        "data": {
            "description":"Temukan berita menarik seputar pemuda indonesia disini!",
            "id": "uuid",
            "title":"Article IDE Indonesia",
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

## Update Article description

#### Endpoint : PUT /api/article/description

Request Body:

    {
        "description":"Temukan berita menarik seputar pemuda indonesia disini!",
        "title":"Article IDE Indonesia",
    }

Response Body Success:

    {
        "data": {
            "description":"Temukan berita menarik seputar pemuda indonesia disini!",
            "id": "uuid",
            "title":"Article IDE Indonesia",
        },
        "error": false,
        "message": "success update data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

Response Body Failed:

    {
        "error": true,
        "message": "failed update data",
        "status": "failed",
        "statusCode": 400,
        "success": false
    }

---

### Get Article

    {
        "title":"Article title",
        "category":"Article category",
        "description":"Article description",
        "content":"Article content",
        "image":"Article image",
        "author":"Article author",
        "date":"Article date",
        "id": "uuid",
    }

#### Endpoint : GET /api/article

Request Body: No request body required.

Response Body:

    {
        "data": [
            {
                "id": "cm5lde97m0003tafsd6whmneh",
                "content": "content hello",
                "description": "description",
                "image": "image",
                "title": "title",
                "userId": "cm5lddtvn0000tafsezqaixnm",
                "categoryId": "cm5lde0xx0001tafs42hoscbf",
                "createdAt": "2025-01-06T18:23:31.619Z",
                "updatedAt": "2025-01-06T18:23:31.619Z",
                "User": {
                    "name": "test"
                },
                "Category": {
                    "category": "sains"
                }
            }
        ],
        "error": false,
        "message": "success get data",
        "pagination": {
            "currentPage": 1,
            "perPage": 5,
            "totalItems": 20,
            "totalPages": 4
        },
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

### Search Article

#### Endpoint : GET /api/article/search

Request Body: Query params

- title : Search by title using like, opsional
- category : Search by category using like, opsional
- description : Search by description using like, opsional
- content : Search by content using like, opsional
- author : Search by author using like, opsional
- date : Search by date using like, opsional

Response Body:

    {
        "data": [
            {
                "id": "cm5lde97m0003tafsd6whmneh",
                "content": "content hello",
                "description": "description",
                "image": "image",
                "title": "title",
                "userId": "cm5lddtvn0000tafsezqaixnm",
                "categoryId": "cm5lde0xx0001tafs42hoscbf",
                "createdAt": "2025-01-06T18:23:31.619Z",
                "updatedAt": "2025-01-06T18:23:31.619Z",
                "User": {
                    "name": "test"
                },
                "Category": {
                    "category": "sains"
                }
            }
        ],
        "error": false,
        "message": "success get data",
        "pagination": {
            "currentPage": 1,
            "perPage": 5,
            "totalItems": 20,
            "totalPages": 4
        },
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

### Get Article by id

#### Endpoint : GET /api/article/:id

Request Body: No request body required.

Response Body:

    {
        "data": {
                "id": "cm5lde97m0003tafsd6whmneh",
                "content": "content hello",
                "description": "description",
                "image": "image",
                "title": "title",
                "userId": "cm5lddtvn0000tafsezqaixnm",
                "categoryId": "cm5lde0xx0001tafs42hoscbf",
                "createdAt": "2025-01-06T18:23:31.619Z",
                "updatedAt": "2025-01-06T18:23:31.619Z",
                "User": {
                    "name": "test"
                },
                "Category": {
                    "category": "sains"
                }
            }
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

### Create Article

#### Endpoint : POST /api/article

-Headers :

- Authorization : token

Request Body:

    {
        "author": "Article author",
        "category": "Article category",
        "content": "Article content",
        "date": "Article date",
        "description": "Article description",
        "image": "Article image",
        "title": "Article title"
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

### Update Article

#### Endpoint : PUT /api/article/:id

-Headers :

- Authorization : token

Request Body:

    {
        "author": "Article author",
        "category": "Article category",
        "content": "Article content",
        "date": "Article date",
        "description": "Article description",
        "image": "Article image",
        "title": "Article title"
    }

Response Body Success:

    {
        "error": false,
        "message": "success update data",
        "status": "success",
        "statusCode": 200,
        "success": true
    }

Response Body Failed:

    {
        "error": true,
        "message": "failed update data",
        "status": "failed",
        "statusCode": 400,
        "success": false
    }

---

### Delete Article

#### Endpoint : DELETE /api/article/:id

-Headers :

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
