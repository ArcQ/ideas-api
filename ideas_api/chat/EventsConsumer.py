from confluent_kafka import Consumer
import threading
import json

from core.models import Lab
from ideas_api import settings

CREATED_CHAT = "created-chat"


class EventsConsumer:
    def __init__(self):
        self.__start_consumer()

    def __start_consumer(self):
        self.consumer = Consumer({
            "bootstrap.servers": settings.BOOTSTRAP_SERVERS,
            "group.id": "ideas-app",
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "PLAIN",
            "sasl.username": settings.SASL_PLAIN_USERNAME,
            "sasl.password": settings.SASL_PLAIN_PASSWORD
        })

    def listen(self):
        self.consumer.subscribe([settings.TOPIC_CHAT_OUT])
        t = threading.Thread(target=self.consume, args=(), kwargs={})
        t.setDaemon(True)
        t.start()

    def consume(self):
        while True:
            print("polling")
            msg = self.consumer.poll(20.0)

            if msg is None:
                continue
            if msg.error():
                print("Consumer error: {}".format(msg.error()))
                continue
            value_str = msg.value().decode('utf-8')
            print('Received message: {}'.format(value_str))

            if msg.key().decode('utf-8') == CREATED_CHAT:
                entity = json.loads(value_str)["data"]["entity"]
                Lab.objects.filter(pk=entity["containerReferenceId"]).update(chat_id=entity["chatId"])

        self.consumer.close()
        print("consumer closed")
