# Contact Us

## Overview

This API provides endpoints to get, create, update, and delete contact us.

---

## Description Contact Us

    {
        "description":"Contact us description",
        "title":"Contact Us",
        "Phone":"Contact us phone",
        "Email":"Contact us email",
        "Address":"Contact us address",
        "Facebook":"Contact us facebook",
        "Instagram":"Contact us instagram",
        "Twitter":"Contact us twitter",
        "Linkedin":"Contact us linkedin",
        "Youtube":"Contact us youtube",
    }

---

### Get Contact Us description

#### Endpoint : GET /api/contactus/description

Request Body: No request body required.

Response Body:

    {
        "data": {
            "description":"Contact us description",
            "title":"Contact Us",
            "Phone":"Contact us phone",
            "Email":"Contact us email",
            "Address":"Contact us address",
            "Facebook":"Contact us facebook",
            "Instagram":"Contact us instagram",
            "Twitter":"Contact us twitter",
            "Linkedin":"Contact us linkedin",
            "Youtube":"Contact us youtube",
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

### Update Contact Us description

#### Endpoint : PUT /api/contactus/description

-Headers :

- Authorization : token

Request Body:

    {
        "description":"Contact us description",
        "title":"Contact Us",
        "Phone":"Contact us phone",
        "Email":"Contact us email",
        "Address":"Contact us address",
        "Facebook":"Contact us facebook",
        "Instagram":"Contact us instagram",
        "Twitter":"Contact us twitter",
        "Linkedin":"Contact us linkedin",
        "Youtube":"Contact us youtube",
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

## Contact Us Form

#### Endpoint : POST /api/contactus/form

Request Body:

    {
        "firstName":"john",
        "lastName":"doe",
        "email":"G0k0Y@example.com",
        "message":"message",
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

### Get Contact Us Form

#### Endpoint : GET /api/contactus/form

- Headers :
  - Authorization : token

Request Body: No request body required.

Response Body:

    {
        "data": [
            {
                "firstName":"john",
                "lastName":"doe",
                "email":"G0k0Y@example.com",
                "message":"message",
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

### Delete Contact Us Form

#### Endpoint : DELETE /api/contactus/form/:id

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
