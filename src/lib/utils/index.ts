import { Token } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { formatUnits } from "viem";
import { twMerge } from "tailwind-merge";
import numeral from "numeral";
import { Chains, MAINNET_SUPPORTED_CHAINS } from "@/constants/chains";

export const DESKTOP_MEDIA_QUERY = "(min-width: 640px)";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTokenNative = (address: string) =>
  address &&
  (address === "native" ||
    address.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

export const formatTokenAmount = (
  _amount: bigint | string,
  _decimals: number = 18
) => {
  if (!_amount) return "0";
  if (typeof _amount === "string") {
    _amount = BigInt(_amount);
  }
  return formatNumber(formatUnits(_amount, _decimals));
};

export const formatNumber = (number: number | string) => {
  if (typeof number === "string") {
    number = parseFloat(number);
  }

  if (isNaN(number)) {
    return "-";
  }

  if (number === 0) {
    return "0";
  }

  if (number >= 1) {
    if (number > 99999) {
      return numeral(number).format("0.[000]a");
    }
    if (number > 9999) {
      return numeral(number).format("0.[00]a");
    }
    return numeral(number).format("0.[000]a");
  }
  if (number < 0.0001) {
    return "<0.0001";
  }
  if (number < 0.001) {
    return numeral(number).format("0.0[0000]");
  }
  if (number < 1) {
    return numeral(number).format("0.00[00]");
  }

  return numeral(number).format("0.[00]");
};

export const tokenKey = (token: Token) =>
  `${token.chain}:${token.address}:${token.symbol}`;

export function removeTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getChains() {
  return Object.values(MAINNET_SUPPORTED_CHAINS).sort((c1, c2) =>
    c1[0] < c2[0] ? -1 : 1
  );
}

export function removeChar(word: string): string {
  const index = word.indexOf("_");
  if (index !== 1) {
    return word.replace("_", " ");
  }
  return word;
}

export function getChainImagePath(chainName: Chains) {
  const img = chainName === "binance" ? "bnb" : chainName;
  return `/images/chains/${img}.png`;
}
