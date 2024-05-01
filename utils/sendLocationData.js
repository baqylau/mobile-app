async function sendLocationData(location, uniqueIdentifier, expoPushToken, accelerometerBuffer, speedsBuffer) {
    if (accelerometerBuffer.length === 0) {
        return
    }

    try {
        const res = await fetch('https://baqylau-backend.undefined.ink/api/speedLimits', {
            method: "POST",
            body: JSON.stringify({
                id: uniqueIdentifier,
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                speed: location.coords.speed * 3.6,
                accelerometerData: accelerometerBuffer,
                notificationToken: expoPushToken
            }),
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "1"
            }
        });
        const json = await res.json();

        return json;
    } catch (error) {
        console.error('Failed to send data:', error);
    }
}

export default sendLocationData;