// export const proxy = "http://localhost:5000/api/v1";
export const proxy = "https://reachmeapps.herokuapp.com/api/v1";

export const ErrorNotification = {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const SuccessNotification = {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const InfoNotification = {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const onImageChange = (e) => {
  const file = e.target.files[0];
  const Reader = new FileReader();
  Reader.readAsDataURL(file);
  Reader.onload = () => {
    if (Reader.readyState === 2) {
      return Reader.result;
    }
  };
};
