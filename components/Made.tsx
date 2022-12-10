import React from 'react';
import Image from 'next/image';
import Next from '../public/next.svg';
import Ts from '../public/ts.svg';
import OpenAi from '../public/openAi.svg';

export default function Made() {
  return (
    <div
      className={
        'bg-black text-white w-full font-light self-center text-center text-xs flex items-center justify-center pt-5 space-x-3'
      }
    >
      <p className={'text-center text-sm'}>Made with </p>
      <Image src={Next} width={60} alt="next" />,
      <Image src={Ts} width={20} alt="next" />
      <Image src={OpenAi} width={60} alt="next" />
    </div>
  );
}
