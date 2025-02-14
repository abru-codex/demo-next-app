import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "processing",
      email: "a@example.com"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "x@email.com"
    }
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container px-2">
          <DataTable columns={columns} data={data} />
        </div>
  );
}
