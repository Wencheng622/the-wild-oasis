import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm } from "react-hook-form";
import { useSetting } from "./useSetting.js";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting.js";

function UpdateSettingsForm() {
  const {
    isLoading,
    setting: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    error,
  } = useSetting();
  const { isEditing, editSetting } = useEditSetting();

  if (isLoading) {
    return <Spinner />;
  }
  function handleEdit(e, filename) {
    const { value } = e.target;

    if (!value) return;
    editSetting({ [filename]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleEdit(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleEdit(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={(e) => handleEdit(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handleEdit(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
