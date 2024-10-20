import { test, expect } from "@playwright/test"

test.describe.parallel('api testing', () => {
    const baseUrl = "https://reqres.in/api"

    test('simple api test - assert response status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`);
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
    });

    test('simple api test - assert invalid endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/nonexistingendpoint`);
        expect(response.status()).toBe(404);
    });

    test("get request - get user detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toContain('George');
        expect(responseBody.data.last_name).toContain('Bluth');
        expect(responseBody.data.email).toBeTruthy();
    });

    test('post reqests - create new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 1000,
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(responseBody.id).toBe(1000);
        expect(responseBody.createdAt).toBeTruthy();
    });


    test('post reqest - login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            },
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    });


    test('post reqets - login failed', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "peter@klaven"
            },
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe("Missing password");
    });

    test('put request - update user', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                "name": "new name",
                "job": "new job"
            },
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe("new name");
        expect(responseBody.job).toBe("new job");
        expect(responseBody.updatedAt).toBeTruthy();
    });

    test('delete request - update user', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`);
        expect(response.status()).toBe(204);
    });
})