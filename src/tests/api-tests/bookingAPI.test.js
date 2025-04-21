import axios from 'axios';
import { expect } from 'chai';

const BASE_URL = 'https://restful-booker.herokuapp.com';
let token;
let bookingId;

describe('Restful-Booker API Tests', () => {
  it('should create an auth token', async () => {
    const response = await axios.post(`${BASE_URL}/auth`, {
      username: 'admin',
      password: 'password123',
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('token');
    token = response.data.token;
  });

  it('should create a booking', async () => {
    const bookingData = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    };
    const response = await axios.post(`${BASE_URL}/booking`, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.data.booking).to.deep.include(bookingData);
    bookingId = response.data.bookingid;
  });

  it('should retrieve the created booking', async () => {
    const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.data.firstname).to.equal('Jim');
  });

  it('should update the booking', async () => {
    const updatedData = {
      firstname: 'Jane',
      lastname: 'Doe',
      totalprice: 250,
      depositpaid: false,
      bookingdates: {
        checkin: '2023-01-01',
        checkout: '2023-01-10',
      },
      additionalneeds: 'Lunch',
    };
    const response = await axios.put(
      `${BASE_URL}/booking/${bookingId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie: `token=${token}`,
        },
      }
    );
    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.data).to.deep.include(updatedData);
  });

  it('should delete the booking', async () => {
    const response = await axios.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    });

    expect(response.status).to.equal(201);
    expect(response.headers['content-type']).to.include('text/plain');
  });
});
