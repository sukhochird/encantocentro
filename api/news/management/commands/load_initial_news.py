from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from news.models import NewsArticle


class Command(BaseCommand):
    help = 'Load initial news articles'

    def handle(self, *args, **options):
        # Clear existing news
        NewsArticle.objects.all().delete()
        
        news_data = [
            {
                'title': 'ЭНКАНТО СЕНТРО барилгын ажил эхэллээ',
                'excerpt': 'Улаанбаатар хотын төв хэсэгт байрлах Энканто Сентро төслийн барилгын ажил албан ёсоор эхэллээ. Уг төслийн хүрээнд орчин үеийн технологи ашиглан өндөр чанартай орон сууц болон арилжааны цогцолбор барих юм.',
                'content': '<p>Улаанбаатар хотын төв хэсэгт байрлах Энканто Сентро төслийн барилгын ажил албан ёсоор эхэллээ. Энэхүү төсөл нь орчин үеийн технологи ашиглан өндөр чанартай орон сууц болон арилжааны цогцолбор барих томоохон төсөл юм.</p><p>Энканто Сентро нь 24 давхар өндөртэй, 126.5м²-аас 243м² хүртэл талбайтай 3-5 өрөөтэй орон сууцны янз бүрийн төрлийг санал болгох юм. Барилгын ажил 2024 оны 12 дугаар сарын 15-нд эхэлсэн бөгөөд 2026 оны эцэст дуусах төлөвлөгөөтэй байна.</p>',
                'date': timezone.now().date() - timedelta(days=1),
                'read_time': '3 мин',
                'views': 1247,
                'image': 'https://images.unsplash.com/photo-1748771886624-0f0aa2729a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzU2ODkwOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': True,
                'tags': 'Барилга, Энканто Сентро, Шинэ төсөл, Орон сууц'
            },
            {
                'title': 'Орон сууцны урьдчилсан захиалга эхэллээ',
                'excerpt': 'Таны мөрөөдлийн байрыг урьдчилан захиалж, тусгай хөнгөлөлт эдлээрэй. Эрт захиалагчдад 15% хүртэл хөнгөлөлт болон тусгай урамшуулал олгох юм.',
                'content': '<p>Энканто Сентро орон сууцны урьдчилсан захиалга албан ёсоор эхэллээ. Эрт захиалагчдад 15% хүртэл хөнгөлөлт болон тусгай урамшуулал олгох юм.</p>',
                'date': timezone.now().date() - timedelta(days=2),
                'read_time': '5 мин',
                'views': 892,
                'image': 'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTY5NDA3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': False,
                'tags': 'Борлуулалт, Урьдчилсан захиалга, Хөнгөлөлт'
            },
            {
                'title': 'YUANDA брэндийн шилэн фасад сонгогдлоо',
                'excerpt': 'Дэлхийн тэргүүлэгч YUANDA брэндийн шилэн фасадыг сонгож, чанартай барилга бүтээх боллоо. Энэхүү фасад нь дулаан хамгаалалт, гэрэл зэрэг олон давуу талтай юм.',
                'content': '<p>Дэлхийн тэргүүлэгч YUANDA брэндийн шилэн фасадыг сонгож, чанартай барилга бүтээх боллоо.</p>',
                'date': timezone.now().date() - timedelta(days=3),
                'read_time': '4 мин',
                'views': 654,
                'image': 'https://images.unsplash.com/photo-1677253200111-97d0d490d60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1Njk0ODAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': False,
                'tags': 'Фасад, YUANDA, Технологи'
            },
            {
                'title': 'Худалдааны төвийн төлөвлөгөө танилцуулагдлаа',
                'excerpt': '24,000 м² талбай бүхий орчин үеийн худалдааны төвийн дэлгэрэнгүй төлөвлөгөө танилцуулагдлаа. Хүнсний дэлгүүр, кафе, үйлчилгээний газрууд багтана.',
                'content': '<p>24,000 м² талбай бүхий орчин үеийн худалдааны төвийн дэлгэрэнгүй төлөвлөгөө танилцуулагдлаа.</p>',
                'date': timezone.now().date() - timedelta(days=7),
                'read_time': '6 мин',
                'views': 2103,
                'image': 'https://images.unsplash.com/photo-1725121688291-ed19354b618b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaG9wcGluZyUyMG1hbGwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTY5NDgwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': False,
                'tags': 'Худалдааны төв, Төлөвлөгөө'
            },
            {
                'title': 'Ногоон байгууламжийн шинэ стандарт',
                'excerpt': 'Энканто Сентро нь байгаль орчинд ээлтэй барилгын шинэ стандартыг баримталж, эко ухаарлаг технологи ашиглана. Эрчим хүчний хэмнэлттэй системүүд суурилуулна.',
                'content': '<p>Энканто Сентро нь байгаль орчинд ээлтэй барилгын шинэ стандартыг баримталж, эко ухаарлаг технологи ашиглана.</p>',
                'date': timezone.now().date() - timedelta(days=10),
                'read_time': '4 мин',
                'views': 445,
                'image': 'https://images.unsplash.com/photo-1632263532338-45575eba6aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGJ1aWxkaW5nJTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzU2OTQ4MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': False,
                'tags': 'Ногоон барилга, Экологи, Эрчим хүч'
            },
            {
                'title': 'Спорт, амралтын орчин',
                'excerpt': 'Оршин суугчдын амралт, спортын хэрэгцээг хангах зорилгоор орчин үеийн спорт залуу, усан сан, фитнесс төв барих болно. Бүх насны хүмүүст тохирсон.',
                'content': '<p>Оршин суугчдын амралт, спортын хэрэгцээг хангах зорилгоор орчин үеийн спорт залуу, усан сан, фитнесс төв барих болно.</p>',
                'date': timezone.now().date() - timedelta(days=14),
                'read_time': '5 мин',
                'views': 768,
                'image': 'https://images.unsplash.com/photo-1721394747060-7cfc57104f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBmaXRuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc1Njg0NTI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': False,
                'tags': 'Спорт, Амралт, Фитнесс'
            },
            {
                'title': 'Дижитал смарт системүүд суурилуулагдана',
                'excerpt': 'Орчин үеийн IoT технологи ашиглан гэрийн автоматжуулалт, аюулгүй байдлын систем, эрчим хүчний менежментийн ухаарлаг шийдлүүдийг нэвтрүүлэх юм.',
                'content': '<p>Орчин үеийн IoT технологи ашиглан гэрийн автоматжуулалт, аюулгүй байдлын систем, эрчим хүчний менежментийн ухаарлаг шийдлүүдийг нэвтрүүлэх юм.</p>',
                'date': timezone.now().date(),
                'read_time': '7 мин',
                'views': 2340,
                'image': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1Njk0ODI0OXww&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': True,
                'tags': 'Технологи, IoT, Смарт байшин'
            },
            {
                'title': 'VIP танхимын тансаг зочид буудлын үйлчилгээ',
                'excerpt': 'Байрны эздэд болон зочдод зориулсан тансаг VIP танхим, консьерж үйлчилгээ, хувийн аюулгүй байдлын алба зэрэг дээд зэргийн үйлчилгээ үзүүлэх юм.',
                'content': '<p>Байрны эздэд болон зочдод зориулсан тансаг VIP танхим, консьерж үйлчилгээ, хувийн аюулгүй байдлын алба зэрэг дээд зэргийн үйлчилгээ үзүүлэх юм.</p>',
                'date': timezone.now().date() - timedelta(days=5),
                'read_time': '4 мин',
                'views': 1156,
                'image': 'https://images.unsplash.com/photo-1540318000000-c57b29b94ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc1Njk0ODI0OXww&ixlib=rb-4.1.0&q=80&w=1080',
                'featured': False,
                'tags': 'VIP, Үйлчилгээ, Консьерж'
            },
        ]
        
        for news_item in news_data:
            NewsArticle.objects.create(**news_item)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {len(news_data)} news articles')
        )

