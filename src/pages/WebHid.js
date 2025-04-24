import React, { useState, useEffect } from "react";

function WebHid() {

    const [connectedDevice, setConnectedDevice] = useState(null);
    const [lastReport, setLastReport] = useState("");

    const requestDevice = async () => {
        try {
            const [device] = await navigator.hid.requestDevice({ filters: [{ vendorId: 0x5689 }] });

            if (!device) return;

            await device.open();
            setConnectedDevice(device);
            
            device.oninputreport = (event) => {
                const { data, reportId } = event;
                const decoded = new TextDecoder().decode(data);
                console.log(`Report ${reportId}:`, decoded);
                setLastReport(decoded);
            };

            console.log("Device connected", device.productName);
        } catch (error) {
            console.error("HID connection error", error);
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