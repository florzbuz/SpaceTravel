import { useState } from "react";

const TravelRequestForm = ({ originPlanet, planets, onSubmit, loading }) => {
    const [destinationPlanetId, setDestinationPlanetId] = useState("");
    const [species, setSpecies] = useState("");
    const [weightKg, setWeightKg] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    originPlanetId: originPlanet.id,
                    destinationPlanetId,
                    species,
                    weightKg: Number(weightKg)
                });
            }}
            className="mt-8 bg-gray-800 border border-gray-700 p-6 rounded-lg max-w-md"
        >
            <h3 className="text-xl font-semibold mb-4">
                Travel from <span className="text-blue-400">{originPlanet.name}</span>
            </h3>

            <label className="block mb-4">
                <span className="text-gray-300">Destination</span>
                <select
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    value={destinationPlanetId}
                    onChange={(e) => setDestinationPlanetId(e.target.value)}
                >
                    <option value="">Select destination</option>
                    {planets
                        .filter((p) => p.id !== originPlanet.id)
                        .map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                </select>
            </label>

            <label className="block mb-4">
                <span className="text-gray-300">Species</span>
                <input
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                />
            </label>

            <label className="block mb-6">
                <span className="text-gray-300">Weight (kg)</span>
                <input
                    type="number"
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium disabled:opacity-50"
            >
                {loading ? "Submitting..." : "Submit Request"}
            </button>
        </form>
    );
};

export default TravelRequestForm;
