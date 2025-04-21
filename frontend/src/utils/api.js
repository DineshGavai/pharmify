export const contentTypes = {
    JSON_DATA: "application/json",           // JSON data format
    FORM_URLENCODED: "application/x-www-form-urlencoded", // Form data format
    FORM_DATA: "multipart/form-data",        // For file uploads
    TEXT_PLAIN: "text/plain",                // For plain text data
    XML: "application/xml",                  // For XML data
    HTML: "text/html",                       // For HTML content
};

export const apiRequest = async ({
    url,
    method = "POST",
    headers = { "Content-Type": contentTypes.JSON_DATA },
    body = null,
    onSuccess = (data) => { },
    onError = (error) => { },
    onWarning = null,
    onInfo = null,
}) => {

    if (!url) throw new Error("API URL must be specified");

    // Handle form data (application/x-www-form-urlencoded)
    if (headers["Content-Type"] === contentTypes.FORM_URLENCODED && body) {
        body = new URLSearchParams(body);
    }

    // Handle form data (multipart/form-data), which may be used for file uploads
    if (headers["Content-Type"] === contentTypes.FORM_DATA && body) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            formData.append(key, value);
        }
        body = formData;
    }

    if (headers["Content-Type"] === contentTypes.JSON_DATA && body) {
        body = JSON.stringify(body)
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? body : null,
        });

        const data = await response.json();

        if (response.ok) onSuccess(data);
        else onError(data);

        return data;

    } catch (error) {
        onError({ message: "Something went wrong!" });
    }
};
