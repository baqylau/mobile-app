async function getOrgData(API_URL, orgId) {
    try {
        const res = await fetch(API_URL + '/organization/' + orgId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();

        return json;
    } catch (error) {
        console.error('Failed to get org data:', error);
    }
}

export default getOrgData;