import { toast } from "react-toastify";

export function errorAlert(msg) {
	if (typeof msg === "object") {
		for (const key in msg) {
			// if (Object.prototype.hasOwnProperty.call(errors, key)) {
			const errorMsg = msg[key];
			if (Array.isArray(errorMsg)) {
				toast.error(errorMsg[0]);
			} else {
				toast.error(errorMsg);
			}
			// break;
			// }
		}
		// const code = msg.status;
		// if (code === 400 || code === 404) {
		// 	if (msg.data?.error) {
		// 		msg = msg.data.error;
		// 	} else {
		// 		msg = msg.data.message;
		// 	}
		// } else if (msg?.success === false) {
		// 	if (msg?.error) {
		// 		msg = msg.error;
		// 	} else {
		// 		msg = msg.message;
		// 	}
		// }

		// if (Array.isArray(msg)) {
		// 	msg.forEach((e) => {
		// 		toast.error(e);
		// 	});
		// } else if (typeof msg === "object") {
		// 	Object.keys(msg).forEach((key) => {
		// 		toast.error(msg[key]);
		// 	});
		// } else if (typeof msg === "string") {
		// 	toast.error(msg);
		// 	if (code === 404) {
		// 		setTimeout(() => {
		// 			window.location.href = "/404";
		// 		}, 500);
		// 	}
		// } else {
		// 	toast.error("Something went wrong");
		// }
	} else {
		toast.error(msg);
	}
}

export function successAlert(msg) {
	toast.success(msg);
}
export function warning(msg) {
	toast.info(msg);
}

export function AddressFormater(place, type) {
	let country,
		state,
		city,
		line1,
		route,
		longitude,
		latitude,
		zipcode = null;
	if (place?.address_components !== undefined) {
		let addrComp = place.address_components;
		for (let i = 0; i < addrComp.length; ++i) {
			var typ = addrComp[i].types;
			if (compIsType(typ, "administrative_area_level_1")) state = addrComp[i].long_name; //store the state
			else if (compIsType(typ, "locality")) city = addrComp[i].long_name; //store the city
			else if (compIsType(typ, "route")) route = addrComp[i].long_name; //store the street
			else if (compIsType(typ, "street_number")) line1 = addrComp[i].long_name; //store the street number
			else if (compIsType(typ, "country")) country = addrComp[i].long_name; //store the country
			else if (compIsType(typ, "postal_code")) zipcode = addrComp[i].long_name; //store the postal_code
			else if (compIsType(typ, "latitude")) latitude = addrComp[i].long_name; //store the postal_code
			else if (compIsType(typ, "longitude")) longitude = addrComp[i].long_name; //store the postal_code
			//we can break early if we find all three data
			if (
				state != null &&
				city != null &&
				country != null &&
				zipcode != null &&
				line1 != null &&
				longitude != null &&
				latitude != null &&
				route != null
			)
				break;
		}
		return {
			address: place.formatted_address,
			country: country,
			// state: state,
			city: city ?? "",
			// zipcode: zipcode,
			// type: type,
			// is_default: 1,
			// line1: line1,
			// street_name: route,
			latitude: place.geometry["location"].lat(),
			longitude: place.geometry["location"].lng(),
		};
	}
}

export function compIsType(t, s) {
	for (let z = 0; z < t.length; ++z) if (t[z] == s) return true;
	return false;
}
