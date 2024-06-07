from django.test import TestCase, Client
from .models import Currency
from datetime import datetime
import json

class CurrencyTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        Currency.objects.create(code='USD', rate=1.0, date=datetime.strptime('2022-01-01', '%Y-%m-%d').date())
        Currency.objects.create(code='EUR', rate=0.9, date=datetime.strptime('2022-01-02', '%Y-%m-%d').date())

    def test_get_historical_rates(self):
        response = self.client.get('/get-historical-rates/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['status'], 'success')

    def test_update_rates(self):
        response = self.client.get('/update-rates/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['status'], 'success')

    def test_get_currency_details(self):
        response = self.client.get('/get-currency-details/USD/2022-01-01/2022-12-31/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['status'], 'success')
        self.assertTrue(len(data['data']) > 0)

    def test_get_currency_codes(self):
        response = self.client.get('/get-currency-codes/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['status'], 'success')
        self.assertEqual(len(data['data']), 2)
        self.assertEqual(data['data'][0]['code'], 'USD')
        self.assertEqual(data['data'][1]['code'], 'EUR')