# Encanto Centro Django API

Энканто Сентро төслийн Django REST API сервер.

## Суулгах

1. Python virtual environment үүсгэх:
```bash
python -m venv venv
source venv/bin/activate  # Windows дээр: venv\Scripts\activate
```

2. Dependencies суулгах:
```bash
pip install -r requirements.txt
```

3. Database migrations ажиллуулах:
```bash
python manage.py migrate
```

4. Анхны мэдээнүүдийг бүртгэх (optional):
```bash
python manage.py load_initial_news
```

## Ажиллуулах

```bash
python manage.py runserver
```

API нь `http://localhost:8000` дээр ажиллана.

## API Endpoints

### Мэдээний жагсаалт
```
GET /api/news/articles/?page=1&limit=10
```

### Мэдээний дэлгэрэнгүй
```
GET /api/news/articles/{id}/
```

### Онцлох мэдээнүүд
```
GET /api/news/articles/featured/
```

## Admin Panel

Django admin panel дээр мэдээ нэмэх, засах:
```
http://localhost:8000/admin/
```

Superuser үүсгэх:
```bash
python manage.py createsuperuser
```

### WYSIWYG Editor

Admin panel дээр мэдээний content бичихэд CKEditor (WYSIWYG editor) ашиглана. 
Энэ нь танд HTML форматтай текст бичих, зураг оруулах, хүснэгт үүсгэх зэрэг боломжуудыг олгоно.

**Анхаар:** CKEditor 4 нь security warning өгч байгаа бөгөөд production дээр ашиглахдаа 
CKEditor 5 эсвэл өөр editor ашиглахыг зөвлөж байна.

## CORS Тохиргоо

Frontend (Next.js) нь `http://localhost:3000` дээр ажиллах үед CORS автоматаар зөвшөөрөгдөнө. 
Өөр порт ашиглах бол `encanto_admin/settings.py` дээр `CORS_ALLOWED_ORIGINS` засах хэрэгтэй.

