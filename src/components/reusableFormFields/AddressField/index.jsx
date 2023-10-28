import React, { useRef } from 'react';
import Autocomplete from "react-google-autocomplete";

function AutoCompleteComponent(props) {
    const { address, onChange, defaultValue, disabled, error } = props;

    return (
        <div >
            <Autocomplete
                defaultValue={''}
                className={error ? "errorBorder" : ""}
                options={{
                    types: ["address"],
                    componentRestrictions: { country: "ca" },
                }}
                apiKey={'AIzaSyBpPnB6Le56oWSrap61sQsrZY3HRtr_cQU'}
                onPlaceSelected={onChange}
                disabled={disabled}
            />

        </div>
    )
}

export default AutoCompleteComponent