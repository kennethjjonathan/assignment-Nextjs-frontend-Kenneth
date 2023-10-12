import React from "react";
import Link from "next/link";

function Index() {
  return (
    <div className="flex flex-col">
      <Link href="/admin/subscription">Go to subscription page</Link>
      <Link href="/admin/manage-posts">Manage posts</Link>
      Admin Page
    </div>
  );
}

export default Index;
