from django.db import models
import datetime

class Currency(models.Model):
    code = models.CharField(max_length=3)
    rate = models.DecimalField(max_digits=10, decimal_places=6, null=True)
    date = models.DateField(default=datetime.date.today)
    class Meta:
        app_label = 'NBP_Django_API'