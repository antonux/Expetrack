import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const Expenses = [
    { id: 1, Type: "Food", Value: "₱2,342" },
    { id: 2, Type: "Transportation", Value: "₱5,400" },
    { id: 3, Type: "Clothes", Value: "₱1,200" }
  ];

  return (
    <>
      <div className="flex justify-center items-center font-sans">
        <div className="maindiv w-[40rem] mt-20 flex flex-col gap-5">

          <h1 className='text-center text-4xl mb-10 font-bold'>Expetrack</h1>
          <select className="block w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" selected disabled>Select an option</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="clothes">Clothes</option>
          </select>

          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Expense value"
            onKeyDown={(e) => {
              if (e.key === '-') {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              if (parseFloat(e.target.value) < 0) {
                e.target.value = 0;
              }
            }}
            step="1"
          />

          <div className="flex flex-col">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mb-4 px-4 py-2 bg-[#74c75f] text-white rounded hover:bg-[#69b656]"
            >
              {isOpen ? 'Hide Expenses' : 'Show Expenses'}
            </button>
            {isOpen && (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="py-2 px-4 border-b border-gray-200">Expense Type</th>
                      <th className="py-2 px-4 border-b border-gray-200">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Expenses.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">{item.Type}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{item.Value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}


          </div>

        </div>
      </div>

    </>
  )
}

export default App
