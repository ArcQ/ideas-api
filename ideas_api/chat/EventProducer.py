import asyncio

from confluent_kafka.cimpl import Producer

from ideas_api import settings

TOPIC = "chatpi"
UPSERT_CHAT_ENTITY = "upsert-chat-entity"
DELETE_CHAT_ENTITY = "delete-chat-entity"
ADD_CHAT_MEMBER = "add-chat-member"
REMOVE_MEMBERS_FROM_CHAT_ENTITY = "remove-chat-member"


def create_event(**kwargs):
    return {
        "apiKey": settings.CHATPI_API_KEY,
        "apiSecret": settings.CHATPI_API_SECRET,
        **kwargs
    }


class EventsProducer:
    def __init__(self):
        self.loop = asyncio.get_event_loop()
        self.loop.run_until_complete(self.__start_producer())

    def send_upsert_chat_entity(self, members, chat_id):
        event = create_event(self, chat_id=chat_id, members=members)
        self.__send_event(UPSERT_CHAT_ENTITY, event)

    def send_delete_chat_entity(self, chat_id):
        event = create_event(self, entity={"chat_id": chat_id})
        self.__send_event(DELETE_CHAT_ENTITY, event)

    def send_add_chat_member(self, user_auth_key, chat_id):
        event = create_event(self, chat_id=chat_id, entity={"user_auth_key": user_auth_key, "chat_id": chat_id})
        self.__send_event(ADD_CHAT_MEMBER, event)

    def send_remove_chat_member(self, user_auth_key, chat_id):
        event = create_event(self, entity={"user_auth_key": user_auth_key, "chat_id": chat_id})
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

    def __delivery_report(err, msg):
        """ Called once for each message produced to indicate delivery result.
            Triggered by poll() or flush(). """
        if err is not None:
            print('Message delivery failed: {}'.format(err))
        else:
            print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

    async def __send_one(self, key, event: dict):
        self.producer.poll(0)
        self.producer.produce(topic=TOPIC, value=event, key=key, callback=self.__delivery_report)
