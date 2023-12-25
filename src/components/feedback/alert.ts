import Swal from "sweetalert2";
export type iconType = "error" | "success"|"warning" ;
export function showAlert(title:string,text:string ,icon:iconType,color:string) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,

      confirmButtonText: "OK",
      confirmButtonColor:color
    });
  }