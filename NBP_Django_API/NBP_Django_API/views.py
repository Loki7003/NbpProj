from django.http import JsonResponse
from .models import Currency
from django.db.models import Min, Max
from datetime import datetime, timedelta
import requests
import json

def get_historical_rates(request):
    end_date = datetime.today().date()
    start_date = datetime.strptime(f'2002-01-02', '%Y-%m-%d').date()
    
    while start_date <= end_date:
        if start_date.weekday() < 5:
            url = f"http://api.nbp.pl/api/exchangerates/tables/A/{start_date}/"
            response = requests.get(url)
            if response.status_code == 200:    
                data = json.loads(response.text)

                for item in data[0]['rates']:
                    currency, created = Currency.objects.get_or_create(
                        code=item['code'], 
                        date=data[0]['effectiveDate'],
                        defaults={'rate': item['mid']}
                    )
                    if not created:
                        currency.rate = item['mid']
                        currency.save()
        start_date += timedelta(days=1)

    return JsonResponse({'status': 'success'})

def update_rates(request):
    today = datetime.today().date()
    isWorkday = False
    while isWorkday == False:
        url = f"http://api.nbp.pl/api/exchangerates/tables/A/{today}/"
        response = requests.get(url)
        if response.status_code == 200: 
            data = json.loads(response.text)

            rates_data = []
            for item in data[0]['rates']:
                rates_data.append({
                    'code': item['code'],
                    'rate': item['mid'],
                    'date': data[0]['effectiveDate']
                })
                last_saved_currency = Currency.objects.filter(code=item['code'], date=data[0]['effectiveDate']).first()
                if not last_saved_currency:
                    currency = Currency(code=item['code'], rate=item['mid'], date=data[0]['effectiveDate'])
                    currency.save()
            isWorkday = True
        else:
            today -= timedelta(days=1)
    return JsonResponse({'status': 'success', 'data': rates_data})

def get_currency_details(request, currency_code, start_date, end_date):
    start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
    end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
    
    currency_data = Currency.objects.filter(code=currency_code, date__range=[start_date, end_date])

    data = []
    for currency in currency_data:
        data.append({
            'code': currency.code,
            'rate': currency.rate,
            'date': currency.date
        })

    return JsonResponse({'status': 'success', 'data': data})

def get_currency_codes(request):
    currencies = Currency.objects.values('code').distinct()
    data = list(currencies)
    return JsonResponse({'status': 'success', 'data': data})