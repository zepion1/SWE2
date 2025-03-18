#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <termios.h>
#include <unistd.h>
#include <curl/curl.h>
#include <ctype.h>

#define MAX_INPUT_SIZE 64

int extract_id(const char* scan_data, char* id_buffer, size_t buffer_size) {
    int i = 0, j = 0;
    while (scan_data[i] != '\0') {
        if (scan_data[i] == ';') {
            i++;  // Skip the ';'
            while (scan_data[i] != '=' && scan_data[i] != '\0' && j < buffer_size - 1) {
                id_buffer[j++] = scan_data[i++];
            }
            id_buffer[j] = '\0';
            return 1;
        }
        i++;
    }
    return 0;
}

void get_timestamp(char* buffer, size_t buffer_size) {
    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    strftime(buffer, buffer_size, "%m-%d-%Y %H:%M:%S", tm_info);
}

void send_to_api(const char* id, const char* timestamp, int cid) {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();

    if (curl) {
        char postData[256];
        snprintf(postData, sizeof(postData), "id=%s&timestamp=%s&cid=%d", id, timestamp, cid);

        curl_easy_setopt(curl, CURLOPT_URL, "http://127.0.0.1:5000/api/attendance"); //URL for our attendance API
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, strlen(postData));
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, NULL); 

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: text/html");
        curl_easy_setopt(curl, CURLOPT_HEADER, headers);

        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            fprintf(stderr, "Unable to send data to API: %s\n", curl_easy_strerror(res));
            printf("Try Again...\n");
        } else {
            printf("\nData sent successfully: %s\n\n", postData);
            printf("Waiting for card scan...\n");
        }

        curl_easy_cleanup(curl);
    }

    curl_global_cleanup();
}

void read_card_input() {
    struct termios oldt, newt;
    char scan_data[MAX_INPUT_SIZE];
    char id[20];
    char timestamp[20];
    char classid[MAX_INPUT_SIZE];
    int cid;

    printf("Enter Class ID: ");
    if (fgets(classid, sizeof(classid), stdin) != NULL ){
        if(sscanf(classid, "%d", &cid) == 1){
            printf("Class ID: %d\n", cid);
        } else {
            printf("Please enter valid ClassID.\n");
        }
    } else {
        printf("Error reading input.\n");
    }

    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);

    printf("Waiting for card scan...\n");

    while (1) {
        int index = 0;
        memset(scan_data, 0, sizeof(scan_data));

        while (index < MAX_INPUT_SIZE - 1) {
            char c;
            if (read(STDIN_FILENO, &c, 1) > 0) {
                if (c == '\n' || c == '\r') {
                    break;
                }
                scan_data[index++] = c;
            }
        }
        scan_data[index] = '\0';

        if (scan_data[0] == ';' && strchr(scan_data, '=')) {
            if (!extract_id(scan_data, id, sizeof(id))) {
                printf("Invalid scan data.\n");
                continue;
            }

            get_timestamp(timestamp, sizeof(timestamp));

            printf("Scanned ID: %s\n", id);
            printf("Timestamp: %s\n", timestamp);

            send_to_api(id, timestamp, cid);
        }
    }

    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
}

int main() {
    read_card_input();
    return 0;
}
