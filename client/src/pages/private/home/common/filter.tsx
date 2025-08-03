import { Form, Input, Button } from "antd";

function Filter({
  filter,
  setFilter,
  onFilter,
}: {
  filter: any;
  setFilter: any;
  onFilter(filter: any): void;
}) {
  return (
    <Form layout="vertical" className="grid grid-cols-3 gap-5 items-end">
      <Form.Item label="Event Name">
        <Input
          value={filter.searchText}
          onChange={(e) => setFilter({ ...filter, searchText: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Date">
        <Input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
      </Form.Item>

      <div className="flex gap-5">
        <Button
          onClick={() => {
            setFilter({ searchText: "", date: "" });
            onFilter({ searchText: "", date: "" });
          }}
        >
          Clear Filter
        </Button>
        <Button
          type="primary"
          disabled={!filter.searchText && !filter.date}
          onClick={() => onFilter(filter)}
        >
          Apply Filter
        </Button>
      </div>
    </Form>
  );
}

export default Filter;
