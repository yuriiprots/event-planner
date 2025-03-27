import React from "react";

export default function Filter({ value, onChange }) {
  return (
    <div className="flex-1">
      <label
        htmlFor="importance"
        className="block text-sm font-medium text-gray-700 pb-1"
      >
        Filter by Importance
      </label>
      <select
        id="importance"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=" block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">All</option>
        <option value="normal">Normal</option>
        <option value="important">Important</option>
        <option value="critical">Critical</option>
      </select>
    </div>
  );
}
