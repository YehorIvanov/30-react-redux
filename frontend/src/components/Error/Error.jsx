import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectErrorMassage, clearError } from '../../redux/slices/errorSlice';
const Error = () => {
  //   toast.info(selectErrorMassage);
  const errorMassage = useSelector(selectErrorMassage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMassage) toast.info(errorMassage);
    dispatch(clearError());
  }, [errorMassage, dispatch]);

  return <ToastContainer position="top-right" autoClose={10000} />;
};

export default Error;
