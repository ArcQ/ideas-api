import base64
from uuid import UUID


def parse_relay_id(id: str):
    id_bytes = base64.b64decode(id)
    id_str = id_bytes.decode("ascii").split(":")[1]
    return UUID(id_str)

