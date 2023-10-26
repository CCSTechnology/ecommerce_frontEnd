import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Grid, TextField, TextareaAutosize, Select, InputLabel, FormControl, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio, Typography} from '@mui/material';
import dayjs from "dayjs";
import { Controller } from "react-hook-form";



export function SortableItem(props) {

    const { register, remove, control, type, fieldData, index, setDragFields, fields} = props
    console.log(fieldData, "field data")
    console.log(fields[index].id, "fields")

 
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor:'grab',       
    };
        
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>  
            <Grid 
                container 
                key={0} 
                style={{ marginBottom: '30px' }}
                > 
                
                {
                    type === "input-type" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        <Grid items xs={11}>
                                <TextField
                                    {...register(`dynamicFields[${index}].value`)}
                                    required={fieldData?.checkbox ? true : false}
                                    id={`textfield-${index}`}
                                    label={fieldData?.textbox}
                                    // defaultValue={fields[0].value}
                                    type={fieldData?.fieldtype}
                                    // helperText="Some important text"
                                    // variant="standard"
                                    fullWidth
                                />
                            </Grid>
                            <Grid items xs={1}>
                                <DeleteForeverIcon onClick={() => {
                                  remove(index)
                                }} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'15px' }} />
                            </Grid>											
                        </Grid>	

                    ) : type === "text-area" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        <Grid items xs={11}>                                
                                    <TextareaAutosize
                                        {...register(`dynamicFields[${index}].value`)}
                                        required={fieldData?.checkbox ? true : false}
                                        id={`textautosize-${index}`}
                                        label={fieldData?.textarea}
                                        size="medium"
                                        maxRows={fieldData?.maxrow}
                                        minRows={fieldData?.minrow}
                                        // defaultValue={field.value}
                                        // helperText="Some important text"
                                        // variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid items xs={1}>
                                    <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'3px' }} />
                                </Grid>											
                            </Grid>	
                    ) : type === "select" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        <Grid items xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel id={`select-label-${index}`}>{fieldData?.select}</InputLabel>
                                    <Select
                                        {...register(`dynamicFields[${index}].value`)}
                                        labelId={`select-label-${index}`}
                                        id={fields[index]?.id}
                                        defaultValue={fields[index]?.value || ""}
                                        >
                                        {
                                            !fieldData?.menukey ? (
                                                fieldData?.menuitems.map((option) => (
                                                <MenuItem value={option} key={option}>
                                                    {option}
                                                </MenuItem>
                                                ))
                                            ) : null
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid items xs={1}>
                                <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'15px' }} />
                            </Grid>											
                        </Grid>	
                    )
                    // )  : type === "number" ? (
                    //     <>
                    //         <Grid>
                    //             <TextField
                    //                 {...register(`dynamicFields[${index}].value`)}
                    //                 id="standard-helperText"
                    //                 type="number"
                    //                 label="Number Text"
                    //                 // defaultValue={field.value}
                    //                 // helperText="Some important text"
                    //                 // variant="standard"
                    //                 fullWidth
                    //             />
                    //         </Grid>
                    //         <Grid>
                    //             <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'15px' }} />
                    //         </Grid>														
                    //     </>	
                    // ) 
                    : type === "date" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                            <Grid items xs={11}>
                                <TextField
                                        {...register(`dynamicFields[${index}].value`)}
                                        required={fieldData?.checkbox ? true : false}
                                        id="standard-helperText"
                                        type="date"
                                        label={fieldData?.date}
                                        defaultValue={dayjs().format("YYYY-MM-DD")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // helperText="Some important text"
                                        // variant="standard"
                                        fullWidth
                                    />
                            </Grid>
                            <Grid items xs={1}>
                                <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'15px' }} />
                            </Grid>														
                        </Grid>
                    ) : type === "check-box" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        <Grid items xs={11}> 
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        {...register(`dynamicFields[${index}].checked`)}
                                        // checked={field.checked}
                                        color="primary"
                                    />
                                    }
                                    label={fieldData?.checkbox}
                                />
                            </Grid>
                            <Grid items xs={1}>
                                <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'8px' }} />
                            </Grid>														
                        </Grid>
                    ) : type === "radio-box" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                            <Grid items xs={11}>
                                <Controller
                                    control={control}
                                    name={`dynamicFields[${index}].value`}
                                    defaultValue=""
                                    // render={({ field }) => (
                                    // <RadioGroup {...field}>
                                    
                                        render={<RadioGroup>
                                        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                                        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                                        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                                    </RadioGroup>
                                        }
        
                                />
                            </Grid>
                            <Grid items xs={1}>
                                <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'8px' }} />
                            </Grid>														
                        </Grid>
                    ) : type === "file-upload" ? (
                        <Grid container sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                            <Grid items xs={11}>
                            {/* <Typography variant="h6">
                                Image Upload
                            </Typography> */}
                                {/* <input
                                accept="image/*"
                                id="file-upload"
                                multiple
                                type="file"
                                // onChange={handleFileUpload}
                                /> */}
                                 <TextField
                                    {...register(`dynamicFields[${index}].value`)}
                                    id="standard-helperText"
                                    type="file"
                                    label={fieldData?.fileupload}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    // helperText="Some important text"
                                    // variant="standard"
                                    fullWidth
                                />
                            </Grid>
                            <Grid items xs={1}>
                                <DeleteForeverIcon onClick={() => remove(index)} style={{ cursor: 'pointer', marginLeft: '10px', paddingTop:'15px' }} />
                            </Grid>														
                        </Grid>	
                    ) : null
                }

            </Grid>
        </div>
    )
}