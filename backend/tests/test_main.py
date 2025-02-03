import pytest
from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)

mock_quote = {
    "id": 1,
    "quote": "Give me a museum and I'll fill it.",
    "author": "Pablo Picasso"
}


@pytest.fixture
def mock_request(mocker):
    """Fixture to mock requests.get"""
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = mock_quote
    return mock_get


def test_read_quote(mock_request):
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == mock_quote
