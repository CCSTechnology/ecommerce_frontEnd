import { Box, TextField, Typography } from "@mui/material";
import AddressAutoComplete from "components/autoCompleteAddress/addressAutoComplete";
import Autocomplete from "react-google-autocomplete";
import React, { useState } from "react";
import { AddressFormater } from "helpers/globalFunctions";

const AdressField = React.forwardRef((props, ref) => {
	const { Controller, control, name, required, disabled, error, onChange, setValue, label } = props;

	return (
		<Box
			sx={{
				width: "100%",
			}}
		>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>{label}</Typography>
						<Autocomplete
							defaultValue={field.value}
							className="form-control"
							options={{
								types: ["address"],
								componentRestrictions: { country: "aus" },
							}}
							apiKey={import.meta.env.REACT_APP_GOOGLE_AUTOCOMPLETE_KEY}
							onPlaceSelected={(e) => {
								field.onChange(e.formatted_address);
								const formatted_address = AddressFormater(e);
								setValue("latitude", formatted_address.latitude);
								setValue("longitude", formatted_address.longitude);
								setValue("city", formatted_address.city);
							}}
						/>
						<span>{error}</span>
					</>
				)}
			/>
			<Controller
				name={"city"}
				control={control}
				render={({ field }) => (
					<Box
						sx={{
							display: "none",
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>City</Typography>
						<TextField {...field} size="small" value={String(field.value)} />
					</Box>
				)}
			/>
			<Controller
				name={"latitude"}
				control={control}
				render={({ field }) => (
					<Box
						sx={{
							display: "none",
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Latitude</Typography>
						<TextField {...field} size="small" value={field.value} />
					</Box>
				)}
			/>
			<Controller
				name={"longitude"}
				control={control}
				render={({ field }) => (
					<Box
						sx={{
							display: "none",
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Latitude</Typography>
						<TextField {...field} size="small" value={field.value} />
					</Box>
				)}
			/>
		</Box>
	);
});

export default AdressField;
