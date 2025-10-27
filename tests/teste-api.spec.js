import { test, expect } from '@playwright/test';

test.describe('Booking API', () => {
    test('Deve listar as reservas existentes', async ({ request }) => {
        const response = await request.get('https://restful-booker.herokuapp.com/booking');

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(Array.isArray(data)).toBeTruthy();

        expect(data[0]).toHaveProperty('bookingid');
    });

    test('Consultando reserva 40', async ({ request }) => {
        const response = await request.get('https://restful-booker.herokuapp.com/booking/40');

        const jsonBody = await response.json();

        expect(jsonBody.firstname).toBe('Josh');
        expect(jsonBody.lastname).toBe('Smith');
        expect(jsonBody.totalprice).toBe(111);
        expect(jsonBody.depositpaid).toBeTruthy();
        expect(jsonBody.bookingdates.checkin).toBe('2018-01-01');
        expect(jsonBody.bookingdates.checkout).toBe('2019-01-01');
        expect(jsonBody.additionalneeds).toBe('Breakfast');

        expect(response.ok).toBeTruthy();
        expect(response.status()).toBe(200);
    })

    test('Criando nova reserva', async ({ request }) => {
        const createRes = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                "firstname": "Thais",
                "lastname": "Rodrigues",
                "totalprice": 222,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "breakfast"
            }
        });

        expect(createRes.ok()).toBeTruthy();
        expect(createRes.status()).toBe(200);


        const responseBody = await response.json()
        expect(responseBody.booking).toHaveProperty("firstname", "Thais");
        expect(responseBody.booking).toHaveProperty("lastname", "Rodrigues");
        expect(responseBody.booking).toHaveProperty("totalprice", 222);
        expect(responseBody.booking).toHaveProperty("depositpaid", true);
        expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
        expect(responseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
        expect(responseBody.booking).toHaveProperty("additionalneeds", "breakfast")

        const createBody = await createRes.json();
        expect(createBody).toHaveProperty("bookingid");

        const bookingid = createBody.bookingid;

        const getRes = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`);
        const getBody = await getRes.json();
        console.log('GET: ', getBody);

        expect(getRes.status()).toBe(200);
        expect(getBody.firstname).toBe("Thais")
        expect(getBody.lastname).toBe("Rodrigues");
        expect(getBody.totalprice).toBe(222);
        expect(getBody.depositpaid).toBe(true);
        expect(getBody.bookingdates.checkin).toBe("2018-01-01");
        expect(getBody.bookingdates.checkout).toBe("2019-01-01");
        expect(getBody.additionalneeds).toBe("breakfast");
    })
});