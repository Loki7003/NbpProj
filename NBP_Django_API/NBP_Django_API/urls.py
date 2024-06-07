"""
URL configuration for NBP_Django_API project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path('update-rates/', views.update_rates, name='update_rates'),
    path('get-historical-rates/', views.get_historical_rates, name='get_historical_rates'),
    path('get-currency-details/<str:currency_code>/<str:start_date>/<str:end_date>/', views.get_currency_details, name='get_currency_details'),
    path('get-currency-codes/', views.get_currency_codes, name='get_currency_codes'),
]
