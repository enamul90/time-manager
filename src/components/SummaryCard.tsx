


export default function SummaryCard({ data }) {


    return (
        <>
            {data.map((item, index) => {

                return (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow w-full cursor-pointer"
                    >
                        <div className="p-3 rounded-full bg-[var(--primary)] text-white">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                            <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                        </div>
                    </div>
                );
            })}
        </>

    );
}
