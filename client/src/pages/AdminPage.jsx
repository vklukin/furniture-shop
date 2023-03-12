import React from "react";

import ShowRequests from "../components/admin/ShowRequests";
import AddProducts from "../components/admin/AddProducts";

function AdminPage() {
  return (
    <main className="admin">
      <AddProducts />
      <ShowRequests />
    </main>
  );
}

export default AdminPage;
