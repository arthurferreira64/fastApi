import React, { useEffect, useState } from "react";
import { showToastMessage } from "../utils/common";
import { deleteItem, getAllItems } from "../axios/item";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems().then((res) => {
      setItems(res.data);
    });
  }, []);

  function deleteSelectedItem(id) {
    deleteItem(id).then((res) => {
      setItems((ps) => [...ps.filter((el) => el.id !== id)]);
      showToastMessage("Item supprimé", "success");
    });
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-4">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                DESCRIPTION
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              return (
                <tr
                  key={idx}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.description}</td>

                  <td className="px-6 py-4">
                    <Link
                      to={`${item.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => deleteSelectedItem(item.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
