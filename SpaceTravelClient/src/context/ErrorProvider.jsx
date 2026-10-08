import { useState, useEffect } from "react";
import ErrorContext from "./ErrorContext";

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    // Auto-clear after 5 seconds
    useEffect(() => {
        if (!error) return;
        const id = setTimeout(() => setError(null), 5000);
        return () => clearTimeout(id);
    }, [error]);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {error && (
                <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">
                    {error}
                </div>
            )}
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorProvider;
