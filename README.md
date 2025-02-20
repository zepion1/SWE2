# MSU CardReader
Before anything make sure the Magstripe reader is connected!

## Windows OS & MacOS

Requirements for Windows: MinGW
Requirement for MacOS: cURL

# Installation

For Windows: Download [MinGW](https://winlibs.com/) and Unzip.
For MacOS: ```bash
              brew install curl
```
Rename the folder to "MinGW" and Copy "MinGW" folder to "C:\\" drive

#### Open Command line:
**Run the command:**

```powershell
SET PATH=C:\MinGW\bin;%PATH%
```

# Compilation Windows

#### Download or Clone CardReader.c
**Open Command line**

Run the command:
```powershell
gcc -o CardReader.exe CardReader.c -lwininet
```
Finally Execute: CardReader.exe

# Compilation MacOS

#### Download or clone CardReader_MACOS.c
Run the command:
```bash
gcc -o CardReader_MACOS CardReader_MACOS.c -lcurl
./CardReader_MACOS
```
**Make Sure the Magnetic Reader is connected properly!**