import internal from "stream";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

interface IPrice {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

interface ChartProps {
  coinId: string;
}
function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(
    ["ohlcv2", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <h1>
            price: {console.log(data)}
            {data.quotes.USD.price}$
          </h1>
          <h1>max_price: {data.quotes.USD.ath_price}$</h1>
          <h1>
            max_price-current_price: {data.quotes.USD.percent_from_price_ath}%
          </h1>
          <h1>price_volume_24h: {data.quotes.USD.volume_24h}$</h1>
          <h1>
            price_volume_change_24h: {data.quotes.USD.volume_24h_change_24h}%
          </h1>
          <h1>price_change_1h(%): {data.quotes.USD.percent_change_1h}%</h1>
          <h1>price_volume_12h(%): {data.quotes.USD.percent_change_12h}%</h1>
        </>
      )}
    </div>
  );
}

export default Price;
