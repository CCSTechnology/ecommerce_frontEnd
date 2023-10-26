export const AddressFormater = (place, type) => {
    let country,
        province,
        city,
        line1,
        route,
        postal_code = null;
    if (place?.address_components !== undefined) {
        let addrComp = place.address_components;
        for (let i = 0; i < addrComp.length; ++i) {
            var typ = addrComp[i].types;
            if (compIsType(typ, "administrative_area_level_1"))
                province = addrComp[i].long_name; //store the province
            else if (compIsType(typ, "locality"))
                city = addrComp[i].long_name; //store the city
            else if (compIsType(typ, "route"))
                route = addrComp[i].long_name; //store the street
            else if (compIsType(typ, "street_number"))
                line1 = addrComp[i].long_name; //store the street number
            else if (compIsType(typ, "country"))
                country = addrComp[i].long_name; //store the country
            else if (compIsType(typ, "postal_code"))
                postal_code = addrComp[i].long_name; //store the postal_code
            //we can break early if we find all three data
            if (
                province != null &&
                city != null &&
                country != null &&
                postal_code != null &&
                line1 != null &&
                route != null
            )
                break;
        }
        return {

            address: place.formatted_address,
            country: country,
            province: province,
            city: city,
            postal_code: postal_code,
            // type: type,
            street: route,
            latitude: place?.geometry?.location?.lat(),
            longitude: place?.geometry?.location?.lng()
        };
    }
};
export const compIsType = (t, s) => {
    for (let z = 0; z < t.length; ++z) if (t[z] == s) return true;
    return false;
};

export const CheckYesNo = (value) => {
    if (value === true) {
        return "yes"
    }
    else {
        return "no"
    }
}