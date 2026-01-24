import { cartList } from "@/mock/cartList";
import React from "react";

const CartComponent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      {cartList.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            /* Burada bg-blue-500 yerinə dinamik rəng gəlir */
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 text-white ${item.color}`}
          >
            {/* Üst hissə */}
            <div className="flex justify-between items-center">
              <span className="text-[15px] font-medium opacity-90">
                {item.name}
              </span>
              <Icon className="text-xl opacity-80" />
            </div>

            {/* Orta hissə */}
            <div className="mt-8">
              <h2 className="text-4xl font-bold tracking-tight">
                {item.number}
              </h2>
            </div>

            {/* Alt hissə */}
            <div className="mt-2">
              <p className="text-[13px] font-normal opacity-80">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartComponent;
