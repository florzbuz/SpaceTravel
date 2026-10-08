const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiGet = async (path) => {
    try {
        const res = await fetch(`${API_BASE_URL}${path}`);
        if (!res.ok) throw new Error(`GET ${path} failed`);
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const apiPost = async (path, body) => {
    try {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(`POST ${path} failed`);
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
