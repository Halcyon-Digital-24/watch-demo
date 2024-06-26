import { API_URL } from "@/constant";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../button";
import FormatPrice from "../price-formate";
import TextAreaGroup from "../textarea";
import "./index.scss";

type IProps = {
  item: any;
};
const SingleOrderDetails: React.FC<IProps> = ({ item }) => {
  const { login } = useAppSelector((state) => state.login);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [attributes, setAttributes] = useState<any[]>([]);

  const handleSetMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const data = {
    customer_id: login?.user.id,
    order_id: item.order_id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_price: item.discount_price ?? item.regular_price,
    refund_status: "pending",
    message,
  };

  const handleRefunds = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/refunds`, data, {
        headers: {
          Authorization: `Bearer ${login?.accessToken}`,
        },
      });
      if (response?.status === 201) {
        toast.success(response.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (item?.product_attribute !== "") {
        setAttributes(JSON.parse(item?.product_attribute));
      }
    } catch (err) {
      console.log(err);
      setAttributes([]);
    }
  }, [item?.product_attribute]);

  return (
    <>
      <tr className=" font-normal font-gotham text-sm table-border p-2">
        <td className="px-6 py-4">{item?.product_name}</td>
        <td className="px-6 py-4">{item?.quantity}</td>
        <td className="px-6 py-4">
          {attributes?.length > 0 ? (
            attributes?.map((attr, index) => (
              <div
                className=" capitalize"
                key={index}
              >{`${attr?.attribute_key.replace("_", " ")} : ${
                attr?.attribute_name
              }`}</div>
            ))
          ) : (
            <></>
          )}
        </td>
        <td className="px-4 py-4">
          ৳{" "}
          {item?.discount_price
            ? FormatPrice(item?.discount_price)
            : FormatPrice(item?.regular_price)}
        </td>
        <td className="px-6 py-4">
          {isOpen ? (
            <form onSubmit={handleRefunds} className="refund-area">
              <TextAreaGroup
                title="Message"
                onChange={handleSetMessage}
                required
              />
              <Button type="submit" className="px-3 py-1">
                Apply Now
              </Button>
            </form>
          ) : (
            <Button onClick={() => setIsOpen(true)} className="px-3 py-1">
              Apply Now
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};

export default SingleOrderDetails;
