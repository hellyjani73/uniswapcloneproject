import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../assets";
import { Token, SearchToken } from "../index";

//CONTEXT
import { SwapTokenContext } from "../../Context/SwapContext";

const HeroSection = ({}) => {

    const [fromCurrency, setFromCurrency] = useState("BTC");
    const [toCurrency, setToCurrency] = useState("ETH");
    const [numberOfCoins, setNumberOfCoins] = useState(1);
    const [conversionRate, setConversionRate] = useState(0);
    const [swappedValue, setSwappedValue] = useState(0);


    useEffect(() => {
      fetch(
        `https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`
      )
        .then((response) => response.json())
        .then((data) => {
          const rates = data.data.rates;
          const rate = rates[toCurrency];
          setConversionRate(rate);
          setSwappedValue(numberOfCoins * rate);
        });
    }, [fromCurrency, toCurrency, numberOfCoins]);

    const handleNumberOfCoinsChange = (e) => {
      setNumberOfCoins(e.target.value);
    };


  
  //USESTATE
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const [tokenSwapOutPut, setTokenSwapOutPut] = useState(0);
  const [poolMessage, setPoolMessage] = useState("");
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);

  const {
    singleSwapToken,
    connectWallet,
    account,
    ether,
    dai,
    tokenData,
    getPrice,
    swapUpdatePrice,
  } = useContext(SwapTokenContext);

  //TOKEN 1
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });
  //TOKEN 2
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  const callOutPut = async (value) => {
    const yourAccount = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
    const deadline = 10;
    const slippageAmount = 25;
    const data = await swapUpdatePrice(
      value,
      slippageAmount,
      deadline,
      yourAccount
    );
    console.log(data);

    setTokenSwapOutPut(data[1]);
    setSearch(false);

    const poolAddress = "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8";
    const poolData = await getPrice(value, poolAddress);
    const message = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[1]}`;
    console.log(message);
    setPoolMessage(message);
  };
  //JSX
  return (
    <div className={Style.HeroSection}>
      {/* <div className="py-10">hola</div> */}

      <div className={Style.HeroSection_box}>
        <div className={Style.HeroSection_box_heading}>
          <p>Swap</p>
          <div className={Style.HeroSection_box_heading_img}>
            <Image
              src={images.close}
              alt="image"
              width={50}
              height={50}
              // onClick={() => setOpenSetting(true)}
            />
          </div>
        </div>

        <div className={Style.HeroSection_box_input}>
          <input
            type="number"
            value={numberOfCoins}
            onChange={handleNumberOfCoinsChange}
          />
          <select
            onChange={(e) => setFromCurrency(e.target.value)}
            value={fromCurrency}
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="LTC">Litecoin</option>
            <option value="XRP">Ripple</option>
            <option value="BCH">Bitcoin Cash</option>
          </select>
        </div>

        <div className={Style.HeroSection_box_input}>
          {/* <input type="text" placeholder="0" /> */}
          {/* <p>
            {search ? (
              <Image
                src={images.loading}
                width={100}
                height={40}
                alt="loading"
              />
            ) : (
              tokenSwapOutPut
            )}
          </p> */}
          <input
            type="number"
            disabled
            value={swappedValue}
            onChange={handleNumberOfCoinsChange}
          />

          <select
            onChange={(e) => setToCurrency(e.target.value)}
            value={toCurrency}
          >
            <option value="ETH">Ethereum</option>
            <option value="BTC">Bitcoin</option>
            <option value="LTC">Litecoin</option>
            <option value="XRP">Ripple</option>
            <option value="BCH">Bitcoin Cash</option>
          </select>
        </div>
        <label>Conversion Rate: </label>
        <span>{conversionRate}</span>

        {/* {search ? (
          <Image src={images.loading} width={100} height={40} alt="loading" />
        ) : (
          poolMessage
        )} */}

        {account ? (
          <button
            className={Style.HeroSection_box_btn}
            onClick={() =>
              singleSwapToken({
                token1: tokenOne,
                token2: tokenTwo,
                swapAmount,
              })
            }
          >
            Swap
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className={Style.HeroSection_box_btn}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {openSetting && <Token setOpenSetting={setOpenSetting} />}

      {openToken && (
        <SearchToken
          openToken={setOpenToken}
          tokens={setTokenOne}
          tokenData={tokenData}
        />
      )}
      {openTokensTwo && (
        <SearchToken
          openToken={setOpenTokensTwo}
          tokens={setTokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  );
};

export default HeroSection;
 
    



  


 
