# MSU CardReader
Before anything make sure the Magstripe reader is connected!

Windows OS Only

Requirements: MinGW

# Installation

Download [MinGW](https://winlibs.com/) and Unzip.

Rename the folder to "MinGW" and Copy "MinGW" folder to "C:\\" drive

#### Open Command line:
Run the command:

```powershell
SET PATH=C:\MinGW\bin;%PATH%
```

# Compilation

#### Download or Clone CardReader.c
Open Command line

Run the command:
```powershell
gcc -o CardReader.exe CardReader.c -lwininet
```
Finally Execute: CardReader.exe