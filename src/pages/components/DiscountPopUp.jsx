import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const DiscountPopUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const popUpShown = useRef(false);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products`);
      return res.data;
    },
  });

  const discountProducts = products.filter(p => p.discount > 0);

  const getRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * discountProducts.length);
    return discountProducts[randomIndex];
  };

  useEffect(() => {
    if (popUpShown.current) return;
    // Wait until products are loaded
    if (discountProducts.length === 0) return;
    popUpShown.current = true;
    const firstProduct = getRandomProduct();

    //FIRST POPUP — Center of the screen
    Swal.fire({
      position: 'center',
      title: `${firstProduct.discount}% discount on`,
      text: firstProduct.name,
      imageUrl: firstProduct.photos,
      imageWidth: 100,
      imageHeight: 80,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      timer: 3000,
      scrollbarPadding: false,
      customClass: {
        popup: 'discount-popup',
      },
      didOpen: popup => {
        popup.addEventListener('click', () => {
          navigate(`/discount-products`);
        });
      },
    });

    //Function for repeated toast popups
    const showPopup = () => {
      const randomProduct = getRandomProduct();
      Swal.fire({
        toast: true,
        position: 'bottom-end', // bottom-right corner
        title: `${randomProduct.discount}% discount on`,
        text: randomProduct.name,
        imageUrl: randomProduct.photos,
        imageWidth: 80,
        imageHeight: 50,
        imageAlt: 'Custom image',
        showConfirmButton: false,
        scrollbarPadding: false,
        timer: 4000,
        customClass: {
          popup: 'my-swal-height',
        },
        didOpen: toast => {
          toast.addEventListener('click', () => {
            navigate(`/discount-products`);
          });
        },
      });
    };

    // repeat every 10 seconds
    const interval = setInterval(showPopup, 10000);

    return () => clearInterval(interval);
  }, [discountProducts, navigate]);
  return null;
};

export default DiscountPopUp;
