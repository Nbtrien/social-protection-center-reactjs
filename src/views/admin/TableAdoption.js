import React, { useEffect } from "react";
import CardTableAdoption from "components/Cards/CardTableAdoption.js";

export default function TableAdoption() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <div className="tableStyle">
            <CardTableAdoption />
          </div>
        </div>
      </div>
    </>
  );
}
