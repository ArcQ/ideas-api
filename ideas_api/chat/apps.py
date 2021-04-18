from django.apps import AppConfig


class ChatConfig(AppConfig):
    name = 'chat'

    def ready(self):
        from .EventsConsumer import EventsConsumer
        events_consumer = EventsConsumer()
        events_consumer.listen()
