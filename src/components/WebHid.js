import React, { useState, useEffect } from "react";

function WebHid({ classId }) {

    const [connectedDevice, setConnectedDevice] = useState(null);
    const [lastReport, setLastReport] = useState("");

    useEffect(() => {
        navigator.hid.addEventListener('connect', (event) => {
            console.log('Device connected:', event.device);
            reconnectDevice();
        });

        navigator.hid.addEventListener('disconnect', (event) => {
            console.log('Device disconnected:', event.device);
            setConnectedDevice(null);
        });

        reconnectDevice(); // Try to reconnect silently on page load
    }, []);

    const requestDevice = async () => {
        try {
            const [device] = await navigator.hid.requestDevice({
                filters: [{ vendorId: 0x5689 }] // Replace with your vendorId
            });

            await device.open();
            setupDevice(device);
            console.log("Attached oninput report handler", !!device.oninputreport);
            setConnectedDevice(device);

            console.log("Device connected:", device.productName);
        } catch (error) {
            console.error("HID connection error:", error);
        }
    };

    async function reconnectDevice() {
        try {
            const devices = await navigator.hid.getDevices();
            if (devices.length > 0) {
                const device = devices[0];
                if (!device.opened) {
                    await device.open();
                }
                setupDevice(device);
                setConnectedDevice(device);
                console.log("Reconnected to device:", device.productName);
            } else {
                console.log("No authorized HID devices found.");
            }
        } catch (error) {
            console.error("Reconnect error:", error);
        }
    }

    function setupDevice(device) {
        device.oninputreport = (event) => {
            const { data } = event;
            const decoded = new TextDecoder().decode(data);
            console.log("Swipe detected:", decoded);
            setLastReport(decoded);
            sendSwipeData(decoded);
        };
    }

    const sendSwipeData = async (cardData) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/swipe-in/${classId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ swipe_data: cardData, timestamp: new Date().toISOString() })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Server response:", result);
        } catch (error) {
            console.log("Failed to send data:", error);
        }
    };

    return (
        <div>
            <button onClick={requestDevice}>Click here to connect HID card reader device</button>
            {connectedDevice && (
                <div>
                    <p>Connected to: {connectedDevice.productName}</p>
                    <p><strong>Last Report:</strong> {lastReport}</p>
                </div>
            )}
        </div>
    );
};

export default WebHid;