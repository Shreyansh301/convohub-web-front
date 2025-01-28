"use client";

import React from "react";

const ActiveUsers = ({ activeUsers }: { activeUsers: number }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Active Users</h2>
      <p className="text-3xl font-bold">{activeUsers}</p>
    </div>
  );
};

export default ActiveUsers;
