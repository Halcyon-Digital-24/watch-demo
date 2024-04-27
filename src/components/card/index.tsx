"use client";
import { API_ROOT } from "@/constant";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToCompare } from "@/redux/features/compare/compareSlice";
import { addToWishList } from "@/redux/features/wish-list/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ICartItem } from "@/types/cart";
import { ICompareItem } from "@/types/compare";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../button";
import FormatPrice from "../price-formate";
import "./index.scss";

interface IProps {
  product_id: number;
  image: string;
  title: string;
  regular_price: string | number;
  discount_price: string | number;
  sort_description: string;
  url: string;
  isNew?: boolean;
  availability: any;
  quantity: number;
  productAttribute?: any[];
  camping_start_date?: string;
  camping_end_date?: string;
}
const ProductCard: React.FC<IProps> = ({
  image,
  title,
  regular_price,
  discount_price,
  productAttribute,
  url,
  isNew,
  product_id,
  sort_description,
  availability,
  quantity,
  camping_end_date,
  camping_start_date,
}) => {
  const { login } = useAppSelector((state) => state.login);
  const { data: compareItems } = useAppSelector((state) => state.compare);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isCampaign =
    camping_start_date &&
    camping_end_date &&
    new Date(camping_start_date).getTime() <= Date.now() &&
    new Date(camping_end_date).getTime() >= Date.now();

  const handleBuyNow = (data: ICartItem) => {
    dispatch(addToCart(data));
    router.push("/cart");
  };

  const addCompare = (data: ICompareItem) => {
    if (compareItems.length < 4) {
      dispatch(addToCompare(data));
    } else {
      toast.error(
        "You already have added 4 products in your compare list. Please remove one of them from compare page to add a new one."
      );
    }
  };

  const addWishList = async () => {
    if (login?.accessToken && login?.user?.id) {
      try {
        const response = await axiosInstance.post(
          `/wishlists`,
          {
            product_id,
            user_id: login?.user?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${login?.accessToken}`,
            },
          }
        );
        if (response.status == 201) {
          dispatch(
            addToWishList({
              product_id: response.data.data.product_id,
              user_id: response.data.data.user_id,
            })
          );
        } else {
          console.log("Status : ", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="product-card group relative p-3  mt-2">
      <Link href={`/product/${url}`}>
        <div className="flex justify-center items-center pt-10  image">
          <Image
            className="mb-5"
            src={`${API_ROOT}/images/product/${image}`}
            width={220}
            height={210}
            quality={100}
            alt="product"
          />
        </div>
      </Link>

      <div className="text ">
        <div className=" md:h-11 h-14 leading-3 text-center mb-1">
          <Link
            href={`/product/${url}`}
            className=" font-gotham product-title font-normal text-center text-sm"
          >
            {title?.slice(0, 44)}
          </Link>
        </div>
        <p className=" mb-6 text-center text-sm h-5">
          {Number(regular_price) && (
            <span
              className={`mr-3 font-gotham ${
                Number(discount_price) > 0
                  ? "line-through font-normal "
                  : "font-bold"
              } text-sm`}
            >
              ৳ {FormatPrice(regular_price)}
            </span>
          )}

          {Number(discount_price) > 0 && (
            <span className=" font-gotham font-bold text-sm">
              ৳ {FormatPrice(discount_price)}
            </span>
          )}
        </p>
        <div className="flex justify-center">
          {availability === 1 && (
            <>
              {quantity > 0 ? (
                <>
                  {productAttribute && productAttribute.length > 0 ? (
                    <>
                      <Link href={`/product/${url}`}>
                        <Button className="font-gotham font-medium py-2 text-xs w-[102px] ">
                          View
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              product_id: product_id,
                              price: Number(
                                Number(discount_price) > 0
                                  ? discount_price
                                  : regular_price
                              ),
                              title: title,
                              image: image,
                              quantity: 1,
                              regular_price: Number(regular_price),
                            })
                          )
                        }
                        className="font-gotham font-medium py-2 text-xs mr-2 w-[102px]"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() =>
                          handleBuyNow({
                            product_id,
                            price: Number(
                              Number(discount_price) > 0
                                ? discount_price
                                : regular_price
                            ),
                            title: title,
                            image: image,
                            quantity: 1,
                            regular_price: Number(regular_price),
                          })
                        }
                        className="font-gotham font-medium py-2 text-xs  w-[102px]"
                      >
                        Buy Now
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Button className="font-gotham font-medium py-2 text-xs w-[102px] stock-out">
                  Out of Stock
                </Button>
              )}
            </>
          )}
          {availability === 2 ? (
            <Button className="font-gotham font-medium py-2 text-xs  w-[102px] stock-out">
              Out of Stock
            </Button>
          ) : null}
          {availability === 3 && (
            <Button className="font-gotham font-medium py-2 text-xs w-[102px]">
              Up Coming
            </Button>
          )}
        </div>
      </div>
      <div className=" absolute top-2 left-2">
        {((Number(regular_price) - Number(discount_price)) /
          Number(regular_price)) *
          100 !==
          0 && discount_price !== 0 ? (
          <span className=" sudo inline-block discount font-gotham text-xs font-bold  px-2 py-1  rounded primary-text">
            {(
              ((Number(regular_price) - Number(discount_price)) /
                Number(regular_price)) *
              100
            ).toFixed(2)}
            %
          </span>
        ) : null}
        {isNew ? (
          <span className=" sudo inline-block new font-gotham text-xs font-bold  px-2 py-1  rounded primary-text">
            New
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className=" absolute  feature top-2 right-2">
        <div className="mb-1 cursor-pointer action-item" onClick={addWishList}>
          <AiOutlineHeart className=" primary-hover" />
        </div>
        <div
          className="mb-1 cursor-pointer action-item"
          onClick={() =>
            addCompare({
              product_id,
              description: sort_description ?? "",
              image,
              title,
              regular_price: Number(regular_price),
              price: isCampaign
                ? Number(discount_price)
                : Number(regular_price),
              quantity: 1,
              rating: 5,
              availability: availability,
            })
          }
        >
          <BsArrowRepeat className=" primary-hover" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
