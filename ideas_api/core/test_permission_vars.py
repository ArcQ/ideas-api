from unittest import TestCase

from core.permission_vars import build_permissions_model_meta, lab_join_permissions, PermissionResource, CrudPermission, \
    build_permission_string, build_group_string, Role


class Test(TestCase):
    def test_build_permissions_model_meta(self):
        expected = (('core.lab_join_delete', 'lab join delete'), ('core.lab_join_modify', 'lab join modify'))
        self.assertEqual(build_permissions_model_meta(lab_join_permissions), expected)

    def test_build_group_string(self):
        expected = 'core.lab_admin_test_id'
        self.assertEqual(build_group_string(PermissionResource.LAB, Role.ADMIN, 'test_id'), expected)

    def test_build_permission_string(self):
        expected = 'core.lab_view'
        self.assertEqual(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW), expected)
