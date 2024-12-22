# About Us

## Overview

This API provides endpoints to get and update information about the organization, including its description, mission, vision, impact, teams, and partners.

## Description

    {
        "description":"Institute of Democracy and Education (IDE) Indonesia didirikan di Washington"
    }

---

### Get Description

#### Endpoint :

- GET /api/aboutus/description

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
            "description":"Institute of Democracy and Education (IDE) Indonesia didirikan di Washington"
        }
    }

---

### Update Description

#### Endpoint : PUT /api/aboutus/description

- Headers :
  - Authorization : token

Request Body:

    {
        "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
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
            "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
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

## Our Mision

    {
        "description":"IDE mempersiapkan pemimpin masa depan dengan membangun citra global, mempromosikan kewarganegaraan global, dan mendukung persatuan melalui pendidikan dan inovasi untuk membangun demokrasi sejati."
    }

---

### Get Mision

#### Endpoint : GET /api/aboutus/mision

Request Body: No request body required.

Response Body:

    {
        status: "success",
        statusCode: 200,
        error: false,
        success: true,
        message: "success get data",
        data: {
            id: "uuid",
            description:
            "IDE mempersiapkan pemimpin masa depan dengan membangun citra global, mempromosikan kewarganegaraan global, dan mendukung persatuan melalui pendidikan dan inovasi untuk membangun demokrasi sejati.",
        },
    };

---

### Update Mision

#### Endpoint : PUT /api/aboutus/mision

- Headers :
  - Authorization : token

Request Body:

    {
        "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success update data"
        "data": {
            "id":"uuid",
            "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true
        "success": false
        "message": "failed update data"
    }

---

## Our Vision

    {
        "description":"IDE adalah organisasi yang membangun demokrasi sejati melalui pendidikan dan inovasi untuk membangun kewarganegaraan global."
    }

---

### Get Vision

#### Endpoint : GET /api/aboutus/vision

Request Body: No request body required.

Response Body:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success get data"
         "data": {
            "id":"uuid",
            "description":"IDE adalah organisasi yang membangun demokrasi sejati melalui pendidikan dan inovasi untuk membangun kewarganegaraan global."
        }
    }

---

### Update Vision

#### Endpoint : PUT /api/aboutus/vision

- Headers :
  - Authorization : token

Request Body:

    {
        "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success update data"
        "data": {
            "id":"uuid",
            "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true
        "success": false
        "message": "failed update data"
    }

## Our Impact

---

### Get Impact

#### Endpoint : GET /api/aboutus/impact

Request Body: No request body required.

Response Body:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success get data"
         "data": {
            "id":"uuid",
            "description":"IDE adalah organisasi yang membangun demokrasi sejati melalui pendidikan dan inovasi untuk membangun kewarganegaraan global."
            "totalProvince":34
            "totalCity":100
            "totalOrganization":10
        }
    }

---

### Update Impact

#### Endpoint : PUT /api/aboutus/impact

- Headers :
  - Authorization : token

Request Body:

    {
        "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
        "totalProvince":34
        "totalCity":100
        "totalOrganization":10
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success update data"
        "data": {
            "id":"uuid",
            "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
            "totalProvince":34
            "totalCity":100
            "totalOrganization":10
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true
        "success": false
        "message": "failed update data"
    }

---

## Our Teams Description

---

### Get Teams Description

#### Endpoint : GET /api/aboutus/teams

Request Body: No request body required.

Response Body:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success get data"
         "data": {
            "id":"uuid",
            "description":"IDE adalah organisasi yang membangun demokrasi sejati melalui pendidikan dan inovasi untuk membangun kewarganegaraan global."
        }
    }

---

### Update Teams Description

#### Endpoint : PUT /api/aboutus/teams

- Headers :
  - Authorization : token

Request Body:

    {
        "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false
        "success": true
        "message": "success update data"
        "data": {
            "id":"uuid",
            "description":"Updated Institute of Democracy and Education (IDE) Indonesia didirikan di"
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

## Our Teams

    {
        "name":"kentaro ken",
        "position":"CEO",
        "image":"https://example.com/image.jpg",
        "category": "core team"
    }

---

### Get Teams

#### Endpoint : GET /api/aboutus/teams

Request Body: No request body required.

Response Body:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success get data",
        "data": [
            {
                "id":"uuid",
                "name":"kentaro ken",
                "position":"CEO",
                "image":"https://example.com/image.jpg",
                "category": "core team"
            },
            {
                "id":"uuid",
                "name":"kentaro ken",
                "position":"CEO",
                "image":"https://example.com/image.jpg",
                "category": "core team"
            }
        ]

    }

---

### Get Teams by ID

#### Endpoint : GET /api/aboutus/teams/:id

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
            "name":"kentaro ken",
            "position":"CEO",
            "image":"https://example.com/image.jpg",
            "category": "core team"
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

---

### Create Teams

#### Endpoint : POST /api/aboutus/teams

- Headers :
  - Authorization : token

Request Body:

    {
        "name":"kentaro ken",
        "position":"CEO",
        "image":"https://example.com/image.jpg",
        "category": "core team"
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success create data",
        "data": {
            "id":"uuid",
            "name":"kentaro ken",
            "position":"CEO",
            "image":"https://example.com/image.jpg",
            "category": "core team"
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed create data",
    }

---

### Update Teams

#### Endpoint : PUT /api/aboutus/teams/:id

- Headers :
  - Authorization : token

Request Body:

    {
        "name":"kentaro ken",
        "position":"CEO",
        "image":"https://example.com/image.jpg",
        "category": "core team"
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
            "name":"kentaro ken",
            "position":"CEO",
            "image":"https://example.com/image.jpg",
            "category": "core team"
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

### Delete Teams

#### Endpoint : DELETE /api/aboutus/teams/:id

- Headers :
  - Authorization : token

Request Body: No request body required.

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success delete data",
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed delete data",
    }

---

## Our partners

---

### Get Partners

    {
        "name":"pt abc",
        "image":"https://example.com/image.jpg",
        "link":"https://example.com"
    }

#### Endpoint : GET /api/aboutus/partners

Request Body: No request body required.

Response Body:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success get data",
        "data": [
            {
                "id":"uuid",
                "name":"pt abc",
                "image":"https://example.com/image.jpg",
                "link":"https://example.com"
            },
            {
                "id":"uuid",
                "name":"pt abc",
                "image":"https://example.com/image.jpg",
                "link":"https://example.com"
            }
        ]
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed get data",
    }

---

### Get Partners by ID

#### Endpoint : GET /api/aboutus/partners/:id

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
            "name":"pt abc",
            "image":"https://example.com/image.jpg",
            "link":"https://example.com"
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

---

### Create Partners

#### Endpoint : POST /api/aboutus/partners

- Headers :
  - Authorization : token

Request Body:

    {
        "name":"pt abc",
        "image":"https://example.com/image.jpg",
        "link":"https://example.com"
    }

Response Body Success:

    {
        "status": "success",
        "statusCode": 201,
        "error": false,
        "success": true,
        "message": "success create data",
        "data": {
            "id":"uuid",
            "name":"pt abc",
            "image":"https://example.com/image.jpg",
            "link":"https://example.com"
        }
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed create data",
    }

---

### Update Partners

#### Endpoint : PUT /api/aboutus/partners/:id

- Headers :
  - Authorization : token

Request Body:

    {
        "name":"pt abc",
        "image":"https://example.com/image.jpg",
        "link":"https://example.com"
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
            "name":"pt abc",
            "image":"https://example.com/image.jpg",
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

### Delete Partners

#### Endpoint : DELETE /api/aboutus/partners/:id

- Headers :
  - Authorization : token

Request Body: No request body required.

Response Body Success:

    {
        "status": "success",
        "statusCode": 200,
        "error": false,
        "success": true,
        "message": "success delete data",
    }

Response Body Failed:

    {
        "status": "failed",
        "statusCode": 400,
        "error": true,
        "success": false,
        "message": "failed delete data",
    }

---
