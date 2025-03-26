#include <stdio.h>
#include <time.h>
#include <conio.h>
#include <windows.h>
#include <wininet.h>

#pragma comment(lib, "wininet.lib")

void get_timestamp(char *buffer, size_t buffer_size)
{

    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    strftime(buffer, buffer_size, "%m-%d-%Y %H:%M:%S", tm_info);
}

void send_to_api(const char *id, const char *timestamp)
{

    HINTERNET hSession, hConnect, hRequest;
    const char *server = "http://127.0.0.1:3000";
    const char *endpoint = "/swipe-in/";
    char postData[256];
    const char *headers = "Content-Type: application/x-www-form-urlencoded\r\n";
    snprintf(postData, sizeof(postData), "id=%s&timestamp=%s&cid=%d", id, timestamp, cid); // Class id entering has not yet been implemented in this program (Windows version)

    hSession = InternetOpen("Attendance", INTERNET_OPEN_TYPE_PRECONFIG, NULL, NULL, 0);
    if (!hSession)
    {
        printf("Session Error: Unable to open internet session.\n");
        return;
    }
    hConnect = InternetConnect(hSession, server, INTERNET_DEFAULT_HTTP_PORT, NULL, NULL, INTERNET_SERVICE_HTTP, 0, 0);
    if (!hConnect)
    {
        printf("Connection Error: Unable to connect to server.\n");
        InternetCloseHandle(hSession);
        return;
    }
    hRequest = HttpOpenRequest(hConnect, "POST", endpoint, NULL, NULL, NULL, INTERNET_FLAG_RELOAD | INTERNET_FLAG_NO_CACHE_WRITE, 0);
    if (!hRequest)
    {
        printf("Request Error: Unable to open request.\n");
        InternetCloseHandle(hConnect);
        InternetCloseHandle(hSession);
        return;
    }
    if (!HttpSendRequest(hRequest, headers, strlen(headers), (LPVOID)postData, strlen(postData)))
    {
        printf("Request Error: Failed to send request.\n");
    }
    else
    {
        printf("Data sent successfully: %s\n", postData);
    }
    InternetCloseHandle(hRequest);
    InternetCloseHandle(hConnect);
    InternetCloseHandle(hSession);
}

void process_scan(char *scan_data)
{

    char id[20];
    int i = 0, j = 0;
    while (scan_data[i] != '\0')
    {
        if (scan_data[i] == ';')
        {
            i++;
            while (scan_data[i] != '=' && scan_data[i] != '\0')
            {
                id[j++] = scan_data[i++];
            }
            id[j] = '\0';
            break;
        }
        i++;
    }
    if (j > 0)
    {
        char timestamp[20];
        get_timestamp(timestamp, sizeof(timestamp));
        printf("Scanned ID: %s\n", id);
        printf("Timestamp: %s\n", timestamp);
        send_to_api(id, timestamp);
    }
    else
    {
        printf("No valid scan data found!\n");
    }
}

int main()
{

    printf("Please swipe a card...\n");
    char scan_data[100];
    int index = 0;
    while (1)
    {
        if (_kbhit())
        {
            char ch = _getch();
            if (ch == '\r' || ch == '\n')
            {
                scan_data[index] = '\0';
                process_scan(scan_data);
                index = 0;
                printf("\nPlease swipe another card...\n");
            }
            else
            {
                scan_data[index++] = ch;
            }
        }
    }
    return 0;
}
