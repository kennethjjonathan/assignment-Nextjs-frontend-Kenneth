import React from "react";
import Link from "next/link";

function Index() {
  return (
    <div>
      <Link href="/admin/manage-posts/create">Create a Post</Link>
    </div>
  );
}

export default Index;
