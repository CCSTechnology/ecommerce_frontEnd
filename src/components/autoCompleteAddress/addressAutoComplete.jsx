import React from "react";
import Autocomplete from "react-google-autocomplete";

export default function AddressAutoComplete(props) {
  const { address, onChange, defaultValue, disabled, error } = props;

  return (
    <div>
      <Autocomplete
        defaultValue={defaultValue}
        className="mantine-input-style-copy"
        options={{
          types: ["address"],
          componentRestrictions: { country: "ca" },
        }}
        apiKey={import.meta.env.REACT_APP_API_MAP_ENDPOINT}
        onPlaceSelected={onChange}
        disabled={disabled}
      />
    </div>
  );
}
