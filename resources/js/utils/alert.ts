import Swal, { SweetAlertIcon } from "sweetalert2"

export const confirmDialog = (title: string, confirmButtonText: string = 'Save', denyButtonText: string = 'Dont Save') =>
{
    return Swal.fire({
        title,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText,
        denyButtonText
    });
}

export const isConfirmedAlert = (message: string, alertIcon: SweetAlertIcon) =>
{
    return Swal.fire({
        title: message,
        icon: alertIcon,
        draggable: true
    });
}