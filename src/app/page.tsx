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
  const [data, setData] = useState<TaxConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          "https://api.tkpshivatemple.com/api/tax/config",
          {
            signal: controller.signal,
            cache: "no-store", // prevents caching in dev
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message ?? "Failed to fetch");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  // ✅ Define AG Grid columns
  const columnDefs: ColDef<TaxConfig>[] = [
    { headerName: "ID", field: "id", width: 100, sortable: true },
    {
      headerName: "Display Name",
      field: "displayName",
      flex: 1,
      sortable: true,
    },
    { headerName: "Key Name", field: "keyName", flex: 1, sortable: true },
    {
      headerName: "Percentage (%)",
      field: "percentage",
      width: 160,
      sortable: true,
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
          theme={themeQuartz} // Modern Quartz theme (no CSS imports)
          rowData={data} // Fetched data
          columnDefs={columnDefs} // Columns
          pagination={true} // Enable pagination
          paginationPageSize={5} // Show 5 rows per page
        />
      </div>
    </main>
  );
}
