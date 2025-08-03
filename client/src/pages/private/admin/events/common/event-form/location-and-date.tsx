import { EventFormStepProps } from ".";
import { Form, Input, Button } from "antd";
function LocationAndDate({
  eventData,
  setEventData,
  currentStep,
  setCurrentStep,
}: EventFormStepProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Form.Item label="Address" required>
        <Input
          placeholder="Address"
          value={eventData.address}
          onChange={(e) =>
            setEventData({ ...eventData, address: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="City" required>
        <Input
          placeholder="City"
          value={eventData.city}
          onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Pincode" required>
        <Input
          placeholder="Pincode"
          value={eventData.pincode}
          onChange={(e) =>
            setEventData({ ...eventData, pincode: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Date" required>
        <Input
          placeholder="Date"
          value={eventData.date}
          type="date"
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
        />
      </Form.Item>

      <Form.Item label="Time" required>
        <Input
          placeholder="Time"
          value={eventData.time}
          type="time"
          onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
        />
      </Form.Item>

      <div className="flex justify-between col-span-3">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={
            !eventData.address ||
            !eventData.city ||
            !eventData.pincode ||
            !eventData.date ||
            !eventData.time
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LocationAndDate;
