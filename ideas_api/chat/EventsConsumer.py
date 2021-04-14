from aiokafka import AIOKafkaConsumer
import asyncio

from core.models import Lab
from ideas_api import settings

loop = asyncio.get_event_loop()

TOPIC = "chatpi"
UPSERT_CHAT_ENTITY = "upsert-chat-entity"
UPSERT_USER = "upsert-user"
MODIFY_CHAT_MEMBER = "modify-chat-member"


def handle_message_CREATE_CHAT_COMPLETE(value):
    Lab.objects.filter(pk=value.referenceId).update(chatId=value.chatId)


class EventsConsumer:
    def __init__(self):
        self.consumer = AIOKafkaConsumer(
            'chatpi-out',
            loop=loop,
            bootstrap_servers=settings.BOOTSTRAP_SERVERS,
            sasl_plain_username=settings.SASL_PLAIN_USERNAME,
            sasl_plain_password=settings.SASL_PLAIN_PASSWORD)

    def listen(self):
        loop.run_until_complete(self.consume())

    async def consume(self):
        await self.consumer.start()
        print("start consuming")
        try:
            async for msg in self.consumer:
                print("consumed: ", msg.topic, msg.partition, msg.offset,
                      msg.key, msg.value, msg.timestamp)
                method_str = "handle_message_" + msg.key
                if method_str in self:
                    self[method_str]
        finally:
            print("stop consuming")
            await self.consumer.stop()

EventsConsumer().listen()