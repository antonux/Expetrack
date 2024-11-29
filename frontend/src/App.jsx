import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  // const Expenses = [
  //   { id: 1, Type: "Food", Value: "2342", Date: "11/29/2024" },
  //   { id: 2, Type: "Transportation", Value: "5400", Date: "11/28/2024" },
  //   { id: 3, Type: "Clothes", Value: "1200", Date: "11/29/2024" }
  // ];
  const [Expenses, setExpenses] = useState([
    { id: 1, Type: "Food", Value: "2342", Date: "11/29/2024" },
    { id: 2, Type: "Transportation", Value: "5400", Date: "11/28/2024" },
    { id: 3, Type: "Clothes", Value: "1200", Date: "11/29/2024" }
  ]);

  const [selectedType, setSelectedType] = useState('');
  const [expenseValue, setExpenseValue] = useState('');

  const handleAddExpense = () => {
    if (selectedType && expenseValue && !isNaN(expenseValue) && parseFloat(expenseValue) > 0) {
      const newExpense = {
        id: Expenses.length + 1, // Simple increment for id
        Type: selectedType,
        Value: expenseValue,
        Date: new Date().toLocaleDateString('en-US') // Current date in 'MM/DD/YYYY' format
      };

      setExpenses([...Expenses, newExpense]);
      setSelectedType('');
      setExpenseValue('');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };



  const [isOpen, setIsOpen] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expType, setExpType] = useState("");

  const handleSelect = (event) => {
    console.log("Selected Value:", event.target.value);
    setExpType(event.target.value);
  };

  useEffect(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setStartDate(firstDayOfMonth);
    setEndDate(lastDayOfMonth);
  }, []);

  // Filtered expenses based on the selected date range
  const filteredExpenses = Expenses.filter((item) => {
    const itemDate = new Date(item.Date);
    const isAfterStartDate = !startDate || itemDate >= new Date(startDate);
    const isBeforeEndDate = !endDate || itemDate <= new Date(endDate);
    const isMatchingType = !expType || item.Type.toLowerCase() === expType.toLowerCase();
    return isAfterStartDate && isBeforeEndDate && isMatchingType;
  });
  console.log(filteredExpenses)


  return (
    <>
      <div className="flex justify-center items-center font-sans">
        <div className="maindiv w-[40rem] mt-20 flex flex-col gap-5">

          <h1 className='text-center text-4xl mb-10 font-bold'>Expetrack</h1>
          <select
            className="block w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Clothes">Clothes</option>
          </select>

          <div className="flex mt-4">
            <input
              type="number"
              className="w-[75%] border border-gray-300 rounded-lg py-2 px-4 text-gray-700 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Expense value"
              value={expenseValue}
              onChange={(e) => setExpenseValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === '-') {
                  e.preventDefault();
                }
              }}
              step="1"
            />
            <button
              className="w-[22%] ml-[3%] bg-blue-500 hover:bg-blue-600 text-white font-semibold h-10 px-4 rounded shadow-md transition-all duration-300 ease-in-out"
              onClick={handleAddExpense}
            >
              Add
            </button>
          </div>



          <div className="flex flex-col">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mb-4 px-4 py-2 bg-[#74c75f] text-white rounded hover:bg-[#69b656]"
            >
              {isOpen ? 'Hide Expenses' : 'Show Expenses'}
            </button>

            {isOpen && (
              <div className="overflow-x-auto">
                <div className="mb-4 flex space-x-4">
                  <div className='w-[40%]'>
                    <label className="block mb-2">Type:</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg py-2 px-4"
                      value={expType}
                      onChange={handleSelect}
                    >
                      <option value="">All</option>
                      <option value="food">Food</option>
                      <option value="transportation">Transportation</option>
                      <option value="clothes">Clothes</option>
                    </select>
                  </div>
                  <div className='w-[30%]'>
                    <label className="block mb-2">From:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="px-4 w-full py-2 border border-gray-300 rounded"
                      placeholderText="Select start date"
                    />
                  </div>
                  <div className='w-[30%]'>
                    <label className="block mb-2">To:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="px-4 w-full py-2 border border-gray-300 rounded"
                      placeholderText="Select end date"
                    />
                  </div>
                </div>
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="py-2 px-4 border-b border-gray-200">Expense Type</th>
                      <th className="py-2 px-4 border-b border-gray-200">Date</th>
                      <th className="py-2 px-4 border-b border-gray-200">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">{item.Type}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{item.Date}</td>
                        <td className="py-2 px-4 border-b border-gray-200">₱{Number(item.Value.replace(/[^\d.-]/g, "")).toLocaleString("en-US")}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="py-2 px-4 border-t border-gray-200 font-bold" colSpan="2">
                        Total
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200 font-bold">
                        ₱{/* Calculate the total */}
                        {filteredExpenses.reduce((total, item) => {
                          // Remove commas from the value string
                          const numericValue = parseFloat((item.Value || "0").replace(/,/g, ""));
                          return total + numericValue;
                        }, 0).toLocaleString("en-US")}
                      </td>
                    </tr>
                  </tfoot>
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
