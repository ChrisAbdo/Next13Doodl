'use client';

import React from 'react';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const [account, setAccount] = useState('');
  const [web3Handler, setWeb3Handler] = useState<Web3>();

  const [theme, setTheme] = useState();

  useEffect(() => {
    loadWeb3();

    // event listener for account change and network change
    window.ethereum.on('accountsChanged', (accounts: any) => {
      setAccount(accounts[0]);
    });
    window.ethereum.on('networkChanged', (networkId: any) => {
      window.location.reload();
    });
  }, [account]);

  // Web3 Initialization
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
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {account ? (
            <button className="btn btn-outline">
              {account.slice(0, 5)}...{account.slice(38, 42)}
            </button>
          ) : (
            <button className="btn btn-outline" onClick={Web3Handler}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Navbar;
