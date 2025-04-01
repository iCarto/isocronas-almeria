from back.utils import replace_middle_end_of_line


def test_replace_middle_end_of_line_none():
    assert replace_middle_end_of_line(None) is None


def test_replace_middle_end_of_line_empty_string():
    assert replace_middle_end_of_line("") is None


def test_replace_middle_end_of_line_no_newline():
    assert replace_middle_end_of_line("This is a test.") == "This is a test."


def test_replace_middle_end_of_line_with_newline():
    assert (
        replace_middle_end_of_line("This is a test.\nNext line.")
        == "This is a test. Next line."
    )


def test_replace_middle_end_of_line_with_spaces_and_newline():
    assert (
        replace_middle_end_of_line("This is a test.   \n   Next line.")
        == "This is a test. Next line."
    )


def test_replace_middle_end_of_line_with_multiple_newlines():
    assert (
        replace_middle_end_of_line("This is a test.\nNext line.\nAnother line.")
        == "This is a test. Next line. Another line."
    )


def test_replace_middle_end_of_line_with_no_dot_before_newline():
    assert (
        replace_middle_end_of_line("This is a test\nNext line.")
        == "This is a test. Next line."
    )


def test_replace_middle_end_of_line_with_multiple_dots_before_newline():
    assert (
        replace_middle_end_of_line("This is a test...\nNext line.")
        == "This is a test. Next line."
    )


def test_replace_middle_end_of_line_with_spaces_before_newline():
    assert (
        replace_middle_end_of_line("This is a test   \nNext line.")
        == "This is a test. Next line."
    )
