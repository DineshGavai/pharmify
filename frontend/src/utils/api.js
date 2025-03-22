export const apiRequest = async ({
    url,
    method = "POST",
    headers = { "Content-Type": "application/json" },
    body = null,
    onSuccess = (data) => { },
    onError = (error) => { },
    onWarning = null,
    onInfo = null,
}) => {

    if (!url) throw new Error("API URL must be specified")

    try {

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        const data = await response.json();

        if (response.ok) onSuccess(data);
        else onError(data);

        return data;

    } catch (error) {
        onError({ message: "Something went wrong!" });
    }

}
