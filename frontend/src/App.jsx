import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center items-center font-sans">
        <div className="maindiv w-[40rem] mt-20 flex flex-col gap-5">

          <h1 className='text-center text-4xl mb-10 font-bold'>Expetrack</h1>
          <select className="block w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" selected disabled>Select an option</option>
            <option value="food">Food</option>
            <option value="goods">Goods</option>
            <option value="services">Services</option>
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
                e.target.value = 0; // 
              }
            }}
            step="1"
          />


          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr class="bg-gray-100 text-left">
                  <th class="py-2 px-4 border-b border-gray-200">Expense Type</th>
                  <th class="py-2 px-4 border-b border-gray-200">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-50">
                  <td class="py-2 px-4 border-b border-gray-200">Groceries</td>
                  <td class="py-2 px-4 border-b border-gray-200">$150</td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="py-2 px-4 border-b border-gray-200">Rent</td>
                  <td class="py-2 px-4 border-b border-gray-200">$1,200</td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="py-2 px-4 border-b border-gray-200">Utilities</td>
                  <td class="py-2 px-4 border-b border-gray-200">$200</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
