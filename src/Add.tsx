import React, { useState } from "react";

const TAGS = ["Food", "Drink", "Shopping", "Other"];
export default function Add() {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>("Food");

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input ? Number(input) : undefined);
  };

  const onAddItem = () => {
    if (!value) return;
    console.log(value);
  };
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">New item</h2>

        <div className="flex gap-2">
          {TAGS.map((tag) => (
            <span
              onClick={() => setCategory(tag)}
              key={tag}
              className={
                category === tag ? "badge badge-accent" : "badge badge-outline"
              }
              style={{ cursor: "pointer" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <input
          type="number"
          value={value}
          onChange={(e) => onChangeValue(e)}
          placeholder="Type here"
          className="input input-bordered input-sm"
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onAddItem}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
