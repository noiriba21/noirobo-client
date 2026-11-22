import Swal from "sweetalert2";

const base = Swal.mixin({
  background: "#12161c",
  color: "#ece9e4",
  confirmButtonColor: "#ff6a1a",
});

export const toast = (icon, title) =>
  base.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 2600,
  });

export const alertBox = (icon, title, text) => base.fire({ icon, title, text });

export const confirmBox = async (title, text) =>
  (
    await base.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it",
    })
  ).isConfirmed;