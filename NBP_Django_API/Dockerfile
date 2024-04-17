FROM python:3.12
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install requests
RUN pip install django-cors-headers
COPY . .
ENV DJANGO_SETTINGS_MODULE=NBP_Django_API.settings
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]