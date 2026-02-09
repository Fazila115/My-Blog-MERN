import { Flip, Slide, toast, } from 'react-toastify';

const errorToast = (err) => {
    toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
    });
};

const successToast = (succ) => {
    toast.success(succ, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
};

export {
    errorToast, successToast
}