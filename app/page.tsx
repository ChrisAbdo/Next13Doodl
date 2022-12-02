'use client';

import { useEffect, useState } from 'react';
import Web3 from 'web3';
import toast, { Toaster } from 'react-hot-toast';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

// import Draw from './components/Draw';

declare global {
  interface Window {
    ethereum: any;
  }
}

function page() {
  const [account, setAccount] = useState('');
  const [web3Handler, setWeb3Handler] = useState<Web3>();
  const [isLoading, setIsLoading] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    loadWeb3();
    controls.start('visible');
    // event listener for account change and network change
    window.ethereum.on('accountsChanged', (accounts: any) => {
      setAccount(accounts[0]);
    });
    window.ethereum.on('networkChanged', (networkId: any) => {
      window.location.reload();
    });
  }, [account]);

  const web3 = new Web3(window.ethereum);

  const loadWeb3 = async () => {
    // Use the existing Web3 instance to get the accounts
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const Web3Handler = async () => {
    const notification = toast.loading('Connecting account...', {
      style: {
        border: '2px solid #000',
      },
    });
    setIsLoading(true);
    // Add the ethereum chain
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x13881',
          chainName: 'Matic Mumbai Testnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
          },
          rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
          blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        },
      ],
    });

    // Request the account
    const account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // Set the account and web3 handler
    setAccount(account[0]);
    setWeb3Handler(web3);

    // Show a success notification
    toast.success('Account connected!', {
      id: notification,
      style: {
        border: '2px solid #000',
      },
    });
    setIsLoading(false);

    // show failure notification if account is not connected
  };

  return (
    <>
      <Marquee
        gradient={false}
        speed={100}
        className="border-b border-t border-black "
      >
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </Marquee>
      <motion.section
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        className="bg-gray-100 py-12 px-12"
      >
        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <AnimatePresence>
              <motion.img
                src="https://placeimg.com/260/400/arch"
                width={260}
                height={400}
                alt="hero"
                className="max-w-sm rounded-lg shadow-2xl"
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
                exit={{ x: '-100vw' }}
              />
            </AnimatePresence>
            <div className="">
              <div className="flex flex-col space-y-2 text-5xl sm:text-6xl font-bold">
                <h1 className="font-bold text-[#FF6F91]">
                  <span className="text-black">one</span>
                  &nbsp;prompt.
                </h1>
                <h1 className="font-bold text-[#8D80C4]">
                  <span className="text-black">one</span>
                  &nbsp;day.
                </h1>
                <h1 className="font-bold text-[#3ace3a]">
                  <span className="text-black">one</span>
                  &nbsp;winner.
                </h1>
              </div>
              <p className="py-6 text-3xl text-truncate max-w-md">
                Draw the prompt and create a beautiful piece of art. Vote for
                the best doodl at the end of the day.
              </p>
              {account ? (
                <a href="/doodl" className="btn btn-outline ">
                  start doodling!
                </a>
              ) : (
                <button
                  onClick={Web3Handler}
                  className={`btn btn-outline ${isLoading ? 'loading' : ''}`}
                >
                  Connect wallet to get started
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <div className="flex flex-col items-center">
          <div className="stats shadow border border-black w-2/3">
            <div className="stat place-items-center">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">From January 1st to February 1st</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Users</div>
              <div className="stat-value text-secondary">4,200</div>
              <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">New Registers</div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </motion.section>

      <h1 className="text-4xl font-bold text-center py-8">Previous Winners</h1>
      {/* */}
      {/* 3 images in 1 row */}
      <div className="flex flex-row justify-center space-x-4">
        <div className="flex flex-col items-center">
          <Image
            src="/alien.webp"
            alt="he;;"
            width={300}
            height={300}
            className="hover:scale-105"
          />
          <p className="text-2xl font-bold">0x3b1122EEc2F7...</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/astro.webp"
            alt="he;;"
            width={300}
            height={300}
            className="hover:scale-105"
          />
          <p className="text-2xl font-bold">carsonroscoe.eth</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/astro1.webp"
            alt="he;;"
            width={300}
            height={300}
            className="hover:scale-105"
          />
          <p className="text-2xl font-bold">0xAC457D4ED1c3...</p>
        </div>
      </div>
      {/* <Draw /> */}
      <Toaster />
    </>
  );
}

export default page;
