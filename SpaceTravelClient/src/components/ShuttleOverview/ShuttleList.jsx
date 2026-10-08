import ShuttleCard from "./ShuttleCard";

const ShuttleList = ({ shuttles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shuttles.map((s) => (
                <ShuttleCard key={s.id} shuttle={s} />
            ))}
        </div>
    );
};

export default ShuttleList;
