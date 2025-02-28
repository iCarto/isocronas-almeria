from utils import remove_trailing_dots


def test_remove_trailing_dots_none():
    assert remove_trailing_dots(None) is None


def test_remove_trailing_dots_empty_string():
    assert remove_trailing_dots("") == ""


def test_remove_trailing_dots_no_trailing_dots():
    assert remove_trailing_dots("This is a test") == "This is a test"


def test_remove_trailing_dots_with_trailing_dot():
    assert remove_trailing_dots("This is a test.") == "This is a test"


def test_remove_trailing_dots_with_trailing_dots():
    assert remove_trailing_dots("This is a test...") == "This is a test"


def test_remove_trailing_dots_with_trailing_dots_and_spaces():
    assert remove_trailing_dots("This is a test.   ") == "This is a test"
    assert remove_trailing_dots("This is a test...   ") == "This is a test"


def test_remove_trailing_dots_with_trailing_dots_and_newline():
    assert remove_trailing_dots("This is a test.\n") == "This is a test"
    assert remove_trailing_dots("This is a test...\n") == "This is a test"


def test_dont_remove_middle_dots():
    assert remove_trailing_dots("This is . a test.   ") == "This is . a test"
    assert remove_trailing_dots("This is. a test...   ") == "This is. a test"
    assert remove_trailing_dots("This is. a test") == "This is. a test"
