from confluent_kafka import Consumer
import threading

from core.models import Lab
from ideas_api import settings

TOPIC = "chatpi"
CREATED_CHAT = "created-chat"


class EventsConsumer:
    def __init__(self):
        # self.loop = asyncio.get_event_loop()
        # self.loop.run_until_complete(self.__start_consumer())
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
        self.consumer.subscribe(['chatpi-out'])
        t = threading.Thread(target=self.consume, args=(), kwargs={})
        t.setDaemon(True)
        t.start()

    def consume(self):
        print("hi")
        while True:
            print("polling")
            msg = self.consumer.poll(20.0)

            if msg is None:
                continue
            if msg.error():
                print("Consumer error: {}".format(msg.error()))
                continue

            print('Received message: {}'.format(msg.value().decode('utf-8')))

            if msg.key == CREATED_CHAT:
                Lab.objects.filter(pk=msg.value["referenceId"]).update(chatId=msg.value["chatId"])

        self.consumer.close()
        print("consumer closed")
