'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');

  const handleId = (value: string) => {
    if (!value) {
      return;
    }
    setId(value);
  };

  return (
    <div>
      <input
        placeholder="introduce id"
        onChange={event => handleId(event.target.value)}
      />
      <Link href={`networks/${id}`} shallow>
        Details
      </Link>
    </div>
  );
}
