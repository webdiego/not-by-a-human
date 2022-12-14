/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Image from 'next/image';
import Robot from '../public/robot-1.png';
import Head from 'next/head';
import Made from '../components/Made';
import Comment from '../public/comic.svg';
type Request = {
  url: string;
};

type State = 'loading' | 'error' | 'completed' | 'search';

export default function Home() {
  const [state, setState] = useState<State>('search');
  const [value, setValue] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function requestImage(request: string) {
    setState('loading');
    axios
      .post<Request>('/api/generateImage', {
        request,
      })
      .then((response) => {
        if (response.status === 200) {
          setState('completed');
          setImageUrl(response.data.url);
          setTimeout(() => setState('search'), 2000);
        }
      })
      .catch(() => {
        setState('error');
        setTimeout(() => setState('search'), 2000);
      });
  }

  return (
    <>
      <Head>
        <title>Not by a human</title>
        <meta name="description" content="Image created by AI" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Made />
      <div
        className={
          'bg-black text-white w-full flex flex-col py-10 items-center justify-start min-h-screen '
        }
      >
        <div className=" max-w-4xl mx-auto flex flex-col items-center ">
          <h1 className="title-gradient">Hello human!</h1>
          <Image src={Robot} width={100} height={100} alt="robot" />
          <p className="w-72 sm:w-max bg-gray-100 text-black rounded-md px-3 text-sm py-2 flex mt-2">
            <Image
              src={Comment}
              width={20}
              height={20}
              alt="robot"
              className="mr-2 rotate-[10deg]"
            />
            Search an image that not exist, I&apos;ll create one for you
          </p>
          <div className="flex flex-col md:flex-row items-end ">
            <div className="flex flex-col items-start justify-center md:mr-2 mt-5">
              <label>Search</label>
              <input
                className="w-72 sm:w-96 text-white border-2 rounded-md bg-black border-white p-1"
                onChange={(event) => setValue(event.target.value)}
              ></input>
            </div>
            <Button
              state={state}
              onClick={() => {
                if (state === 'search') {
                  requestImage(value);
                }
              }}
            />
          </div>

          <div className="w-[300px] h-[300px] md:w-[512px] md:h-[512px] ">
            {imageUrl && (
              <div className="mt-10">
                <img className=" rounded-sm" src={imageUrl} alt="image by AI" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
