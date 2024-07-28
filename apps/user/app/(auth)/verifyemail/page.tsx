'use client';

import React, { Suspense } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../@/components/ui/button';
import { useToast } from '../../../@/components/ui/use-toast';

function VerifyAccount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  async function verifyAccount() {
    try {
      const verifyTokenEncoded = searchParams.get('vtoken');
      const decodedEmail = searchParams.get('email');
      const response = await axios.post('/api/verify-email', {
        verifyTokenEncoded: verifyTokenEncoded,
        email: decodedEmail,
      });
      console.log(response);

      if (response.data.success) {
        console.log('Success in verify');
        router.replace('/sign-in');
      } else {
        console.log('Not Success in verify');
      }
    } catch (err) {
      console.log('Error in verify @@@: ', err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Click on the button to verify Your account
          </h1>
        </div>
        <Button onClick={verifyAccount}>Click Here</Button>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccount />
    </Suspense>
  );
}
