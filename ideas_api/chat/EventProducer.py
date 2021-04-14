from aiokafka import AIOKafkaProducer
import asyncio

from ideas_api import settings

loop = asyncio.get_event_loop()

TOPIC = "chatpi"
UPSERT_CHAT_ENTITY = "upsert-chat-entity"
ADD_CHAT_MEMBER = "add-chat-member"
REMOVE_MEMBERS_FROM_CHAT_ENTITY = "remove-chat-member"


def create_event(self, **kwargs):
    return {
        "apiKey": settings.CHATPI_API_KEY,
        "apiSecret": settings.CHATPI_API_SECRET,
        **kwargs
    }


class EventsProducer:
    def __init__(self):
        self.producer = AIOKafkaProducer(
            loop=loop, bootstrap_servers='localhost:9092')

    def publish_upsert_chat_entity(self, chat_id, user_auth_key):
        event = create_event(self, chat_id=chat_id, user_auth_key=user_auth_key)
        self.publish_event(UPSERT_CHAT_ENTITY, event)

    def publish_add_chat_member(self, user_auth_key, chat_id):
        event = create_event(self, chat_id=chat_id, entity={"user_auth_key": user_auth_key, "chat_id": chat_id})
        self.publish_event(ADD_CHAT_MEMBER, event)

    def publish_remove_chat_member(self, user_auth_key, chat_id):
        event = create_event(self, entity={"user_auth_key": user_auth_key, "chat_id": chat_id})
        self.publish_event(REMOVE_MEMBERS_FROM_CHAT_ENTITY, event)

    def publish_event(self, key, event: dict):
        loop.run_until_complete(self.send_one(key, event))

    async def send_one(self, key, event: dict):
        await self.producer.start()
        try:
            await self.producer.send_and_wait(topic=TOPIC, value=event, key=key)
        finally:
            await self.producer.stop()
