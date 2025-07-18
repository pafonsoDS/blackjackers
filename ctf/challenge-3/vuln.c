#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct Frame {
    char buffer[64];
    char access_granted;
};

__attribute__((noinline)) void vuln() {
    volatile struct Frame frame;
    frame.access_granted = 'D';

    printf("Enter your input: ");
    gets(frame.buffer);  // ⚠️ Vulnerable

    if (frame.access_granted == 'S') {
        printf("🎉 You found the flag! FLAG{<REDACTED>}\n");
    } else {
        printf("Access denied.\n");
    }
}

int main() {
    vuln();
    return 0;
}

