
// import { Link } from 'react-router-dom'
import React from 'react';

const Card = () => {
    return (    <
        // href={`/products/${handle}`}
        // passHref
      >
        <a className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
          <div className="h-72 border-b-2 border-palette-lighter relative">
            {/* <Image
            //   src={imageNode.originalSrc}
            //   alt={imageNode.altText}
              layout="fill"
              className="transform duration-500 ease-in-out hover:scale-110"
            /> */}
          </div>
          <div className="h-48 relative">
            <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
              {/* {title} */}
              <p>TITLE</p>
            </div>
            <div className="text-lg text-gray-600 p-4 font-primary font-light">
              {/* {description}
               */}
               <p>description</p>
            </div>
            <div
              className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
              rounded-tl-sm triangle"
            >
              {/* <Price
                currency="$"
                num={price}
                numSize="text-lg"
              /> */}
              <p>Price</p>
            </div>
          </div>
        </a>
      </>);
}
 
export default Card;