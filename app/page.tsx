'use client';
import React, { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  async function requestImage(text: string) {
    await fetch('/api/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result.url);
        setImageUrl(result.url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <label>Search</label>
      <input onChange={(event) => setValue(event.target.value)}></input>
      <button onClick={() => requestImage(value)}>Search</button>
      {imageUrl && (
        <a href={imageUrl} download>
          <img src={imageUrl} alt="ok" style={{ width: '200px', height: '200px' }} />
        </a>
      )}
    </div>
  );
}
