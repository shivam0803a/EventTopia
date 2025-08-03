import { Button, Form, Input, Select } from "antd";

function AdminReportsFilters({
  filters,
  setFilters,
  events = [],
  onFilters,
}: {
  filters: any;
  setFilters: any;
  events?: any[];
  onFilters?: any;
}) {
  let disableFilterBtn = false;
  if (filters.startDate && !filters.endDate) {
    disableFilterBtn = true;
  }

  if (!filters.startDate && filters.endDate) {
    disableFilterBtn = true;
  }

  return (
    <Form
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end"
      layout="vertical"
    >
      <Form.Item label="Event">
        <Select
          value={filters.eventsId}
          onChange={(value) => setFilters({ ...filters, eventId: value })}
        >
          <Select.Option value="">All</Select.Option>
          {events.map((event: any) => (
            <Select.Option key={event._id} value={event.id}>
              {event.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Start Date">
        <Input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="End Date">
        <Input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </Form.Item>

      <div className="flex gap-5">
        <Button>Clear Filter</Button>
        <Button type="primary" disabled={disableFilterBtn} onClick={onFilters}>
          Fetch Reports
        </Button>
      </div>
    </Form>
  );
}

export default AdminReportsFilters;
