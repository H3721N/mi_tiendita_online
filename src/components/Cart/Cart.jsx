import { FaCartPlus } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import {useId} from "react";

export function Cart () {
    const cartCheckboxId = useId()
    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <FaCartPlus />
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden/>

            <aside className='cart'>
                <ul>
                    <li>
                        <img src='https://via.placeholder.com/150' alt='product'/>
                        <div>
                            <h3>Product name</h3>
                            <p>$100.00</p>
                        </div>
                        <footer>
                            Qty: 1
                        </footer>
                    </li>
                </ul>
                <button>
                    {

                        <BsCartXFill/>}
                </button>
            </aside>
        </>
    );
}