export const formatMeetBE = (value:{hour:number,minute:number})=>{
    return `${value.hour < 10 ? "0" : ""}${value.hour}:${value.minute < 10 ? "0" : ""}${value.minute}:00`;
}
export const formatToFE = (string:string)=>{
    return string.substring(0,5)
}