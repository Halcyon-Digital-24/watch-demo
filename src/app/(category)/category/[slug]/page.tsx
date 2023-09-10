'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import FilterBox from '@/components/filterbox';
import Link from 'next/link';
import { RiArrowDropRightLine } from 'react-icons/ri';
import ReactSlider from 'react-slider';
import './page.scss';
import Image from 'next/image';
import { AiOutlineBars } from 'react-icons/ai';
import { PiDotsNineBold } from 'react-icons/pi';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import ActionButton from '@/components/action';
import { productsData } from '@/static/products';
const ProductCard = dynamic(() => import('@/components/card'));

function Category() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [page, setPage] = useState(1);
  const [isRow, setIsRow] = useState<boolean>(true);
  const [showItem, setShowItem] = useState<number>(12);
  const [showTitle, setShowTitle] = useState<string>('Show');
  const [filter, setFilter] = useState<string>('Sort by');
  const [filterTitle, setFilterTitle] = useState<string>('Sort by');

  const handleShow = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const clickedElement = event.target as HTMLLIElement;
    const innerText = clickedElement.innerText;
    setShowTitle(`Show ${innerText}`);
  };

  const handleFilter = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const clickedElement = event.target as HTMLLIElement;
    const innerText = clickedElement.innerText;
    setFilterTitle(innerText);
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const decrementPage = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const handlePriceChange = (newValue: [number, number]) => {
    setPriceRange(newValue);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice) && newPrice < priceRange[1]) {
      setPriceRange([newPrice, priceRange[1]]);
    }
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPriceRange([priceRange[0], newPrice]);
    }
  };

  return (
    <main>
      <section>
        <div className="container">
          <div className="flex items-center font-gotham font-normal text-sm mt-3 mb-3">
            <Link href={'/'}>Home</Link>
            <RiArrowDropRightLine className=" text-xl" />
            <Link href={'/bathware'}> Home Appliance </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-2">
              <FilterBox title="Category">
                <ul>
                  <li>
                    <Link
                      className=" font-gotham font-normal text-sm"
                      href={'/category/gas-stove'}
                    >
                      Gas Stove
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" font-gotham font-normal text-sm"
                      href={'/category/kitchen-hod'}
                    >
                      Kitchen Hood
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" font-gotham font-normal text-sm"
                      href={'/category/cookware'}
                    >
                      Cookware
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" font-gotham font-normal text-sm"
                      href={'/category/digital-scale'}
                    >
                      Digital Scale
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" font-gotham font-normal text-sm"
                      href={'/category/gas-stove'}
                    >
                      Kitchen Appliance
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" font-gotham font-normal text-sm"
                      href={'/category/gas-stove'}
                    >
                      Cooker
                    </Link>
                  </li>
                </ul>
              </FilterBox>
              <FilterBox title="Availability">
                <div className="flex mb-2">
                  <input type="checkbox" name="stock" id="stock" />
                  <label
                    className="ml-2 font-gotham font-normal text-sm"
                    htmlFor="stock"
                  >
                    In Stock
                  </label>
                </div>
                <div className="flex mb-2">
                  <input type="checkbox" name="stock-out" id="stockout" />
                  <label
                    className="ml-2 font-gotham font-normal text-sm"
                    htmlFor="stockout"
                  >
                    Out of Stock
                  </label>
                </div>
                <div className="flex">
                  <input type="checkbox" name="instock" id="upcoming" />
                  <label
                    className="ml-2 font-gotham font-normal text-sm"
                    htmlFor="upcoming"
                  >
                    Up Coming
                  </label>
                </div>
              </FilterBox>
              <FilterBox title="Price">
                <div className="double-slider-container">
                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    value={priceRange}
                    min={0}
                    max={50000}
                    step={1} // Adjust step size as needed
                    minDistance={500}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="flex w-full justify-between mt-2">
                  <input
                    className="price-input font-gotham font-medium text-xs"
                    type="number"
                    value={priceRange[0]}
                    onChange={handleMinPrice}
                  />
                  <input
                    className="price-input font-gotham font-medium text-xs"
                    type="number"
                    value={priceRange[1]}
                    onChange={handleMaxPrice}
                  />
                </div>
              </FilterBox>
            </div>
            <div className="col-span-8">
              <div className="category-banner mb-5">
                <Image
                  className="w-full"
                  src={'/assets/images/banner/categorybanner.png'}
                  width={400}
                  height={300}
                  alt="gazi category-banner"
                />
              </div>
              <div className="flex justify-between items-center filter-bar py-2 px-5 mb-5">
                <div className=" flex items-center">
                  <span
                    className={`${isRow ? 'active' : null} p-1 mr-2 `}
                    onClick={() => setIsRow(true)}
                  >
                    <PiDotsNineBold className="text-xl icon" />
                  </span>
                  <span
                    className={`${!isRow ? 'active' : null} p-1 `}
                    onClick={() => setIsRow(false)}
                  >
                    <AiOutlineBars className="text-xl icon" />
                  </span>
                </div>
                <div className="action flex items-center">
                  <div>
                    <ActionButton title={filterTitle}>
                      <ul>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleFilter}
                        >
                          Newest
                        </li>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleFilter}
                        >
                          Oldest
                        </li>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleFilter}
                        >
                          Price low to high
                        </li>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleFilter}
                        >
                          Price high to low
                        </li>
                      </ul>
                    </ActionButton>
                  </div>

                  <div className="ml-2">
                    <ActionButton title={showTitle}>
                      <ul>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleShow}
                        >
                          12
                        </li>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleShow}
                        >
                          16
                        </li>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleShow}
                        >
                          20
                        </li>
                        <li
                          className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                          onClick={handleShow}
                        >
                          24
                        </li>
                      </ul>
                    </ActionButton>
                  </div>
                  <div className="flex items-center ml-2">
                    <div
                      className=" cursor-pointer p-1"
                      onClick={decrementPage}
                    >
                      <IoMdArrowDropleft />
                    </div>
                    <div className=" font-gotham font-normal text-xs flex items-center">
                      <div className="active w-5 h-5 flex items-center justify-center ">
                        {page}
                      </div>
                      <p>of 2</p>
                    </div>
                    <div
                      className=" cursor-pointer p-1"
                      onClick={incrementPage}
                    >
                      <IoMdArrowDropright />
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-products">
                <div className="grid grid-cols-4 gap-6 mb-5">
                  {[...productsData].slice(0, 12).map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 bottom-filter">
                <div>
                  <ActionButton title={showTitle}>
                    <ul>
                      <li
                        className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                        onClick={handleShow}
                      >
                        12
                      </li>
                      <li
                        className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                        onClick={handleShow}
                      >
                        16
                      </li>
                      <li
                        className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                        onClick={handleShow}
                      >
                        20
                      </li>
                      <li
                        className="py-1 cursor-pointer action-item px-1 font-gotham text-xs font-normal"
                        onClick={handleShow}
                      >
                        24
                      </li>
                    </ul>
                  </ActionButton>
                </div>

                <div className="flex items-center">
                  <div className=" cursor-pointer p-1" onClick={decrementPage}>
                    <IoMdArrowDropleft />
                  </div>
                  <div className=" font-gotham font-normal text-xs flex items-center">
                    <div className="active w-5 h-5 flex items-center justify-center ">
                      {page}
                    </div>
                    <p>of 2</p>
                  </div>
                  <div className=" cursor-pointer p-1" onClick={incrementPage}>
                    <IoMdArrowDropright />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Category;
