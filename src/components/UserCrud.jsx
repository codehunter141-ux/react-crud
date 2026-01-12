import { useEffect, useState } from "react";
import api from "../api/axios";

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    address: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await api.get("/getall");
    setUsers(res.data);
  };

  const saveUser = async () => {
    if (editId) await api.put(`/update/${editId}`, form);
    else await api.post("/create", form);
    resetForm();
    fetchUsers();
  };

  const editUser = async (id) => {
    const res = await api.get(`/getuser/${id}`);
    setForm(res.data);
    setEditId(id);
  };

  const deleteUser = async (id) => {
    await api.delete(`/delete/${id}`);
    fetchUsers();
  };

  const resetForm = () => {
    setForm({ name: "", email: "", role: "", address: "", phone: "" });
    setEditId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 px-4 py-2 rounded-lg font-bold text-white transition-colors ${
            editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={saveUser}
        >
          {editId ? "Update User" : "Create User"}
        </button>
        {editId && (
          <button
            className="flex-1 px-4 py-2 rounded-lg font-bold bg-gray-400 hover:bg-gray-500 text-white"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-purple-50">
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2">{u.address}</td>
                <td className="border px-4 py-2">{u.phone}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-600 font-semibold hover:underline"
                    onClick={() => editUser(u.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 font-semibold hover:underline"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCrud;