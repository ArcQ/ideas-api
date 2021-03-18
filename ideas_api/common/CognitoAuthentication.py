import logging

import cognitojwt
from django.apps import apps as django_apps
from django.conf import settings
from django.utils.encoding import smart_text
from django.utils.translation import ugettext as _
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication, get_authorization_header

from core.models import User
from ideas_api.settings import COGNITO_AWS_REGION, COGNITO_USER_POOL

logger = logging.getLogger(__name__)


def get_jwt_token(request):
    auth = get_authorization_header(request).split()
    if not auth or smart_text(auth[0].lower()) != "bearer":
        return None

    if len(auth) == 1:
        msg = _("Invalid Authorization header. No credentials provided.")
        raise exceptions.AuthenticationFailed(msg)
    elif len(auth) > 2:
        msg = _(
            "Invalid Authorization header. Credentials string "
            "should not contain spaces."
        )
        raise exceptions.AuthenticationFailed(msg)

    return auth[1].decode("utf-8")


def get_user_model():
    user_model = getattr(settings, "COGNITO_USER_MODEL", settings.AUTH_USER_MODEL)
    return django_apps.get_model(user_model, require_ready=False)


class CognitoAuthentication(BaseAuthentication):
    """Token based authentication using the JSON Web Token standard."""

    def authenticate(self, request):
        """Entrypoint for Django Rest Framework"""
        jwt_token = get_jwt_token(request)
        if jwt_token is None:
            return None

        verified_claims: dict

        # Authenticate token
        try:
            verified_claims: dict = cognitojwt.decode(
                get_jwt_token(request),
                COGNITO_AWS_REGION,
                COGNITO_USER_POOL,
                testmode=False  # Disable token expiration check for testing purposes
            )

        except:
            raise exceptions.AuthenticationFailed()

        USER_MODEL = get_user_model()
        user = USER_MODEL.objects.get_or_create(
            auth_key=verified_claims['sub'],
            defaults={
                'username': verified_claims['username'],
                'is_active': True,
            })

        return user[0], jwt_token

    def authenticate_header(self, request):
        """
        Method required by the DRF in order to return 401 responses for authentication failures, instead of 403.
        More details in https://www.django-rest-framework.org/api-guide/authentication/#custom-authentication.
        """
        return "Bearer: api"
