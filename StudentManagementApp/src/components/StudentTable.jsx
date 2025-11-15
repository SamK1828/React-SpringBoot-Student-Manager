const StudentTable = ({ students }) => {
  const countAbove80 = students.filter((s) => s.marks >= 80).length;
  const countBelow40 = students.filter((s) => s.marks < 40).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-indigo-100">
      {/* <h3 className="text-xl font-semibold text-indigo-700 mb-4">📋 Student Records</h3> */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-indigo-50 transition"
              >
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td
                  className={`p-3 font-medium ${s.marks >= 80
                      ? "text-green-600"
                      : s.marks < 40
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                >
                  {s.marks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Section */}
      <div className="mt-4 flex justify-between text-sm font-medium text-gray-600">
        <span className="text-green-600">Above 80: {countAbove80}</span>
        <span className="text-red-600">Below 40: {countBelow40}</span>
      </div>
    </div>
  );
};

export default StudentTable;
