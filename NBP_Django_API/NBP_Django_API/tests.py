from django.test import TestCase, Client
from unittest.mock import patch
from .models import Currency
from decimal import Decimal
import datetime

class CurrencyModelTest(TestCase):
    def test_create_currency(self):
        currency = Currency.objects.create(code='USD', rate=3.72, date=datetime.date.today())

        self.assertEqual(currency.code, 'USD')
        self.assertEqual(currency.rate, 3.72)
        self.assertEqual(currency.date, datetime.date.today())

class UpdateRatesViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    @patch('requests.get')
    def test_update_rates(self, mock_get):
        mock_get.return_value.json.return_value = [
            {
                'rates': [
                    {'code': 'USD', 'mid': 3.72},
                    {'code': 'EUR', 'mid': 4.53}
                ]
            }
        ]

        response = self.client.get('/update-rates/')

        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(response_data['status'], 'success')
        self.assertEqual(len(response_data['data']), 2)
        self.assertCountEqual(response_data['data'], [
            {'code': 'USD', 'rate': 3.72},
            {'code': 'EUR', 'rate': 4.53}
        ])

        usd = Currency.objects.get(code='USD')
        self.assertEqual(usd.rate, Decimal('3.72'))
        eur = Currency.objects.get(code='EUR')
        self.assertEqual(eur.rate, Decimal('4.53'))
        
class GetCurrencyDetailsViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        Currency.objects.create(code='USD', rate=3.72, date=datetime.date(2022, 1, 1))
        Currency.objects.create(code='EUR', rate=4.54, date=datetime.date(2022, 1, 2))
        Currency.objects.create(code='GBP', rate=5.11, date=datetime.date(2022, 1, 3))

    def test_get_currency_details(self):
        response = self.client.get('/get-currency-details/')

        self.assertEqual(response.status_code, 200)

        actual_data = response.json()
        expected_data = [
        {'code': 'USD', 'rate': '3.72', 'date': '2022-01-01'},
        {'code': 'EUR', 'rate': '4.54', 'date': '2022-01-02'},
        {'code': 'GBP', 'rate': '5.11', 'date': '2022-01-03'},
    ]

        self.assertCountEqual(actual_data, expected_data)