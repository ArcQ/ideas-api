import asyncio
import json

from confluent_kafka.cimpl import Producer

from ideas_api import settings

UPSERT_CHAT_ENTITY = "upsert-chat-entity"
DELETE_CHAT_ENTITY = "delete-chat-entity"
ADD_CHAT_MEMBER = "add-chat-member"
REMOVE_MEMBERS_FROM_CHAT_ENTITY = "remove-chat-member"


def create_event(**kwargs):
    return {"data": {
        "apiKey": settings.CHATPI_API_KEY,
        "apiSecret": settings.CHATPI_API_SECRET,
        **kwargs
    }}


class EventsProducer:
    def __init__(self):
        self.loop = asyncio.get_event_loop()
        self.loop.run_until_complete(self.__start_producer())

    def send_upsert_chat_entity(self, members, lab_id, chat_id, name):
        event = create_event(entity={"containerReferenceId": lab_id, "chatId": chat_id, "name": name, "members": members})
        self.__send_event(UPSERT_CHAT_ENTITY, event)

    def send_delete_chat_entity(self, chat_id):
        event = create_event(entity={"chatId": chat_id})
        self.__send_event(DELETE_CHAT_ENTITY, event)

    def send_add_chat_member(self, user_auth_key, chat_id):
        event = create_event(chat_id=chat_id, entity={"userAuthKey": user_auth_key, "chatId": chat_id})
        self.__send_event(ADD_CHAT_MEMBER, event)

    def send_remove_chat_member(self, user_auth_key, chat_id):
        event = create_event(entity={"userAuthKey": user_auth_key, "chatId": chat_id})
        self.__send_event(REMOVE_MEMBERS_FROM_CHAT_ENTITY, event)

    async def __start_producer(self):
        self.producer = Producer(({
            "bootstrap.servers": settings.BOOTSTRAP_SERVERS,
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "PLAIN",
            "sasl.username": settings.SASL_PLAIN_USERNAME,
            "sasl.password": settings.SASL_PLAIN_PASSWORD
        }))

    def __send_event(self, key, event: dict):
        self.loop.run_until_complete(self.__send_one(key, event))

    def __delivery_report(self, err, msg):
        """ Called once for each message produced to indicate delivery result.
            Triggered by poll() or flush(). """
        if err is not None:
            print('Message delivery failed: {}'.format(err))
        else:
            print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

    async def __send_one(self, key, event: dict):
        self.producer.produce(topic=settings.TOPIC_CHAT, value=json.dumps(event), key=key,
                              callback=self.__delivery_report)
        self.producer.poll(10000)
