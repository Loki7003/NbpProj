from django.http import JsonResponse
from .models import Currency
import requests
from django.db.models import Count
from django.db.models.functions import ExtractYear, ExtractQuarter, ExtractMonth
from datetime import datetime

def update_rates(request):
    response = requests.get('http://api.nbp.pl/api/exchangerates/tables/A/')
    data = response.json()
    rates_data = []
    current_date = datetime.strptime(data[0]['effectiveDate'], '%Y-%m-%d').date()
    for item in data[0]['rates']:
        rates_data.append({
            'code' : item['code'],
            'rate' : item['mid'],
            'date' : data[0]['effectiveDate']
        })
        last_saved_currency = Currency.objects.filter(code=item['code']).order_by('-date').first()
        if not last_saved_currency or last_saved_currency.date != current_date:
            currency = Currency(code=item['code'], rate=item['mid'], date=current_date)
            currency.save()
    return JsonResponse({'status': 'success', 'data' : rates_data})


def get_currency_details(request):
    data = Currency.objects.values('code', 'rate', 'date')
    return JsonResponse(list(data), safe=False)