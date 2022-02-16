import React from "react";

interface Props {
  title: string;
  description: string;
}

export default function Info({ title, description }: Props) {
  return (
    <div className="my-1 text-center">
      <div className="text-gray-500 font-bold uppercase text-xs">{title}</div>
      <div className="text-black font-bold capitalize text-xs md:text-lg w-[200px]">
        {description}
      </div>
    </div>
  );
}
