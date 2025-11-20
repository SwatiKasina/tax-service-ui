"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
  ColDef,
} from "ag-grid-community";

// ✅ Register AG Grid modules once
ModuleRegistry.registerModules([AllCommunityModule]);

// ✅ Define your data type
type TaxConfig = {
  id: number;
  displayName: string;
  keyName: string;
  percentage: number;
};

export default function Page() {
  const API = "https://api.tkpshivatemple.com/api/tax/config";

  const [data, setData] = useState<TaxConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(API, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: TaxConfig[] = await res.json();
        setData(json);
      } catch (e) {
        if (e instanceof Error) {
          if (e.name !== "AbortError") setError(e.message ?? "Failed to fetch");
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const saveRow = async (rowData: TaxConfig) => {
    try {
      const reply = await fetch(`${API}/${rowData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: rowData.displayName,
          keyName: rowData.keyName,
          percentage: rowData.percentage,
        }),
      });

      if (reply.ok) {
        console.log("Row updated successfully!");
      } else {
        console.log("Failed to update row. Status:", reply.status);
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const columnDefs: ColDef<TaxConfig>[] = [
    { headerName: "ID", field: "id", width: 100, sortable: true },
    {
      headerName: "Display Name",
      field: "displayName",
      flex: 1,
      editable: true,
    },
    { headerName: "Key Name", field: "keyName", flex: 1, editable: true },
    {
      headerName: "Percentage (%)",
      field: "percentage",
      width: 160,
      editable: true,
    },
  ];

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  // ✅ Render AG Grid
  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Tax Config</h1>

      <div style={{ height: 400, width: "100%" }}>
        <AgGridReact<TaxConfig>
          theme={themeQuartz}
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          onCellValueChanged={(event) => saveRow(event.data)}
        />
      </div>
    </main>
  );
}
