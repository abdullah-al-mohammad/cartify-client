import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const DiscountPopUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: 'products',
    queryFn: async () => {
      const res = await axiosPublic.get(`/products`);
      return res.data;
    },
  });

  const discountProducts = products.filter(p => p.discount > 0);

  const getRandomProduct = () => {
    const randonIndex = Math.floor(Math.random() * discountProducts.length);
    return discountProducts[randonIndex];
  };

  useEffect(() => {
    // Wait until products are loaded
    if (discountProducts.length === 0) return;

    const firstProduct = getRandomProduct();
    console.log(firstProduct._id);

    //FIRST POPUP — Center of the screen
    Swal.fire({
      title: `${firstProduct.discount}% discount on`,
      text: firstProduct.name,
      imageUrl: firstProduct.photos,
      imageWidth: 100,
      imageHeight: 80,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      timer: 3000,
      didOpen: popup => {
        popup.addEventListener('click', id => {
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
