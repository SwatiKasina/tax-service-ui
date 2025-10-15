"use client";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { TaxConfig } from "../types/TaxConfig";

ModuleRegistry.registerModules([AllCommunityModule]);

const TaxGrid: React.FC<{ taxData: TaxConfig[] }> = ({ taxData }) => {
  const columnDefs: ColDef<TaxConfig>[] = [
    { headerName: "Key", field: "keyName" },
    { headerName: "Display Name", field: "displayName" },
    { headerName: "Percentage (%)", field: "percentage" },
  ];

  return (
    <div style={{ height: 250, width: "100%" }}>
      <AgGridReact<TaxConfig>
        theme={themeQuartz} // 👈 new theming API
        rowData={taxData}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default TaxGrid;
