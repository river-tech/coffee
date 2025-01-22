import Header from "@/components/ui/Header";
import { IMenu } from "@/lib/models/drink";
import React from "react";

const Menu = ({menu}:{
  menu : IMenu[]
}) => {

  return (
    <div className="w-full h-fit-content pb-6 flex flex-col items-center bg-[#e2dfd9]">
     <Header>Menu</Header>
      <div className="flex flex-wrap justify-center gap-6 ">
        {menu.map((item, index) => (
          <div key={index} className="flex items-center gap-3 rounded-[95%_4%_97%_5%_/_4%_94%_3%_95%] border-[#444] hover:rounded-[4%_95%_6%_95%_/_95%_4%_92%_5%] hover:border-dashed">
            {item.img ? (
              <img
                src={item.img}
                width={200}
                height={200}
                alt={item.name}
                className="w-96 h-96 object-cover rounded-[4%_95%_6%_95%_/_95%_4%_92%_5%]"
              />
            ) : (
                <div className="p-5 font-bold text-2xl">
                    no Image
                </div>
            )}
            <div className=" text-[#444433] w-[448px] h-[210px] gap-6 p-8 border-2 flex flex-col justify-between">
              <h2 className="text-4xl font-bold">{item.name}</h2>
              <p className="text-xl">{item.description} </p>
              <p className="text-2xl font-bold">{item.price}.000đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
