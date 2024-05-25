from django.http import JsonResponse
from .models import Currency
import requests
from datetime import datetime

def update_rates(request):
    end_date = datetime.today().date()
    start_date = end_date - timedelta(days=93)

    url = f"http://api.nbp.pl/api/exchangerates/tables/A/{start_date}/{end_date}/"
    response = requests.get(url)
    data = response.json()

    rates_data = []
    for item in data[0]['rates']:
        rates_data.append({
            'code': item['code'],
            'rate': item['mid'],
            'date': data[0]['effectiveDate']
        })

        last_saved_currency = Currency.objects.filter(code=item['code'], date=current_date).first()
        if not last_saved_currency:
            currency = Currency(code=item['code'], rate=item['mid'], date=current_date)
            currency.save()

    return JsonResponse({'status': 'success', 'data': rates_data})