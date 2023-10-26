import * as React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, useForm } from "react-hook-form";
import { FormInputText } from "./TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MuiRadioGroup from "./MuiRadioGroup";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const schema = Yup.object().shape({
	name: Yup.array().required("Error"),
});

export default function MuiSelectField({ option = [], id = "", renderOption = () => {} }) {
	const onSubmit = (values) => {
		try {
			console.log(values, "asdsaa");
		} catch (error) {
			console.log(error, "sdasdada");
		}
	};
	const {
		control,
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
		defaultValues: {
			name: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Autocomplete
				className="select"
				multiple
				limitTags={2}
				{...register("name")}
				options={top100Films}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option.title}
					</li>
				)}
				getOptionLabel={(option) => option.title}
				defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
				renderInput={(params) => <TextField size="small" {...params} error={!!errors?.name} helperText={errors?.name?.message} />}
			/>
			<MuiRadioGroup
				radios={[
					{
						value: "daily",
						label: "Daily",
					},
					{
						value: "weekly",
						label: "Weekly",
					},
					{
						value: "bi-weekly",
						label: "Bi-weekly",
					},
					{
						value: "monthly",
						label: "Monthly",
					},
				]}
			/>

			<button type="submit">Sunmm0</button>
		</form>
	);
}

/// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: "The Shawshank Redemption", year: 1994 },
	{ title: "The Godfather", year: 1972 },
	{ title: "The Godfather: Part II", year: 1974 },
	{ title: "The Dark Knight", year: 2008 },
	{ title: "12 Angry Men", year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: "Pulp Fiction", year: 1994 },
	{
		title: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
	{ title: "The Good, the Bad and the Ugly", year: 1966 },
	{ title: "Fight Club", year: 1999 },
	{
		title: "The Lord of the Rings: The Fellowship of the Ring",
		year: 2001,
	},
	{
		title: "Star Wars: Episode V - The Empire Strikes Back",
		year: 1980,
	},
	{ title: "Forrest Gump", year: 1994 },
	{ title: "Inception", year: 2010 },
	{
		title: "The Lord of the Rings: The Two Towers",
		year: 2002,
	},
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: "Goodfellas", year: 1990 },
	{ title: "The Matrix", year: 1999 },
	{ title: "Seven Samurai", year: 1954 },
	{
		title: "Star Wars: Episode IV - A New Hope",
		year: 1977,
	},
	{ title: "City of God", year: 2002 },
	{ title: "Se7en", year: 1995 },
	{ title: "The Silence of the Lambs", year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: "Life Is Beautiful", year: 1997 },
	{ title: "The Usual Suspects", year: 1995 },
	{ title: "Léon: The Professional", year: 1994 },
	{ title: "Spirited Away", year: 2001 },
	{ title: "Saving Private Ryan", year: 1998 },
	{ title: "Once Upon a Time in the West", year: 1968 },
	{ title: "American History X", year: 1998 },
	{ title: "Interstellar", year: 2014 },
];
