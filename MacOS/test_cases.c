#ifdef TEST

#include <assert.h>

/*
##########################
#                        #
# TEST CASES FOR SCANNER #
#                        #
##########################
*/

void test_extract_id_valid() {
    char id[20];
    int result = extract_id(";123456789=0000", id, sizeof(id));
    assert(result == 1);
    assert(strcmp(id, "123456789") == 0);
}

void test_extract_id_no_semicolon() {
    char id[20];
    int result = extract_id("123456789=0000", id, sizeof(id));
    assert(result == 0);
}

void test_extract_id_no_equals() {
    char id[20];
    int result = extract_id(";123456789", id, sizeof(id));
    assert(result == 1);
    assert(strcmp(id, "123456789") == 0);
}

void test_extract_id_empty_input() {
    char id[20];
    int result = extract_id("", id, sizeof(id));
    assert(result == 0);
}

void test_extract_id_buffer_small() {
    char id[5];
    int result = extract_id(";123456789=0000", id, sizeof(id));
    assert(result == 1);
    assert(strncmp(id, "1234", 4) == 0);
}

void test_get_timestamp_format() {
    char ts[20];
    get_timestamp(ts, sizeof(ts));
    assert(strlen(ts) == 19);
    assert(ts[2] == '-' && ts[5] == '-' && ts[10] == ' ' && ts[13] == ':' && ts[16] == ':');
}

int main() {
    test_extract_id_valid();
    test_extract_id_no_semicolon();
    test_extract_id_no_equals();
    test_extract_id_empty_input();
    test_extract_id_buffer_small();
    test_get_timestamp_format();
    printf("All tests passed!\n");
    return 0;
}

#endif
