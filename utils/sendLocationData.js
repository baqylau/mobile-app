async function sendLocationData(API_URL, location, uniqueIdentifier, expoPushToken, accelerometerBuffer, orgId) {
    if (accelerometerBuffer.length === 0) {
        return
    }

    try {
        const res = await fetch(API_URL + '/speedLimits', {
            method: "POST",
            body: JSON.stringify({
                id: uniqueIdentifier,
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                speed: location.coords.speed * 3.6,
                accelerometerData: accelerometerBuffer,
                notificationToken: expoPushToken,
                orgId: orgId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();

        console.log(json);

        return json;
    } catch (error) {
        console.error('Failed to send data:', error);
    }
}

export default sendLocationData;