import { test, expect } from '@playwright/test';

test.describe('Booking API', () => {
    test('Deve listar as reservas existentes', async ({ request }) => {
        const response = await request.get('https://restful-booker.herokuapp.com/booking');

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(Array.isArray(data)).toBeTruthy();

        expect(data[0]).toHaveProperty('bookingid');
    });

    test ('Consultando reserva 40', async ({ request }) => {
        const response = await request.get('https://restful-booker.herokuapp.com/booking/40');

        const jsonBody = await response.json();

        expect(jsonBody.firstname).toBe('Josh');
        expect(jsonBody.lastname).toBe('Allen');
        expect(jsonBody.totalprice).toBe(111);
        expect(jsonBody.depositpaid).toBeTruthy();
        expect(jsonBody.bookingdates.checkin).toBe('2018-01-01');
        expect(jsonBody.bookingdates.checkout).toBe('2019-01-01');
        expect(jsonBody.additionalneeds).toBe('midnight snack');

        expect(response.ok).toBeTruthy();
        expect(response.status()).toBe(200);
    })
});