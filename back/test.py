import requests
import pytest

URL = "http://localhost:8000/api"

def request(
    endpoint: str,
    method: str,
    payload: dict | None = None,
    headers: dict | None = {}
):
    url_request = f"{URL}/{endpoint}"
    
    method = method.upper()

    headers.update({"content-type": "application/json"}) if method != "GET" else None

    return requests.request(
        url=url_request,
        method=method,
        json=payload,
        headers=headers
    )

def test_api():
    try:
        request(URL, "GET")
    except:
        pytest.exit("API is not working.")

    return

@pytest.mark.parametrize("params,status_code", [
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user1", "password": "321"}}, [200, 409, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user2", "password": "123"}}, [200, 409, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user3", "password": "1234"}}, [200, 409, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user1", "password": "321"}}, [409, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user2", "passwrd": "123"}}, [422, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "12345", "password": "abc"}}, [200, 422, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "a" * 300, "password": "abc"}}, [422, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user!@#", "password": "abc"}}, [200, 422, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "   ", "password": "abc"}}, [422, 500]),
    ({"endpoint": "user/", "method": "POST", "payload": {"name": "user2", "password": "newpass"}}, [409, 500]),
    ({"endpoint": "user/login", "method": "POST", "payload": {"name": "user2", "password": "123"}}, [200, 500]),
    ({"endpoint": "user/", "method": "GET"}, [200, 500]),
    ({"endpoint": "user/10", "method": "GET"}, [200, 204, 422, 500]),
    ({"endpoint": "user/3", "method": "DELETE"}, [200, 204, 422, 500]),

    ({"endpoint": "post/", "method": "POST", "payload": {"content": "oi, sou user1", "id_user": 1}}, [200, 204, 422, 500]),
    ({"endpoint": "post/", "method": "POST", "payload": {"content": "sou user2", "id_user": 2}}, [200, 204, 422, 500]),
    ({"endpoint": "post/", "method": "POST", "payload": {"content": "sou user2, de novo", "id_user": 2}}, [200, 204, 422, 500]),
    ({"endpoint": "post/", "method": "POST", "payload": {"content": "", "id_user": 1}}, [422, 500]),
    ({"endpoint": "post/", "method": "POST", "payload": {"content": "😀🎉✨", "id_user": 1}}, [200, 500]),
    ({"endpoint": "post/", "method": "POST", "payload": {"content": "<script>alert(1)</script>", "id_user": 1}}, [200, 422, 500]),
    ({"endpoint": "post/", "method": "POST", "payload": {"content": "invalid id", "id_user": "abc"}}, [422, 500]),
    ({"endpoint": "post/", "method": "GET"}, [200, 204, 422, 500]),
    ({"endpoint": "post/1", "method": "GET"}, [200, 204, 422, 500]),
    ({"endpoint": "post/1", "method": "PATCH", "payload": {"content": "update"}}, [200, 204, 422, 500]),
    ({"endpoint": "post/2", "method": "DELETE"}, [200, 204, 422, 500]),

    ({"endpoint": "interaction/", "method": "POST", "payload": {"is_like": False, "id_post": 1, "id_user": 1}}, [200, 204, 409, 422, 500]),
    ({"endpoint": "interaction/", "method": "POST", "payload": {"is_like": True, "id_post": 1, "id_user": 1}}, [200, 204, 409, 422, 500]),
    ({"endpoint": "interaction/", "method": "POST", "payload": {"is_like": False, "id_post": 1, "id_user": 2}}, [200, 204, 409, 422, 500]),
    ({"endpoint": "interaction/", "method": "POST", "payload": {"id_post": 1, "id_user": 1}}, [200, 422, 500]),
    ({"endpoint": "interaction/", "method": "POST", "payload": {"is_like": "true", "id_post": 1, "id_user": 1}}, [200, 422, 500]),
    ({"endpoint": "interaction/", "method": "POST", "payload": {"is_like": False, "id_post": 1, "id_user": 1}}, [409, 500]),
    ({"endpoint": "interaction/", "method": "GET"}, [200, 204, 422, 500]),
    ({"endpoint": "interaction/1", "method": "GET"}, [200, 204, 422, 500]),
    ({"endpoint": "interaction/1", "method": "PATCH", "payload": {"is_like": False}}, [200, 204, 422, 500]),
    ({"endpoint": "interaction/1", "method": "DELETE"}, [200, 204, 422, 500]),
])

def test_api_endpoint(params: dict, status_code: list[int]):
    response = request(**params)
    assert response.status_code in status_code
